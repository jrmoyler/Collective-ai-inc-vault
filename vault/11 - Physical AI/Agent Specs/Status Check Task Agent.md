---
title: Status Check Task Agent
tags:
- device-agent
- physical-ai
- wearables
- wearable
tier: not stated
type: device-agent
model: claude-haiku-4-5
owner: JR Moyler (Hataalii)
device: ZF-W02 Synaptic Relay Badge
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: ZenFlow
clearance: Aegis-governed device(s); see Aegis clause
device_count: 1
---
# Status Check Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[ZenFlow Division]].

## Role
On-demand 'status check' Task Agent triggered by one button tap on the Synaptic Relay Badge. Calls the ZenFlow API and returns the response as a haptic pattern.

## Devices it runs on
| Code | Device | Type | Section | Listed as |
|---|---|---|---|---|
| ZF-W02 | Synaptic Relay Badge | Wearable | [[Wearables Agent Spec — ZenFlow Devices]] | Task Agent (on-demand status check) |

## Inputs and sensors
- **Synaptic Relay Badge**: Seeed XIAO ESP32S3 Sense; Adafruit DRV2605L Haptic Controller; Arduino Nano 33 BLE Sense Rev2

## Outputs and actions
- Run a status check via /v1/agents/status
- Return results as coded vibrations
- On Synaptic Relay Badge: ZenFlow engineers on the Foundry floor get haptic alerts for deployment results and Aegis flags without unlocking a phone. Single button tap fires a Task Agent status check and returns results as coded vibrations.

## Permissions
API and MCP access listed for its device(s):
- **Synaptic Relay Badge**: APIs: ZenFlow /v1/agents/status; ZenFlow /v1/aegis/queue; Anthropic claude-haiku-4-5; BLE Gateway API. MCPs: ZenFlow Internal API MCP; Slack MCP.

## Aegis clause
- **Synaptic Relay Badge**: Haptic notification for Aegis Protocol flags that need engineering review.

## Escalation
Alert and review workflows on its devices:
- **Synaptic Relay Badge**: ZenFlow API Error Alerting; Aegis Incident Reporter

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[JWT Token Rotation Monitor]], [[Aegis Protocol Guardian]]
- n8n workflows: JWT Token Rotation Monitor; ZenFlow API Error Alerting; Aegis Incident Reporter. See [[n8n Workflow Blueprint]].
- MCPs: ZenFlow Internal API MCP; Slack MCP
- Models as written in the spec: claude-haiku-4-5. Current vault routing is in [[Agent Tier Registry]].
