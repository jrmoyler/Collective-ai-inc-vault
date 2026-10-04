---
title: Psychographic Profile Agent
tags:
- device-agent
- physical-ai
- wearables
- wearable
tier: not stated
type: device-agent
model: claude-sonnet-4-6, claude-haiku-4-5
owner: JR Moyler (Hataalii)
device: CM-W01 Cognitive Coaching Shell, CM-W02 Habit Architecture Wearable, CM-W03 Behavioral Sensing Station, CM-W05 Neuro-Pulse Wristband
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Cognara Mind
clearance: not stated
device_count: 4
---
# Psychographic Profile Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Cognara Mind Division]].
Related: [[Neuro-Pulse]].

## Role
Builds user behavioral and longitudinal cognitive performance profiles.

## Devices it runs on
| Code | Device | Type | Section | Listed as |
|---|---|---|---|---|
| CM-W01 | Cognitive Coaching Shell | Physical AI | [[Wearables Agent Spec — Cognara Mind Devices]] | Psychographic Profile Agent |
| CM-W02 | Habit Architecture Wearable | Wearable | [[Wearables Agent Spec — Cognara Mind Devices]] | Psychographic Profile Agent |
| CM-W03 | Behavioral Sensing Station | Physical AI | [[Wearables Agent Spec — Cognara Mind Devices]] | Psychographic Profile Agent |
| CM-W05 | Neuro-Pulse Wristband | Wearable | [[Wearables Agent Spec — Cognara Mind Devices]] | Psychographic Profile Agent |

## Inputs and sensors
- **Cognitive Coaching Shell**: Raspberry Pi 5 8GB; Whisplay HAT; ReSpeaker 4-Mic Array v2.0; NVIDIA Jetson Orin Nano Super; Adafruit I2S Speaker Bonnet
- **Habit Architecture Wearable**: Adafruit Feather nRF52840 Sense; Adafruit DRV2605L Haptic Controller; IMU ICM-20948 (post-nudge response capture); Arduino Nano 33 BLE Sense Rev2
- **Behavioral Sensing Station**: Raspberry Pi 5 8GB; ReSpeaker 4-Mic Array v2.0 (tone analysis); IMU BNO085 (micro-gesture); Pi Camera Module 3 (opt-in facial context); Arduino Nano 33 BLE Sense Rev2; Whisplay HAT
- **Neuro-Pulse Wristband**: Arduino Nano 33 BLE Sense Rev2; IMU BNO085 (orientation + motion); Adafruit DRV2605L Haptic Controller; Adafruit Feather nRF52840 Sense (BLE hub)

## Outputs and actions
- Retrieve the prior day's behavioral log
- Log sessions and refine the cognitive performance model

## Permissions
API and MCP access listed for its device(s):
- **Cognitive Coaching Shell**: APIs: ZenFlow /v1/agents/spawn; Anthropic claude-sonnet-4-6 (coaching dialogue); Notion API (behavioral profile); Airtable API (habit tracking); ZenFlow /v1/knowledge/write. MCPs: Notion MCP; Airtable MCP; ZenFlow Internal API MCP.
- **Habit Architecture Wearable**: APIs: ZenFlow /v1/agents (haptic dispatch); Anthropic claude-haiku-4-5 (nudge optimization); Airtable API (habit log); BLE Gateway API. MCPs: Airtable MCP; ZenFlow Internal API MCP.
- **Behavioral Sensing Station**: APIs: Anthropic claude-sonnet-4-6 (tone + pattern analysis); ZenFlow /v1/knowledge/write; Airtable API; ZenFlow /v1/agents/spawn. MCPs: Airtable MCP; Notion MCP; ZenFlow Internal API MCP.
- **Neuro-Pulse Wristband**: APIs: ZenFlow /v1/agents (haptic event dispatch); Anthropic claude-haiku-4-5 (cognitive load inference); Airtable API; BLE Gateway API. MCPs: Airtable MCP; ZenFlow Internal API MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
No escalation path is stated beyond the device's workflows listed under Dependencies.

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Cognitive Coach Task Agent]], [[Behavioral Pattern Analysis Agent]], [[Habit Architecture Agent]], [[Knowledge Keeper (Device Agent)]], [[Cognitive Load Monitor Task Agent]]
- n8n workflows: Habit Architecture Workflow (scheduled interventions); Behavioral Pattern Digest (weekly profile update); Cognara Mind Engagement Monitor; Habit Architecture Workflow (nudge scheduling); Behavioral Pattern Digest (weekly model update); Behavioral Pattern Digest; Habit Architecture Workflow; Behavioral Pattern Digest (longitudinal update). See [[n8n Workflow Blueprint]].
- MCPs: Notion MCP; Airtable MCP; ZenFlow Internal API MCP
- Models as written in the spec: claude-sonnet-4-6, claude-haiku-4-5. Current vault routing is in [[Agent Tier Registry]].
