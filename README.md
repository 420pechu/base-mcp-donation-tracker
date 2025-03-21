# Transparent Donation Tracker for Base MCP 🔵

![Base MCP](https://base.org/brand/base-logo.svg)

A set of Model Context Protocol (MCP) tools that allow Claude and other AI applications to create, manage, and interact with on-chain donation campaigns on the Base network. This extension enables transparent, verifiable charity fundraising using USDC on Base.

## Overview

This extension adds donation campaign functionality to Base MCP, allowing users to:

- Create donation campaigns for charitable causes
- Make USDC donations to campaigns directly on Base
- Track campaign progress, donors, and donations transparently
- View active and completed campaigns

All transactions are performed on-chain, ensuring complete transparency and traceability of funds.

## Features

- **Transparent Fundraising**: All donations are recorded on-chain, providing full transparency.
- **USDC Support**: Donations are made using USDC stablecoin on Base.
- **Campaign Management**: Create campaigns with descriptions, target amounts, and end dates.
- **Progress Tracking**: Real-time tracking of campaign progress and donation history.
- **Messaging**: Include personal messages with donations.

## Integration with Claude

Once installed, users can interact with the donation system through natural language:

```
"Create a donation campaign to help build a community garden."
"Donate 5 USDC to the disaster relief campaign."
"Show me details of the wildlife conservation campaign."
"List all active donation campaigns."
```

## Installation

1. Add this extension to your Base MCP configuration.
2. Ensure you have a Base wallet with USDC available for donations.
3. Restart your Claude Desktop application.

## Available Tools

### create_donation_campaign

Creates a new donation campaign on Base.

Parameters:
- `name`: The name of the donation campaign
- `description`: A description of the donation campaign
- `targetAmount`: The target amount to raise (in USDC)
- `endDate`: The end date of the campaign (ISO format)
- `beneficiaryAddress`: The wallet address that will receive the funds

Example query to Claude:
> "Create a donation campaign called 'Community Garden Project' with a goal of 100 USDC to help build a garden in our neighborhood."

### make_donation

Makes a donation to an existing campaign using USDC.

Parameters:
- `campaignId`: The ID of the campaign to donate to
- `amount`: The amount to donate (in USDC)
- `message`: Optional message to include with donation

Example query to Claude:
> "Donate 10 USDC to the Community Garden Project campaign with the message 'Happy to support this initiative!'"

### get_campaign_details

Gets detailed information about a specific campaign.

Parameters:
- `campaignId`: The ID of the campaign to get details for

Example query to Claude:
> "Show me the details of the Community Garden Project campaign."

### list_campaigns

Lists all donation campaigns with optional status filtering.

Parameters:
- `status`: Filter campaigns by status ('active', 'completed', or 'all')

Example query to Claude:
> "Show me all active donation campaigns."

## Security Considerations

- All donations are made directly on-chain with full transparency.
- Campaign beneficiaries are verified on creation.
- All transactions require user confirmation before execution.

## Future Enhancements

- Smart contract-based campaigns with automatic fund distribution
- Multi-token support (ETH, other ERC20 tokens)
- Matching donation capabilities
- Campaign verification system

## License

[MIT License](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 