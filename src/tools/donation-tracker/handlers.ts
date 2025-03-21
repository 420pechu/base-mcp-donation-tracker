import {
  erc20Abi,
  formatUnits,
  isAddress,
  parseUnits,
  type PublicActions,
  type WalletClient,
} from 'viem';
import { base } from 'viem/chains';
import type { z } from 'zod';
import { USDC_ADDRESS, USDC_DECIMALS } from '../../../lib/constants.js';
import { constructBaseScanUrl } from '../utils/index.js';
import {
  CreateCampaignSchema,
  GetCampaignDetailsSchema,
  ListCampaignsSchema,
  MakeDonationSchema,
} from './schemas.js';

// Simple in-memory storage for campaigns and donations
// In a real implementation, this would be stored in a database or on-chain
const campaigns = new Map<string, Campaign>();
const donations = new Map<string, Donation[]>();

interface Campaign {
  id: string;
  name: string;
  description: string;
  targetAmount: string;
  raisedAmount: string;
  endDate: string;
  beneficiaryAddress: string;
  createdAt: string;
  creator: string;
  active: boolean;
}

interface Donation {
  id: string;
  campaignId: string;
  amount: string;
  donor: string;
  message?: string;
  timestamp: string;
  transactionHash: string;
}

export async function createCampaignHandler(
  wallet: WalletClient & PublicActions,
  args: z.infer<typeof CreateCampaignSchema>,
): Promise<string> {
  const { name, description, targetAmount, endDate, beneficiaryAddress } = args;

  if (!isAddress(beneficiaryAddress, { strict: false })) {
    throw new Error(`Invalid beneficiary address: ${beneficiaryAddress}`);
  }

  // In a real implementation, we would deploy a smart contract for the campaign
  // For this example, we'll just create an in-memory record
  const campaignId = `campaign-${Date.now()}`;
  const campaign: Campaign = {
    id: campaignId,
    name,
    description,
    targetAmount,
    raisedAmount: '0',
    endDate,
    beneficiaryAddress,
    createdAt: new Date().toISOString(),
    creator: wallet.account?.address || 'unknown',
    active: true,
  };

  campaigns.set(campaignId, campaign);
  donations.set(campaignId, []);

  return JSON.stringify({
    campaignId,
    message: `Campaign "${name}" created successfully!`,
    details: campaign,
  });
}

export async function makeDonationHandler(
  wallet: WalletClient & PublicActions,
  args: z.infer<typeof MakeDonationSchema>,
): Promise<string> {
  const { campaignId, amount, message } = args;

  const campaign = campaigns.get(campaignId);
  if (!campaign) {
    throw new Error(`Campaign not found with ID: ${campaignId}`);
  }

  if (!campaign.active) {
    throw new Error(`Campaign is no longer active`);
  }

  if (new Date(campaign.endDate) < new Date()) {
    campaign.active = false;
    throw new Error(`Campaign has ended`);
  }

  // Format units
  const atomicUnits = parseUnits(amount, USDC_DECIMALS);

  // In a real implementation, we would use a smart contract for donations
  // For this example, we'll transfer USDC to the beneficiary directly
  const tx = await wallet.simulateContract({
    address: USDC_ADDRESS,
    abi: erc20Abi,
    functionName: 'transfer',
    args: [campaign.beneficiaryAddress, atomicUnits],
    account: wallet.account,
    chain: wallet.chain,
  });

  const txHash = await wallet.writeContract(tx.request);

  // Update campaign raised amount
  const newRaisedAmount = parseFloat(campaign.raisedAmount) + parseFloat(amount);
  campaign.raisedAmount = newRaisedAmount.toString();

  // Create donation record
  const donationId = `donation-${Date.now()}`;
  const donation: Donation = {
    id: donationId,
    campaignId,
    amount,
    donor: wallet.account?.address || 'anonymous',
    message,
    timestamp: new Date().toISOString(),
    transactionHash: txHash,
  };

  // Add to donations
  const campaignDonations = donations.get(campaignId) || [];
  campaignDonations.push(donation);
  donations.set(campaignId, campaignDonations);

  return JSON.stringify({
    donationId,
    transactionHash: txHash,
    transactionUrl: constructBaseScanUrl(wallet.chain ?? base, txHash),
    message: `Successfully donated ${amount} USDC to "${campaign.name}"`,
  });
}

export async function getCampaignDetailsHandler(
  wallet: WalletClient & PublicActions,
  args: z.infer<typeof GetCampaignDetailsSchema>,
): Promise<string> {
  const { campaignId } = args;

  const campaign = campaigns.get(campaignId);
  if (!campaign) {
    throw new Error(`Campaign not found with ID: ${campaignId}`);
  }

  const campaignDonations = donations.get(campaignId) || [];

  // Get total raised amount by summing donations
  const totalRaised = campaignDonations.reduce(
    (sum, donation) => sum + parseFloat(donation.amount),
    0
  );

  // Calculate progress percentage
  const progressPercentage = 
    (parseFloat(campaign.raisedAmount) / parseFloat(campaign.targetAmount)) * 100;

  return JSON.stringify({
    ...campaign,
    progressPercentage: `${Math.min(progressPercentage, 100).toFixed(2)}%`,
    donationsCount: campaignDonations.length,
    recentDonations: campaignDonations.slice(-5).reverse(),
  });
}

export async function listCampaignsHandler(
  wallet: WalletClient & PublicActions,
  args: z.infer<typeof ListCampaignsSchema>,
): Promise<string> {
  const { status } = args;

  const currentDate = new Date();
  const filteredCampaigns = Array.from(campaigns.values()).filter(campaign => {
    if (status === 'active') {
      return campaign.active && new Date(campaign.endDate) > currentDate;
    } else if (status === 'completed') {
      return !campaign.active || new Date(campaign.endDate) <= currentDate;
    }
    return true; // 'all' status
  });

  return JSON.stringify({
    campaigns: filteredCampaigns.map(campaign => ({
      id: campaign.id,
      name: campaign.name,
      description: campaign.description,
      targetAmount: campaign.targetAmount,
      raisedAmount: campaign.raisedAmount,
      endDate: campaign.endDate,
      progressPercentage: `${Math.min((parseFloat(campaign.raisedAmount) / parseFloat(campaign.targetAmount)) * 100, 100).toFixed(2)}%`,
    })),
  });
} 