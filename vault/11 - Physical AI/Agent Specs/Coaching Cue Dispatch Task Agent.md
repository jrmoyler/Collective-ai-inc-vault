---
title: Coaching Cue Dispatch Task Agent
tags:
- device-agent
- physical-ai
- wearables
- wearable
tier: not stated
type: device-agent
model: claude-haiku-4-5
owner: JR Moyler (Hataalii)
device: KE-W02 Kinetic IQ Wearable
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Kinetic Edge
clearance: not stated
device_count: 1
---
# Coaching Cue Dispatch Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Kinetic Edge Division]].
Related: [[Kinetic IQ]].

## Role
Runs for the Kinetic IQ Wearable. Monitors stride frequency via the IMU.

## Device it runs on
**KE-W02 Kinetic IQ Wearable** (Wearable), described in [[Wearables Agent Spec — Kinetic Edge Devices]]. An athlete wearable for real-time performance feedback. BLE-connected to the Apex System, it delivers haptic coaching cues during training: a single pulse for 'pace up', double for 'form correction', triple for 'stop and reset'. Post-session, the BLE upload triggers the Weekly Performance Report Generator, which produces a personalized improvement brief in Notion.

## Inputs and sensors
- **Kinetic IQ Wearable**: Arduino Nano 33 BLE Sense Rev2; IMU ICM-20948; Adafruit DRV2605L Haptic Controller; Adafruit Feather nRF52840 Sense

## Outputs and actions
- Send haptic cues: single 'pace up', double 'form correction', triple 'stop and reset'
- On Kinetic IQ Wearable: During a sprint session, the Coaching Cue Dispatch Task Agent monitors stride frequency via the IMU. When cadence drops below optimal threshold, the wristband delivers a double pulse: a real-time cue without the athlete looking at a screen or stopping to talk to a coach.

## Permissions
API and MCP access listed for its device(s):
- **Kinetic IQ Wearable**: APIs: ZenFlow /v1/agents (haptic dispatch); Anthropic claude-haiku-4-5 (cue logic); Airtable API; BLE Gateway API. MCPs: Airtable MCP; ZenFlow Internal API MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
Alert and review workflows on its devices:
- **Kinetic IQ Wearable**: Athlete Recovery Alert; Injury Risk Flag + Coaching Alert

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Apex System Performance Agent]], [[Biomechanical Analysis Task Agent]]
- n8n workflows: Weekly Performance Report Generator; Athlete Recovery Alert; Injury Risk Flag + Coaching Alert. See [[n8n Workflow Blueprint]].
- MCPs: Airtable MCP; ZenFlow Internal API MCP
- Models as written in the spec: claude-haiku-4-5. Current vault routing is in [[Agent Tier Registry]].
