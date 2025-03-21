# Transparent Donation Tracker - Demo Script

## Introduction (0:00-0:20)
"Hi everyone! Today I'm excited to show you a new tool I've built for Base MCP called the Transparent Donation Tracker. It allows anyone to create and manage donation campaigns directly through a conversation with Claude AI, with all transactions happening transparently on Base."

## Setup Explanation (0:20-0:40)
"I've extended Base MCP with four new tools that enable donation campaign management through natural language. All the transactions happen on Base, and we're using USDC for donations to keep everything stable and transparent."

## Demo Part 1: Creating a Campaign (0:40-1:10)
[Screen recording of Claude conversation]

**User**: "Create a donation campaign called 'Community Garden Project' with a target of 500 USDC. The campaign should end on June 1st, 2025. The money will help build a community garden in our neighborhood."

[Show Claude processing and using the create_donation_campaign tool]

**Claude**: "I've created your 'Community Garden Project' campaign with a target of 500 USDC, ending on June 1st, 2025. Your campaign ID is [ID]. Anyone can now donate to this campaign using USDC on Base."

## Demo Part 2: Making a Donation (1:10-1:40)
[Screen recording of Claude conversation]

**User**: "I'd like to donate 10 USDC to the Community Garden Project campaign with the message 'Excited to see this garden grow!'"

[Show Claude processing and using the make_donation tool]

**Claude**: "Thank you for your donation! I've transferred 10 USDC to the Community Garden Project campaign. Your transaction has been recorded on Base. Here's the transaction hash: [hash]. Your message 'Excited to see this garden grow!' has been recorded with your donation."

## Demo Part 3: Checking Campaign Details (1:40-2:10)
[Screen recording of Claude conversation]

**User**: "Show me the details of the Community Garden Project campaign."

[Show Claude processing and using the get_campaign_details tool]

**Claude**: "Here are the details of the Community Garden Project campaign:
- Target: 500 USDC
- Raised so far: 10 USDC (2% of goal)
- End date: June 1st, 2025
- Recent donations: [list of recent donations with messages]"

## Demo Part 4: Listing Campaigns (2:10-2:30)
[Screen recording of Claude conversation]

**User**: "Show me all active donation campaigns."

[Show Claude processing and using the list_campaigns tool]

**Claude**: "Here are all active donation campaigns:
1. Community Garden Project (2% funded)
2. Local Animal Shelter (15% funded)
3. Beach Cleanup Initiative (45% funded)"

## Technical Explanation (2:30-3:00)
"Behind the scenes, these tools are implementing ERC20 transfers on Base and maintaining a record of all campaigns and donations. In a production version, all campaign data would be stored in smart contracts, providing even more transparency and trust."

## Conclusion (3:00-3:30)
"This is just a simple example of how AI and blockchain can work together to create more transparent, accessible charity systems. Imagine being able to create, donate to, and track charitable campaigns, all through a simple conversation with AI, with the security and transparency of blockchain. Thanks for watching!"

[End with a call to action to try it out and contribute to the project] 