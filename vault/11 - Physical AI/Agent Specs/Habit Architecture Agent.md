---
title: Habit Architecture Agent
tags:
- device-agent
- physical-ai
- wearables
- wearable
tier: not stated
type: device-agent
model: claude-sonnet-4-6, claude-haiku-4-5
owner: JR Moyler (Hataalii)
device: CM-W01 Cognitive Coaching Shell, CM-W02 Habit Architecture Wearable, CM-W05 Neuro-Pulse Wristband
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Cognara Mind
clearance: not stated
device_count: 3
---
# Habit Architecture Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Cognara Mind Division]].
Related: [[Neuro-Pulse]].

## Role
Runs on the Cognara Mac mini. Fires habit formation protocols through the Habit Architecture Workflow at scheduled intervention points.

## Devices it runs on
| Code | Device | Type | Section | Listed as |
|---|---|---|---|---|
| CM-W01 | Cognitive Coaching Shell | Physical AI | [[Wearables Agent Spec — Cognara Mind Devices]] | Habit Architecture Agent |
| CM-W02 | Habit Architecture Wearable | Wearable | [[Wearables Agent Spec — Cognara Mind Devices]] | Habit Architecture Agent |
| CM-W05 | Neuro-Pulse Wristband | Wearable | [[Wearables Agent Spec — Cognara Mind Devices]] | Habit Architecture Agent |

## Inputs and sensors
- **Cognitive Coaching Shell**: Raspberry Pi 5 8GB; Whisplay HAT; ReSpeaker 4-Mic Array v2.0; NVIDIA Jetson Orin Nano Super; Adafruit I2S Speaker Bonnet
- **Habit Architecture Wearable**: Adafruit Feather nRF52840 Sense; Adafruit DRV2605L Haptic Controller; IMU ICM-20948 (post-nudge response capture); Arduino Nano 33 BLE Sense Rev2
- **Neuro-Pulse Wristband**: Arduino Nano 33 BLE Sense Rev2; IMU BNO085 (orientation + motion); Adafruit DRV2605L Haptic Controller; Adafruit Feather nRF52840 Sense (BLE hub)

## Outputs and actions
- Send timed haptic nudges
- Fire micro-commitment exercises
- Time Neuro-Pulse cues (focus start, distraction, load peak, recovery)
- On Cognitive Coaching Shell: A user starts their morning check-in with Cognara Mind. The Psychographic Profile Agent retrieves yesterday's behavioral log, the Cognitive Coach generates a calibrated challenge question, and the Habit Architecture Agent fires a scheduled micro-commitment exercise, all coordinated through the ZenFlow agent API in a single conversational session.
- On Habit Architecture Wearable: The Behavioral Pattern Analysis Agent determines that the user has an 85% habit completion rate when nudged at 9:47AM versus 71% at 10:15AM. The next day's nudge is automatically rescheduled to 9:47AM: the wristband self-optimizes without user configuration.
- On Neuro-Pulse Wristband: The user enters a deep work block. The Cognitive Load Monitor Task Agent detects sustained focus from motion stability and delivers a single confirming pulse: 'you're in flow'. 90 minutes later, a double pulse signals optimal break timing. The Psychographic Profile Agent logs the session and refines the user's cognitive performance model.

## Permissions
API and MCP access listed for its device(s):
- **Cognitive Coaching Shell**: APIs: ZenFlow /v1/agents/spawn; Anthropic claude-sonnet-4-6 (coaching dialogue); Notion API (behavioral profile); Airtable API (habit tracking); ZenFlow /v1/knowledge/write. MCPs: Notion MCP; Airtable MCP; ZenFlow Internal API MCP.
- **Habit Architecture Wearable**: APIs: ZenFlow /v1/agents (haptic dispatch); Anthropic claude-haiku-4-5 (nudge optimization); Airtable API (habit log); BLE Gateway API. MCPs: Airtable MCP; ZenFlow Internal API MCP.
- **Neuro-Pulse Wristband**: APIs: ZenFlow /v1/agents (haptic event dispatch); Anthropic claude-haiku-4-5 (cognitive load inference); Airtable API; BLE Gateway API. MCPs: Airtable MCP; ZenFlow Internal API MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
No escalation path is stated beyond the device's workflows listed under Dependencies.

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Cognitive Coach Task Agent]], [[Behavioral Pattern Analysis Agent]], [[Knowledge Keeper (Device Agent)]], [[Psychographic Profile Agent]], [[Cognitive Load Monitor Task Agent]]
- n8n workflows: Habit Architecture Workflow (scheduled interventions); Behavioral Pattern Digest (weekly profile update); Cognara Mind Engagement Monitor; Habit Architecture Workflow (nudge scheduling); Behavioral Pattern Digest (weekly model update); Habit Architecture Workflow; Behavioral Pattern Digest (longitudinal update). See [[n8n Workflow Blueprint]].
- MCPs: Notion MCP; Airtable MCP; ZenFlow Internal API MCP
- Models as written in the spec: claude-sonnet-4-6, claude-haiku-4-5. Current vault routing is in [[Agent Tier Registry]].
