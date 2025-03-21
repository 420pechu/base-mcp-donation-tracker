import {
  createCampaignTool,
  getCampaignDetailsTool,
  listCampaignsTool,
  makeDonationTool,
} from './donation-tracker/index.js';
import type { ToolHandler, ToolWithHandler } from './types.js';

export const donationToolsWithHandler: ToolWithHandler[] = [
  createCampaignTool,
  makeDonationTool,
  getCampaignDetailsTool,
  listCampaignsTool,
];

export const toolToHandler: Record<string, ToolHandler> = donationToolsWithHandler.reduce<
  Record<string, ToolHandler>
>((acc, tool) => {
  acc[tool.definition.name] = tool.handler;
  return acc;
}, {}); 