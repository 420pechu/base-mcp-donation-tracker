import { generateTool } from '../../../utils.js';
import {
  createCampaignHandler,
  getCampaignDetailsHandler,
  listCampaignsHandler,
  makeDonationHandler,
} from './handlers.js';
import {
  CreateCampaignSchema,
  GetCampaignDetailsSchema,
  ListCampaignsSchema,
  MakeDonationSchema,
} from './schemas.js';

export const createCampaignTool = generateTool({
  name: 'create_donation_campaign',
  description: 'Create a new donation campaign on Base',
  inputSchema: CreateCampaignSchema,
  toolHandler: createCampaignHandler,
});

export const makeDonationTool = generateTool({
  name: 'make_donation',
  description: 'Make a donation to a campaign using USDC on Base',
  inputSchema: MakeDonationSchema,
  toolHandler: makeDonationHandler,
});

export const getCampaignDetailsTool = generateTool({
  name: 'get_campaign_details',
  description: 'Get details about a specific donation campaign',
  inputSchema: GetCampaignDetailsSchema,
  toolHandler: getCampaignDetailsHandler,
});

export const listCampaignsTool = generateTool({
  name: 'list_campaigns',
  description: 'List all donation campaigns with their statuses',
  inputSchema: ListCampaignsSchema,
  toolHandler: listCampaignsHandler,
}); 