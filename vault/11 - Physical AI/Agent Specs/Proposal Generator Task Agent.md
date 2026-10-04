---
title: Proposal Generator Task Agent
tags:
- device-agent
- physical-ai
- wearables
- wearable
- edge-terminal
tier: not stated
type: device-agent
model: claude-sonnet-4-6
owner: JR Moyler (Hataalii)
device: TC-W01 Herald Consultant Badge, TC-W02 Client Intelligence Terminal, TC-W04 AI Audit Wearable Kit
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: The Collective
clearance: not stated
device_count: 3
---
# Proposal Generator Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[The Collective Division]].

## Role
Drafts proposals and SOWs. Fires at the end of a discovery call captured by the Herald Consultant Badge and drafts the SOW in Notion with claude-sonnet-4-6.

## Devices it runs on
| Code | Device | Type | Section | Listed as |
|---|---|---|---|---|
| TC-W01 | Herald Consultant Badge | Wearable | [[Wearables Agent Spec — The Collective Devices]] | Proposal Generator Task Agent |
| TC-W02 | Client Intelligence Terminal | Edge Terminal | [[Wearables Agent Spec — The Collective Devices]] | Proposal Generator Task Agent |
| TC-W04 | AI Audit Wearable Kit | Wearable | [[Wearables Agent Spec — The Collective Devices]] | Proposal Generator Task Agent |

## Inputs and sensors
- **Herald Consultant Badge**: Seeed XIAO ESP32S3 Sense; Adafruit DRV2605L Haptic Controller; Circuit Playground Bluefruit
- **Client Intelligence Terminal**: NVIDIA Jetson Orin Nano Super; Raspberry Pi 5 + Whisplay HAT; ReSpeaker 4-Mic Array v2.0; Pi Camera Module 3; Adafruit I2S Speaker Bonnet
- **AI Audit Wearable Kit**: Arduino Nano 33 BLE Sense Rev2 (×3); Adafruit DRV2605L Haptic Controller (×3); IMU BNO085 (×3)

## Outputs and actions
- Draft an SOW in Notion at call end
- Trigger haptic delivery confirmation on the consultant badge
- On Herald Consultant Badge: During a discovery call, the consultant's badge logs the conversation. At call end, the Proposal Generator Task Agent fires, drafts an SOW in Notion, and the consultant's badge vibrates to confirm delivery, all before the client hangs up.
- On Client Intelligence Terminal: Research Director pre-loads a client intelligence brief 30 minutes before every meeting. During the call, the terminal's Task Agent monitors the conversation and surfaces competitive data on the Whisplay screen: the consultant sees answers before the client finishes asking.
- On AI Audit Wearable Kit: During a 2-day AI readiness audit, client team members wear the badges. Behavioral signals + interview data feed the Audit Intelligence Task Agent, which generates a scored report with specific AI implementation recommendations by end of day 2.

## Permissions
API and MCP access listed for its device(s):
- **Herald Consultant Badge**: APIs: ZenFlow /v1/knowledge/write; Anthropic claude-sonnet-4-6 (proposal drafting); Notion API; Slack API. MCPs: Notion MCP; Slack MCP; ZenFlow Internal API MCP.
- **Client Intelligence Terminal**: APIs: Anthropic claude-sonnet-4-6; Perplexity Pro API (pre-meeting research); Notion API; Slack API; Apollo/Clearbit enrichment API. MCPs: Notion MCP; Slack MCP; Google Drive MCP; ZenFlow Internal API MCP.
- **AI Audit Wearable Kit**: APIs: ZenFlow /v1/knowledge/write; Anthropic claude-sonnet-4-6 (report generation); Notion API; Airtable API (scoring matrix). MCPs: Notion MCP; Airtable MCP; ZenFlow Internal API MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
No escalation path is stated beyond the device's workflows listed under Dependencies.

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Inbound Inquiry Handler]], [[Knowledge Keeper (Device Agent)]], [[Research Director]], [[Client Intelligence Task Agent]], [[Audit Intelligence Task Agent]]
- n8n workflows: Inbound Inquiry → Proposal Generator; Client Onboarding Sequence; Cross-Division Intelligence Request Router; Brand Asset Request Workflow; AI Readiness Audit Scoring; Impact Report Auto-Generator. See [[n8n Workflow Blueprint]].
- MCPs: Notion MCP; Slack MCP; ZenFlow Internal API MCP; Google Drive MCP; Airtable MCP
- Models as written in the spec: claude-sonnet-4-6. Current vault routing is in [[Agent Tier Registry]].
