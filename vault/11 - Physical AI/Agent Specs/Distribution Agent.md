---
title: Distribution Agent
tags:
- device-agent
- physical-ai
- wearables
- edge-terminal
tier: not stated
type: device-agent
model: claude-sonnet-4-6, claude-haiku-4-5
owner: JR Moyler (Hataalii)
device: NL-W01 Resonance Studio Node, NL-W02 Vision Director Node, NL-W04 Collective Times Broadcast Node, QL-W05 Institutional Briefing Node
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Nexus Labs, Quantum Ledger
clearance: not stated
device_count: 4
---
# Distribution Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Nexus Labs Division]], [[Quantum Ledger Division]].

## Role
Distributes finished content and reports. Listed as 'Nexus Labs Distribution Agent' on the Resonance Studio Node.

## Devices it runs on
| Code | Device | Type | Section | Listed as |
|---|---|---|---|---|
| NL-W01 | Resonance Studio Node | Physical AI | [[Wearables Agent Spec — Nexus Labs Devices]] | Nexus Labs Distribution Agent |
| NL-W02 | Vision Director Node | Physical AI | [[Wearables Agent Spec — Nexus Labs Devices]] | Distribution Agent |
| NL-W04 | Collective Times Broadcast Node | Edge Terminal | [[Wearables Agent Spec — Nexus Labs Devices]] | Distribution Agent |
| QL-W05 | Institutional Briefing Node | Physical AI | [[Wearables Agent Spec — Quantum Ledger Devices]] | Distribution Agent |

## Inputs and sensors
- **Resonance Studio Node**: NVIDIA Jetson Orin Nano Super; ReSpeaker 4-Mic Array v2.0; Adafruit I2S Speaker Bonnet; Stereo 3W speakers; Raspberry Pi 5 (UI); Whisplay HAT
- **Vision Director Node**: Raspberry Pi 5 8GB (×2); Pi Camera Module 3 Wide (×2); Arducam 64MP Hawkeye (hero close-up); Pi AI Camera (Sony IMX500 scene tagging); NVIDIA Jetson Orin Nano Super
- **Collective Times Broadcast Node**: Raspberry Pi 5 8GB; Whisplay HAT (review + approval UI); Pi Camera Module 3 (presence trigger); Adafruit I2S Speaker Bonnet
- **Institutional Briefing Node**: Raspberry Pi 5 8GB; Whisplay HAT (report review + approval); Adafruit I2S Speaker Bonnet

## Outputs and actions
- Publish to Skool and queue Meta posts after approval
- Distribute the weekly Quantum Alpha brief via the Notion + email pipeline

## Permissions
API and MCP access listed for its device(s):
- **Resonance Studio Node**: APIs: Anthropic claude-sonnet-4-6 (content generation); ZenFlow /v1/knowledge/write; Notion API; Slack API; Meta Graph API (post queue). MCPs: Notion MCP; Slack MCP; Google Drive MCP; ZenFlow Internal API MCP.
- **Vision Director Node**: APIs: Anthropic claude-haiku-4-5 (clip metadata); ZenFlow /v1/knowledge/write; Notion API; HeyGen API (optional avatar layer). MCPs: Notion MCP; Google Drive MCP; ZenFlow Internal API MCP; Cloudinary MCP.
- **Collective Times Broadcast Node**: APIs: Anthropic claude-sonnet-4-6; Perplexity Pro API (news research); Notion API; Slack API; Meta Graph API. MCPs: Notion MCP; Slack MCP; ZenFlow Internal API MCP; Google Drive MCP.
- **Institutional Briefing Node**: APIs: Anthropic claude-sonnet-4-6 (report authoring); Notion API; Gmail API (distribution); LSEG API; FactSet API. MCPs: Notion MCP; Gmail MCP; LSEG MCP; FactSet MCP; ZenFlow Internal API MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
No escalation path is stated beyond the device's workflows listed under Dependencies.

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Collective Times Content Writer Task Agent]], [[Transcription Task Agent]], [[Knowledge Keeper (Device Agent)]], [[Vision Tagging Task Agent]], [[Creator Nexus Brief Generator]], [[Research Director]], [[Skool Community Monitor Agent]], [[Quantum Alpha Institutional Report Generator Agent]], [[Portfolio P&L Aggregator Task Agent]]
- n8n workflows: Collective Times Content Pipeline; Skool Community Engagement Monitor; Brand Asset Request Workflow; Creator Nexus Brief Auto-Generator; Portfolio Revenue Dashboard Sync (weekly brief); Quantum Alpha Institutional Report Generator (weekly); Invoice + Revenue Recognition Automation; Investor Update Auto-Pack. See [[n8n Workflow Blueprint]].
- MCPs: Notion MCP; Slack MCP; Google Drive MCP; ZenFlow Internal API MCP; Cloudinary MCP; Gmail MCP; LSEG MCP; FactSet MCP
- Models as written in the spec: claude-sonnet-4-6, claude-haiku-4-5. Current vault routing is in [[Agent Tier Registry]].
