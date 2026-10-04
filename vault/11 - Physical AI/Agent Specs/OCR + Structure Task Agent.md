---
title: OCR + Structure Task Agent
tags:
- device-agent
- physical-ai
- wearables
tier: not stated
type: device-agent
model: claude-sonnet-4-6
owner: JR Moyler (Hataalii)
device: TC-W03 Strategy Scan Node
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: The Collective
clearance: not stated
device_count: 1
---
# OCR + Structure Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[The Collective Division]].

## Role
Listed as 'Task Agent (OCR + structure)' on the Strategy Scan Node. Runs Claude-powered OCR and structural analysis on 64MP captures of whiteboards, sticky-note frameworks and documents.

## Devices it runs on
| Code | Device | Type | Section | Listed as |
|---|---|---|---|---|
| TC-W03 | Strategy Scan Node | Physical AI | [[Wearables Agent Spec — The Collective Devices]] | Task Agent (OCR + structure) |

## Inputs and sensors
- **Strategy Scan Node**: NVIDIA Jetson Orin Nano Super; Arducam 64MP Hawkeye Camera; Raspberry Pi 5 (controller + display); Whisplay HAT

## Outputs and actions
- Extract frameworks from whiteboard photos
- Write formatted strategy documents to Notion within 90 seconds
- Queue design-ready versions in Figma for the Brand Asset Request Workflow
- On Strategy Scan Node: Consultant photographs a whiteboard at session end. Within 90 seconds, Claude has extracted the framework, structured it as a Notion document, and a design-ready version is queued in Figma for the Brand Asset Request Workflow.

## Permissions
API and MCP access listed for its device(s):
- **Strategy Scan Node**: APIs: ZenFlow /v1/knowledge/write; Anthropic claude-sonnet-4-6 (structure extraction); Notion API; Figma API (design hand-off). MCPs: Notion MCP; Figma MCP; Google Drive MCP; ZenFlow Internal API MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
No escalation path is stated beyond the device's workflows listed under Dependencies.

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Research Director]], [[Knowledge Keeper (Device Agent)]]
- n8n workflows: Brand Asset Request Workflow; Inbound Inquiry → Proposal Generator. See [[n8n Workflow Blueprint]].
- MCPs: Notion MCP; Figma MCP; Google Drive MCP; ZenFlow Internal API MCP
- Models as written in the spec: claude-sonnet-4-6. Current vault routing is in [[Agent Tier Registry]].
