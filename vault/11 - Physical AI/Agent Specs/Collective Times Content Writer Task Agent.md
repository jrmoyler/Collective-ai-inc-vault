---
title: Collective Times Content Writer Task Agent
tags:
- device-agent
- physical-ai
- wearables
- edge-terminal
tier: not stated
type: device-agent
model: claude-sonnet-4-6
owner: JR Moyler (Hataalii)
device: NL-W01 Resonance Studio Node, NL-W04 Collective Times Broadcast Node
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Nexus Labs
clearance: not stated
device_count: 2
---
# Collective Times Content Writer Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Nexus Labs Division]].
Related: [[Collective Times]].

## Role
Writes Collective Times content from session transcripts and overnight AI news.

## Devices it runs on
| Code | Device | Type | Section | Listed as |
|---|---|---|---|---|
| NL-W01 | Resonance Studio Node | Physical AI | [[Wearables Agent Spec — Nexus Labs Devices]] | Collective Times Content Writer Task Agent |
| NL-W04 | Collective Times Broadcast Node | Edge Terminal | [[Wearables Agent Spec — Nexus Labs Devices]] | Collective Times Content Writer Task Agent |

## Inputs and sensors
- **Resonance Studio Node**: NVIDIA Jetson Orin Nano Super; ReSpeaker 4-Mic Array v2.0; Adafruit I2S Speaker Bonnet; Stereo 3W speakers; Raspberry Pi 5 (UI); Whisplay HAT
- **Collective Times Broadcast Node**: Raspberry Pi 5 8GB; Whisplay HAT (review + approval UI); Pi Camera Module 3 (presence trigger); Adafruit I2S Speaker Bonnet

## Outputs and actions
- Draft the newsletter, Meta post and Skool briefing within 3 minutes of session end
- Draft the daily briefing for JR's one-press approval
- On Resonance Studio Node: JR records a 20-minute strategic session. Resonance Studio Node transcribes it, the Collective Times Content Writer Task Agent produces the newsletter draft, Meta post, and Skool briefing, all within 3 minutes of session end, before JR reviews the recording.
- On Collective Times Broadcast Node: Every morning at 7AM, the Broadcast Node's n8n workflow pulls overnight AI news, Claude drafts the Collective Times briefing, and the display shows JR the draft. One button press publishes to Skool and queues the Meta post. Total time investment: 90 seconds.

## Permissions
API and MCP access listed for its device(s):
- **Resonance Studio Node**: APIs: Anthropic claude-sonnet-4-6 (content generation); ZenFlow /v1/knowledge/write; Notion API; Slack API; Meta Graph API (post queue). MCPs: Notion MCP; Slack MCP; Google Drive MCP; ZenFlow Internal API MCP.
- **Collective Times Broadcast Node**: APIs: Anthropic claude-sonnet-4-6; Perplexity Pro API (news research); Notion API; Slack API; Meta Graph API. MCPs: Notion MCP; Slack MCP; ZenFlow Internal API MCP; Google Drive MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
No escalation path is stated beyond the device's workflows listed under Dependencies.

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Transcription Task Agent]], [[Knowledge Keeper (Device Agent)]], [[Distribution Agent]], [[Research Director]], [[Skool Community Monitor Agent]]
- n8n workflows: Collective Times Content Pipeline; Skool Community Engagement Monitor; Brand Asset Request Workflow; Portfolio Revenue Dashboard Sync (weekly brief). See [[n8n Workflow Blueprint]].
- MCPs: Notion MCP; Slack MCP; Google Drive MCP; ZenFlow Internal API MCP
- Models as written in the spec: claude-sonnet-4-6. Current vault routing is in [[Agent Tier Registry]].
