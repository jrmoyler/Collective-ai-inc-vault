---
title: Cognitive Load Monitor Task Agent
tags:
- device-agent
- physical-ai
- wearables
- wearable
tier: not stated
type: device-agent
model: claude-haiku-4-5
owner: JR Moyler (Hataalii)
device: CM-W05 Neuro-Pulse Wristband
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Cognara Mind
clearance: not stated
device_count: 1
---
# Cognitive Load Monitor Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Cognara Mind Division]].
Related: [[Neuro-Pulse]].

## Role
Runs for the Neuro-Pulse Wristband. Detects sustained focus from motion stability.

## Device it runs on
**CM-W05 Neuro-Pulse Wristband** (Wearable), described in [[Wearables Agent Spec — Cognara Mind Devices]]. Cognara Mind's cognitive performance wearable. Captures continuous motion, orientation, and environmental signals that the Psychographic Profile Agent uses to build a longitudinal cognitive performance map. The wristband delivers context-sensitive haptic cues for: focus session start, distraction alert, cognitive load peak warning, and recovery prompt, all timed by the Habit Architecture Agent.

## Inputs and sensors
- **Neuro-Pulse Wristband**: Arduino Nano 33 BLE Sense Rev2; IMU BNO085 (orientation + motion); Adafruit DRV2605L Haptic Controller; Adafruit Feather nRF52840 Sense (BLE hub)

## Outputs and actions
- Send a single 'you're in flow' pulse
- Send a double pulse at optimal break timing (90 minutes later in the spec's example)
- On Neuro-Pulse Wristband: The user enters a deep work block. The Cognitive Load Monitor Task Agent detects sustained focus from motion stability and delivers a single confirming pulse: 'you're in flow'. 90 minutes later, a double pulse signals optimal break timing. The Psychographic Profile Agent logs the session and refines the user's cognitive performance model.

## Permissions
API and MCP access listed for its device(s):
- **Neuro-Pulse Wristband**: APIs: ZenFlow /v1/agents (haptic event dispatch); Anthropic claude-haiku-4-5 (cognitive load inference); Airtable API; BLE Gateway API. MCPs: Airtable MCP; ZenFlow Internal API MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
No escalation path is stated beyond the device's workflows listed under Dependencies.

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Psychographic Profile Agent]], [[Habit Architecture Agent]], [[Knowledge Keeper (Device Agent)]]
- n8n workflows: Habit Architecture Workflow; Behavioral Pattern Digest (longitudinal update). See [[n8n Workflow Blueprint]].
- MCPs: Airtable MCP; ZenFlow Internal API MCP
- Models as written in the spec: claude-haiku-4-5. Current vault routing is in [[Agent Tier Registry]].
