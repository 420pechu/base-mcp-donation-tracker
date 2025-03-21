import { z } from 'zod';

export const CreateCampaignSchema = z.object({
  name: z.string().describe('The name of the donation campaign'),
  description: z.string().describe('A description of the donation campaign'),
  targetAmount: z.string().describe('The target amount to raise (in USDC)'),
  endDate: z.string().describe('The end date of the campaign (ISO format)'),
  beneficiaryAddress: z.string().describe('The wallet address that will receive the funds'),
});

export const MakeDonationSchema = z.object({
  campaignId: z.string().describe('The ID of the campaign to donate to'),
  amount: z.string().describe('The amount to donate (in USDC)'),
  message: z.string().optional().describe('Optional message to include with donation'),
});

export const GetCampaignDetailsSchema = z.object({
  campaignId: z.string().describe('The ID of the campaign to get details for'),
});

export const ListCampaignsSchema = z.object({
  status: z
    .enum(['active', 'completed', 'all'])
    .default('active')
    .describe('Filter campaigns by status'),
}); 