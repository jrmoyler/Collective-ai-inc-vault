---
title: Research Director
tags:
- device-agent
- physical-ai
- wearables
- edge-terminal
- wearable
tier: not stated
type: device-agent
model: claude-haiku-4-5, claude-sonnet-4-6
owner: JR Moyler (Hataalii)
device: ZF-W03 Knowledge Keeper Vault Node, TC-W02 Client Intelligence Terminal, TC-W03 Strategy Scan Node, TC-W04 AI Audit Wearable Kit, NL-W04 Collective Times Broadcast Node, KE-W05 Scout Intelligence Terminal
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: ZenFlow, The Collective, Nexus Labs, Kinetic Edge
clearance: not stated
device_count: 6
---
# Research Director

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[ZenFlow Division]], [[The Collective Division]], [[Nexus Labs Division]], [[Kinetic Edge Division]].

## Role
Research agent used across consulting, media, scouting and memory devices. On the Client Intelligence Terminal it is powered by Perplexity + Claude and pre-loads a client intelligence brief 30 minutes before every meeting.

## Devices it runs on
| Code | Device | Type | Section | Listed as |
|---|---|---|---|---|
| ZF-W03 | Knowledge Keeper Vault Node | Edge Terminal | [[Wearables Agent Spec — ZenFlow Devices]] | Research Director |
| TC-W02 | Client Intelligence Terminal | Edge Terminal | [[Wearables Agent Spec — The Collective Devices]] | Research Director |
| TC-W03 | Strategy Scan Node | Physical AI | [[Wearables Agent Spec — The Collective Devices]] | Research Director |
| TC-W04 | AI Audit Wearable Kit | Wearable | [[Wearables Agent Spec — The Collective Devices]] | Research Director |
| NL-W04 | Collective Times Broadcast Node | Edge Terminal | [[Wearables Agent Spec — Nexus Labs Devices]] | Research Director |
| KE-W05 | Scout Intelligence Terminal | Edge Terminal | [[Wearables Agent Spec — Kinetic Edge Devices]] | Research Director |

## Inputs and sensors
- **Knowledge Keeper Vault Node**: Raspberry Pi 5 8GB; Whisplay HAT (ingestion rate display)
- **Client Intelligence Terminal**: NVIDIA Jetson Orin Nano Super; Raspberry Pi 5 + Whisplay HAT; ReSpeaker 4-Mic Array v2.0; Pi Camera Module 3; Adafruit I2S Speaker Bonnet
- **Strategy Scan Node**: NVIDIA Jetson Orin Nano Super; Arducam 64MP Hawkeye Camera; Raspberry Pi 5 (controller + display); Whisplay HAT
- **AI Audit Wearable Kit**: Arduino Nano 33 BLE Sense Rev2 (×3); Adafruit DRV2605L Haptic Controller (×3); IMU BNO085 (×3)
- **Collective Times Broadcast Node**: Raspberry Pi 5 8GB; Whisplay HAT (review + approval UI); Pi Camera Module 3 (presence trigger); Adafruit I2S Speaker Bonnet
- **Scout Intelligence Terminal**: Raspberry Pi 5 8GB; Whisplay HAT; Pi Camera Module 3; Adafruit I2S Speaker Bonnet

## Outputs and actions
- Build pre-meeting client intelligence briefs
- Support news and prospect research
- Work with the Knowledge Keeper Vault Node and Research Pipeline

## Permissions
API and MCP access listed for its device(s):
- **Knowledge Keeper Vault Node**: APIs: ZenFlow /v1/knowledge (read + write); Anthropic claude-haiku-4-5 (embedding); Notion API (export); OpenTelemetry (traces). MCPs: ZenFlow Internal API MCP; Notion MCP; n8n MCP.
- **Client Intelligence Terminal**: APIs: Anthropic claude-sonnet-4-6; Perplexity Pro API (pre-meeting research); Notion API; Slack API; Apollo/Clearbit enrichment API. MCPs: Notion MCP; Slack MCP; Google Drive MCP; ZenFlow Internal API MCP.
- **Strategy Scan Node**: APIs: ZenFlow /v1/knowledge/write; Anthropic claude-sonnet-4-6 (structure extraction); Notion API; Figma API (design hand-off). MCPs: Notion MCP; Figma MCP; Google Drive MCP; ZenFlow Internal API MCP.
- **AI Audit Wearable Kit**: APIs: ZenFlow /v1/knowledge/write; Anthropic claude-sonnet-4-6 (report generation); Notion API; Airtable API (scoring matrix). MCPs: Notion MCP; Airtable MCP; ZenFlow Internal API MCP.
- **Collective Times Broadcast Node**: APIs: Anthropic claude-sonnet-4-6; Perplexity Pro API (news research); Notion API; Slack API; Meta Graph API. MCPs: Notion MCP; Slack MCP; ZenFlow Internal API MCP; Google Drive MCP.
- **Scout Intelligence Terminal**: APIs: Anthropic claude-sonnet-4-6 (profile generation); LunarCrush API (athlete social); Perplexity Pro API (news research); Airtable API; ZenFlow /v1/knowledge/write. MCPs: LunarCrush MCP; Airtable MCP; ZenFlow Internal API MCP; Notion MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
No escalation path is stated beyond the device's workflows listed under Dependencies.

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Knowledge Keeper (Device Agent)]], [[Data Ingestion Task Agent]], [[Proposal Generator Task Agent]], [[Client Intelligence Task Agent]], [[OCR + Structure Task Agent]], [[Audit Intelligence Task Agent]], [[Collective Times Content Writer Task Agent]], [[Distribution Agent]], [[Skool Community Monitor Agent]], [[Scout Intelligence Agent]], [[Prospect Profile Generator Task Agent]]
- n8n workflows: Knowledge Keeper Digest; ZenFlow Marketplace Listing Auto-Generator; Research Pipeline; Inbound Inquiry → Proposal Generator; Client Onboarding Sequence; Brand Asset Request Workflow; AI Readiness Audit Scoring; Impact Report Auto-Generator; Collective Times Content Pipeline; Skool Community Engagement Monitor; Portfolio Revenue Dashboard Sync (weekly brief); Scout Intelligence Aggregator; Weekly Performance Report Generator; Kinetic IQ Consumer Onboarding. See [[n8n Workflow Blueprint]].
- MCPs: ZenFlow Internal API MCP; Notion MCP; n8n MCP; Slack MCP; Google Drive MCP; Figma MCP; Airtable MCP; LunarCrush MCP
- Models as written in the spec: claude-haiku-4-5, claude-sonnet-4-6. Current vault routing is in [[Agent Tier Registry]].
