---
title: Biomechanical Analysis Task Agent
tags:
- device-agent
- physical-ai
- wearables
- wearable
tier: not stated
type: device-agent
model: claude-sonnet-4-6, claude-haiku-4-5
owner: JR Moyler (Hataalii)
device: KE-W01 Apex Motion Cage, KE-W02 Kinetic IQ Wearable
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Kinetic Edge
clearance: not stated
device_count: 2
---
# Biomechanical Analysis Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Kinetic Edge Division]].
Related: [[Kinetic IQ]].

## Role
Analyzes 3D motion, gait and reaction timing from the cage and the Kinetic IQ Wearable.

## Devices it runs on
| Code | Device | Type | Section | Listed as |
|---|---|---|---|---|
| KE-W01 | Apex Motion Cage | Physical AI | [[Wearables Agent Spec — Kinetic Edge Devices]] | Biomechanical Analysis Task Agent |
| KE-W02 | Kinetic IQ Wearable | Wearable | [[Wearables Agent Spec — Kinetic Edge Devices]] | Biomechanical Analysis Task Agent |

## Inputs and sensors
- **Apex Motion Cage**: Raspberry Pi 5 8GB (×2); Pi Global Shutter Camera (×2); IMU BNO085 (×3); NVIDIA Jetson Orin Nano Super; Arduino Nano 33 BLE Sense Rev2
- **Kinetic IQ Wearable**: Arduino Nano 33 BLE Sense Rev2; IMU ICM-20948; Adafruit DRV2605L Haptic Controller; Adafruit Feather nRF52840 Sense

## Outputs and actions
- Produce biomechanical analysis for profiles and cue logic
- On Apex Motion Cage: An athlete runs a gait protocol. The Injury Risk Monitor detects an asymmetry in the left knee torque vector, fires the Injury Risk Flag workflow, which instantly alerts the trainer via Slack, schedules a wellness check in Airtable, and logs a Vital Helix integration request for recovery protocol generation.
- On Kinetic IQ Wearable: During a sprint session, the Coaching Cue Dispatch Task Agent monitors stride frequency via the IMU. When cadence drops below optimal threshold, the wristband delivers a double pulse: a real-time cue without the athlete looking at a screen or stopping to talk to a coach.

## Permissions
API and MCP access listed for its device(s):
- **Apex Motion Cage**: APIs: ZenFlow /v1/knowledge/write; Anthropic claude-sonnet-4-6 (profile generation); Airtable API (athlete profiles); Slack API (coach alerts). MCPs: Airtable MCP; Slack MCP; ZenFlow Internal API MCP.
- **Kinetic IQ Wearable**: APIs: ZenFlow /v1/agents (haptic dispatch); Anthropic claude-haiku-4-5 (cue logic); Airtable API; BLE Gateway API. MCPs: Airtable MCP; ZenFlow Internal API MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
Alert and review workflows on its devices:
- **Apex Motion Cage**: Injury Risk Flag + Coaching Alert; Athlete Recovery Alert
- **Kinetic IQ Wearable**: Athlete Recovery Alert; Injury Risk Flag + Coaching Alert

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Apex System Performance Agent]], [[Injury Risk Monitor Task Agent]], [[Knowledge Keeper (Device Agent)]], [[Coaching Cue Dispatch Task Agent]]
- n8n workflows: Injury Risk Flag + Coaching Alert; Weekly Performance Report Generator; Athlete Recovery Alert; Scout Intelligence Aggregator. See [[n8n Workflow Blueprint]].
- MCPs: Airtable MCP; Slack MCP; ZenFlow Internal API MCP
- Models as written in the spec: claude-sonnet-4-6, claude-haiku-4-5. Current vault routing is in [[Agent Tier Registry]].
