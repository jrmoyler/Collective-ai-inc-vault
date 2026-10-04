---
title: Idea Capture Task Agent
tags:
- device-agent
- physical-ai
- wearables
- wearable
tier: not stated
type: device-agent
model: claude-haiku-4-5
owner: JR Moyler (Hataalii)
device: NL-W03 Creator Nexus Wearable
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Nexus Labs
clearance: not stated
device_count: 1
---
# Idea Capture Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Nexus Labs Division]].
Related: [[Creator Nexus]].

## Role
Receives the 15-second 'capture moment' audio clip from the Creator Nexus Wearable.

## Device it runs on
**NL-W03 Creator Nexus Wearable** (Wearable), described in [[Wearables Agent Spec — Nexus Labs Devices]]. A BLE badge for Nexus Labs creators that passively captures ambient audio and ideation moments. One press of the Circuit Playground button triggers a 'capture moment': a 15-second audio clip sent to a Task Agent that tags it, adds context, and files it in the Creator Nexus idea vault in Notion. Haptic confirmation tells the creator the idea was saved without breaking creative flow.

## Inputs and sensors
- **Creator Nexus Wearable**: Seeed XIAO ESP32S3 Sense; Circuit Playground Bluefruit; Adafruit DRV2605L Haptic Controller

## Outputs and actions
- Tag the clip and add context
- File it in the Creator Nexus idea vault in Notion
- Trigger haptic save confirmation
- On Creator Nexus Wearable: A creator mid-walk has an idea for the next Collective Times angle. One button press. The Idea Capture Task Agent saves a tagged audio note to the Creator Nexus vault in Notion and a haptic pulse confirms receipt. The idea is in the pipeline before they get back to their desk.

## Permissions
API and MCP access listed for its device(s):
- **Creator Nexus Wearable**: APIs: ZenFlow /v1/knowledge/write; Anthropic claude-haiku-4-5 (tagging); Notion API; Slack API. MCPs: Notion MCP; Slack MCP; ZenFlow Internal API MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
No escalation path is stated beyond the device's workflows listed under Dependencies.

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Creator Nexus Vault Agent]], [[Knowledge Keeper (Device Agent)]]
- n8n workflows: Collective Times Content Pipeline; Skool Community Engagement Monitor. See [[n8n Workflow Blueprint]].
- MCPs: Notion MCP; Slack MCP; ZenFlow Internal API MCP
- Models as written in the spec: claude-haiku-4-5. Current vault routing is in [[Agent Tier Registry]].
