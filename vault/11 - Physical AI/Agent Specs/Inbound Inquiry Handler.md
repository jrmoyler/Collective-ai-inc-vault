---
title: Inbound Inquiry Handler
tags:
- device-agent
- physical-ai
- wearables
- wearable
tier: not stated
type: device-agent
model: claude-sonnet-4-6
owner: JR Moyler (Hataalii)
device: TC-W01 Herald Consultant Badge
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: The Collective
clearance: not stated
device_count: 1
---
# Inbound Inquiry Handler

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[The Collective Division]].

## Role
Listed as 'Inbound Inquiry Handler (Task Agent)' on the Herald Consultant Badge. Handles new client intake and triggers the Inbound Inquiry → Proposal Generator n8n workflow.

## Devices it runs on
| Code | Device | Type | Section | Listed as |
|---|---|---|---|---|
| TC-W01 | Herald Consultant Badge | Wearable | [[Wearables Agent Spec — The Collective Devices]] | Inbound Inquiry Handler (Task Agent) |

## Inputs and sensors
- **Herald Consultant Badge**: Seeed XIAO ESP32S3 Sense; Adafruit DRV2605L Haptic Controller; Circuit Playground Bluefruit

## Outputs and actions
- Trigger the proposal workflow on new client intake
- Log client intake
- On Herald Consultant Badge: During a discovery call, the consultant's badge logs the conversation. At call end, the Proposal Generator Task Agent fires, drafts an SOW in Notion, and the consultant's badge vibrates to confirm delivery, all before the client hangs up.

## Permissions
API and MCP access listed for its device(s):
- **Herald Consultant Badge**: APIs: ZenFlow /v1/knowledge/write; Anthropic claude-sonnet-4-6 (proposal drafting); Notion API; Slack API. MCPs: Notion MCP; Slack MCP; ZenFlow Internal API MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
No escalation path is stated beyond the device's workflows listed under Dependencies.

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Knowledge Keeper (Device Agent)]], [[Proposal Generator Task Agent]]
- n8n workflows: Inbound Inquiry → Proposal Generator; Client Onboarding Sequence; Cross-Division Intelligence Request Router. See [[n8n Workflow Blueprint]].
- MCPs: Notion MCP; Slack MCP; ZenFlow Internal API MCP
- Models as written in the spec: claude-sonnet-4-6. Current vault routing is in [[Agent Tier Registry]].
