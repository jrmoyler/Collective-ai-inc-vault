---
title: Workshop Facilitator Task Agent
tags:
- device-agent
- physical-ai
- wearables
tier: not stated
type: device-agent
model: claude-haiku-4-5
owner: JR Moyler (Hataalii)
device: TC-W05 Workshop Presence Node
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: The Collective
clearance: not stated
device_count: 1
---
# Workshop Facilitator Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[The Collective Division]].

## Role
Runs on the Workshop Presence Node. When engagement drops, notifies the facilitator via haptic badge pulse and suggests a format change from the Collective's workshop playbook (e.g. a 10-minute breakout at the 2-hour mark).

## Device it runs on
**TC-W05 Workshop Presence Node** (Physical AI), described in [[Wearables Agent Spec — The Collective Devices]]. A Pi 5 + AI camera + depth sensor node deployed in workshop spaces. Tracks participant engagement levels via presence detection and micro-motion analysis, feeding real-time engagement data to the Knowledge Keeper. When engagement drops below threshold, a Task Agent notifies the facilitator via haptic badge pulse and suggests a format change using the Collective's workshop playbook.

## Inputs and sensors
- **Workshop Presence Node**: Raspberry Pi 5 8GB; Raspberry Pi AI Camera (Sony IMX500); Luxonis OAK-D Lite (depth); IMU BNO085; Whisplay HAT (facilitator display)

## Outputs and actions
- Alert the facilitator (haptic badge pulse, Slack)
- Suggest format changes
- Log interventions for workshop optimization
- On Workshop Presence Node: During a 4-hour AI strategy workshop, the node monitors group engagement. At the 2-hour mark, it detects declining attention, fires a Task Agent that suggests a 10-minute breakout exercise, and logs the intervention in Knowledge Keeper for future workshop optimization.

## Permissions
API and MCP access listed for its device(s):
- **Workshop Presence Node**: APIs: ZenFlow /v1/knowledge/write; Anthropic claude-haiku-4-5 (edge inference); Slack API (facilitator alert). MCPs: Slack MCP; Notion MCP; ZenFlow Internal API MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
No escalation path is stated beyond the device's workflows listed under Dependencies.

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Engagement Monitor Task Agent]], [[Knowledge Keeper (Device Agent)]]
- n8n workflows: Cross-Division Weekly Standup Digest; Participant Success Story Pipeline. See [[n8n Workflow Blueprint]].
- MCPs: Slack MCP; Notion MCP; ZenFlow Internal API MCP
- Models as written in the spec: claude-haiku-4-5. Current vault routing is in [[Agent Tier Registry]].
