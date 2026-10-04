---
title: Behavioral Pattern Analysis Agent
tags:
- device-agent
- physical-ai
- wearables
- wearable
- field-kit
tier: not stated
type: device-agent
model: claude-sonnet-4-6, claude-haiku-4-5
owner: JR Moyler (Hataalii)
device: CM-W01 Cognitive Coaching Shell, CM-W02 Habit Architecture Wearable, CM-W03 Behavioral Sensing Station, CM-W04 Psychographic Field Kit
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Cognara Mind
clearance: not stated
device_count: 4
---
# Behavioral Pattern Analysis Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Cognara Mind Division]].

## Role
Processes voice tone, micro-gesture and post-nudge response signals through Claude.

## Devices it runs on
| Code | Device | Type | Section | Listed as |
|---|---|---|---|---|
| CM-W01 | Cognitive Coaching Shell | Physical AI | [[Wearables Agent Spec — Cognara Mind Devices]] | Behavioral Pattern Analysis Agent |
| CM-W02 | Habit Architecture Wearable | Wearable | [[Wearables Agent Spec — Cognara Mind Devices]] | Behavioral Pattern Analysis Agent |
| CM-W03 | Behavioral Sensing Station | Physical AI | [[Wearables Agent Spec — Cognara Mind Devices]] | Behavioral Pattern Analysis Agent |
| CM-W04 | Psychographic Field Kit | Field Kit | [[Wearables Agent Spec — Cognara Mind Devices]] | Behavioral Pattern Analysis Agent (local cache) |

## Inputs and sensors
- **Cognitive Coaching Shell**: Raspberry Pi 5 8GB; Whisplay HAT; ReSpeaker 4-Mic Array v2.0; NVIDIA Jetson Orin Nano Super; Adafruit I2S Speaker Bonnet
- **Habit Architecture Wearable**: Adafruit Feather nRF52840 Sense; Adafruit DRV2605L Haptic Controller; IMU ICM-20948 (post-nudge response capture); Arduino Nano 33 BLE Sense Rev2
- **Behavioral Sensing Station**: Raspberry Pi 5 8GB; ReSpeaker 4-Mic Array v2.0 (tone analysis); IMU BNO085 (micro-gesture); Pi Camera Module 3 (opt-in facial context); Arduino Nano 33 BLE Sense Rev2; Whisplay HAT
- **Psychographic Field Kit**: Raspberry Pi 5 8GB; Whisplay HAT; ReSpeaker 4-Mic Array v2.0; LILYGO T-Deck Meshtastic

## Outputs and actions
- Produce structured behavioral state maps
- Detect cognitive load elevation
- Set nudge timing from habit history (e.g. 85% completion at 9:47AM vs 71% at 10:15AM)
- Produce post-session reports

## Permissions
API and MCP access listed for its device(s):
- **Cognitive Coaching Shell**: APIs: ZenFlow /v1/agents/spawn; Anthropic claude-sonnet-4-6 (coaching dialogue); Notion API (behavioral profile); Airtable API (habit tracking); ZenFlow /v1/knowledge/write. MCPs: Notion MCP; Airtable MCP; ZenFlow Internal API MCP.
- **Habit Architecture Wearable**: APIs: ZenFlow /v1/agents (haptic dispatch); Anthropic claude-haiku-4-5 (nudge optimization); Airtable API (habit log); BLE Gateway API. MCPs: Airtable MCP; ZenFlow Internal API MCP.
- **Behavioral Sensing Station**: APIs: Anthropic claude-sonnet-4-6 (tone + pattern analysis); ZenFlow /v1/knowledge/write; Airtable API; ZenFlow /v1/agents/spawn. MCPs: Airtable MCP; Notion MCP; ZenFlow Internal API MCP.
- **Psychographic Field Kit**: APIs: ZenFlow Agent API (local cache); Anthropic claude-haiku-4-5 (edge inference); Meshtastic Python API. MCPs: ZenFlow Internal API MCP (local cache); n8n MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
No escalation path is stated beyond the device's workflows listed under Dependencies.

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Cognitive Coach Task Agent]], [[Habit Architecture Agent]], [[Knowledge Keeper (Device Agent)]], [[Psychographic Profile Agent]]
- n8n workflows: Habit Architecture Workflow (scheduled interventions); Behavioral Pattern Digest (weekly profile update); Cognara Mind Engagement Monitor; Habit Architecture Workflow (nudge scheduling); Behavioral Pattern Digest (weekly model update); Behavioral Pattern Digest; Habit Architecture Workflow; Session Archive Sync (fires on mesh reconnect). See [[n8n Workflow Blueprint]].
- MCPs: Notion MCP; Airtable MCP; ZenFlow Internal API MCP; ZenFlow Internal API MCP (local cache); n8n MCP
- Models as written in the spec: claude-sonnet-4-6, claude-haiku-4-5. Current vault routing is in [[Agent Tier Registry]].
