---
title: Recovery Intelligence Task Agent
tags:
- device-agent
- physical-ai
- wearables
tier: not stated
type: device-agent
model: claude-sonnet-4-6
owner: JR Moyler (Hataalii)
device: KE-W04 Recovery Intelligence Node
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Kinetic Edge
clearance: not stated
device_count: 1
---
# Recovery Intelligence Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Kinetic Edge Division]].
Related: [[Kinetic IQ]].

## Role
Runs on the Recovery Intelligence Node. Compares overnight sleep + HRV readiness data from Kinetic IQ wearables with each athlete's performance baseline.

## Device it runs on
**KE-W04 Recovery Intelligence Node** (Physical AI), described in [[Wearables Agent Spec — Kinetic Edge Devices]]. A desk recovery monitoring station that aggregates BLE biometric data from athletes' Kinetic IQ wearables overnight and runs the Athlete Recovery Alert workflow. The Recovery Intelligence Task Agent compares current readiness metrics against the athlete's performance baseline and generates a same-morning training load recommendation that coaches receive before the first session.

## Inputs and sensors
- **Recovery Intelligence Node**: Raspberry Pi 5 8GB; Adafruit Feather nRF52840 Sense (BLE aggregator hub); IMU BNO085 (ambient motion baseline); Whisplay HAT

## Outputs and actions
- Deliver a color-coded readiness briefing and same-morning training load recommendation to coaches at 6AM
- On Recovery Intelligence Node: Overnight, athletes' Kinetic IQ wearables upload sleep + HRV data. The Recovery Intelligence Task Agent synthesizes training load history + recovery metrics and delivers a color-coded readiness briefing to coaches at 6AM, before any athlete sets foot in the facility.

## Permissions
API and MCP access listed for its device(s):
- **Recovery Intelligence Node**: APIs: ZenFlow /v1/knowledge/write; Anthropic claude-sonnet-4-6 (load recommendation); Airtable API; Vital Helix API (health cross-reference); Slack API. MCPs: Airtable MCP; Slack MCP; ZenFlow Internal API MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
Alert and review workflows on its devices:
- **Recovery Intelligence Node**: Athlete Recovery Alert

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Athlete Recovery Alert Agent]], [[Vital Helix Integration Task Agent]], [[Knowledge Keeper (Device Agent)]]
- n8n workflows: Athlete Recovery Alert; Weekly Performance Report Generator; Vital Helix cross-integration (shared recovery data). See [[n8n Workflow Blueprint]].
- MCPs: Airtable MCP; Slack MCP; ZenFlow Internal API MCP
- Models as written in the spec: claude-sonnet-4-6. Current vault routing is in [[Agent Tier Registry]].
