---
title: JWT Token Rotation Monitor
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
# JWT Token Rotation Monitor

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[ZenFlow Division]].

## Role
Listed as an agent on the Synaptic Relay Badge, paired with the n8n workflow of the same name. Sends JWT expiry warnings to ZenFlow engineers.

## Device it runs on
**ZF-W02 Synaptic Relay Badge** (Wearable), described in [[Wearables Agent Spec — ZenFlow Devices]]. A BLE wearable for ZenFlow engineers that delivers haptic notifications for: new agent deployment success, Aegis Protocol flags requiring engineering review, and JWT token rotation alerts. One button tap on the badge triggers a 'status check' Task Agent via the ZenFlow API and reads the response back as a haptic pattern.

## Inputs and sensors
- **Synaptic Relay Badge**: Seeed XIAO ESP32S3 Sense; Adafruit DRV2605L Haptic Controller; Arduino Nano 33 BLE Sense Rev2

## Outputs and actions
- Send JWT token rotation and expiry alerts as haptic notifications
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
- Co-resident agents: [[Status Check Task Agent]], [[Aegis Protocol Guardian]]
- n8n workflows: JWT Token Rotation Monitor; ZenFlow API Error Alerting; Aegis Incident Reporter. See [[n8n Workflow Blueprint]].
- MCPs: ZenFlow Internal API MCP; Slack MCP
- Models as written in the spec: claude-haiku-4-5. Current vault routing is in [[Agent Tier Registry]].
