---
title: Skool Community Monitor Agent
tags:
- device-agent
- physical-ai
- wearables
- edge-terminal
tier: not stated
type: device-agent
model: claude-sonnet-4-6
owner: JR Moyler (Hataalii)
device: NL-W04 Collective Times Broadcast Node
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Nexus Labs
clearance: not stated
device_count: 1
---
# Skool Community Monitor Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Nexus Labs Division]].

## Role
Runs on the Collective Times Broadcast Node with the Skool Community Engagement Monitor workflow.

## Device it runs on
**NL-W04 Collective Times Broadcast Node** (Edge Terminal), described in [[Wearables Agent Spec — Nexus Labs Devices]]. A dedicated Pi 5 terminal permanently running the Collective Times content pipeline. Monitors AI/tech news via RSS + Perplexity API, routes summaries to Claude, and queues the daily Skool briefing and Meta post for JR's approval, all without manual input. JR reviews on the Whisplay display and approves with a button press. The entire Collective Times production cycle runs on this single node.

## Inputs and sensors
- **Collective Times Broadcast Node**: Raspberry Pi 5 8GB; Whisplay HAT (review + approval UI); Pi Camera Module 3 (presence trigger); Adafruit I2S Speaker Bonnet

## Outputs and actions
- Monitor Skool community engagement
- On Collective Times Broadcast Node: Every morning at 7AM, the Broadcast Node's n8n workflow pulls overnight AI news, Claude drafts the Collective Times briefing, and the display shows JR the draft. One button press publishes to Skool and queues the Meta post. Total time investment: 90 seconds.

## Permissions
API and MCP access listed for its device(s):
- **Collective Times Broadcast Node**: APIs: Anthropic claude-sonnet-4-6; Perplexity Pro API (news research); Notion API; Slack API; Meta Graph API. MCPs: Notion MCP; Slack MCP; ZenFlow Internal API MCP; Google Drive MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
No escalation path is stated beyond the device's workflows listed under Dependencies.

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Collective Times Content Writer Task Agent]], [[Research Director]], [[Distribution Agent]]
- n8n workflows: Collective Times Content Pipeline; Skool Community Engagement Monitor; Portfolio Revenue Dashboard Sync (weekly brief). See [[n8n Workflow Blueprint]].
- MCPs: Notion MCP; Slack MCP; ZenFlow Internal API MCP; Google Drive MCP
- Models as written in the spec: claude-sonnet-4-6. Current vault routing is in [[Agent Tier Registry]].
