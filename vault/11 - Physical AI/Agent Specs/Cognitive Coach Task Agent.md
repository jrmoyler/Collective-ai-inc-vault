---
title: Cognitive Coach Task Agent
tags:
- device-agent
- physical-ai
- wearables
- field-kit
tier: not stated
type: device-agent
model: claude-sonnet-4-6, claude-haiku-4-5
owner: JR Moyler (Hataalii)
device: CM-W01 Cognitive Coaching Shell, CM-W03 Behavioral Sensing Station, CM-W04 Psychographic Field Kit
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Cognara Mind
clearance: not stated
device_count: 3
---
# Cognitive Coach Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Cognara Mind Division]].

## Role
Cognara Mind's conversational coach, built on the #E0267E Signal Rose brand framework. Runs as a persistent ZenFlow session on the Cognitive Coaching Shell and offline on the Psychographic Field Kit.

## Devices it runs on
| Code | Device | Type | Section | Listed as |
|---|---|---|---|---|
| CM-W01 | Cognitive Coaching Shell | Physical AI | [[Wearables Agent Spec — Cognara Mind Devices]] | Cognitive Coach Task Agent |
| CM-W03 | Behavioral Sensing Station | Physical AI | [[Wearables Agent Spec — Cognara Mind Devices]] | Cognitive Coach Task Agent |
| CM-W04 | Psychographic Field Kit | Field Kit | [[Wearables Agent Spec — Cognara Mind Devices]] | Cognitive Coach Task Agent (offline) |

## Inputs and sensors
- **Cognitive Coaching Shell**: Raspberry Pi 5 8GB; Whisplay HAT; ReSpeaker 4-Mic Array v2.0; NVIDIA Jetson Orin Nano Super; Adafruit I2S Speaker Bonnet
- **Behavioral Sensing Station**: Raspberry Pi 5 8GB; ReSpeaker 4-Mic Array v2.0 (tone analysis); IMU BNO085 (micro-gesture); Pi Camera Module 3 (opt-in facial context); Arduino Nano 33 BLE Sense Rev2; Whisplay HAT
- **Psychographic Field Kit**: Raspberry Pi 5 8GB; Whisplay HAT; ReSpeaker 4-Mic Array v2.0; LILYGO T-Deck Meshtastic

## Outputs and actions
- Generate calibrated challenge questions
- Shift framing in real time on signals from the Behavioral Pattern Analysis Agent
- On Cognitive Coaching Shell: A user starts their morning check-in with Cognara Mind. The Psychographic Profile Agent retrieves yesterday's behavioral log, the Cognitive Coach generates a calibrated challenge question, and the Habit Architecture Agent fires a scheduled micro-commitment exercise, all coordinated through the ZenFlow agent API in a single conversational session.
- On Behavioral Sensing Station: During a Cognara Mind coaching session, the Behavioral Sensing Station monitors vocal tone and physical micro-gestures. The Behavioral Pattern Analysis Agent detects cognitive load elevation at minute 23 and signals the Cognitive Coach to shift from analytical to narrative framing, in real time.
- On Psychographic Field Kit: Cognara Mind deploys to an off-site corporate wellness event. The field kit runs full coaching sessions on local inference, no internet required. On return, the Behavioral Pattern Analysis Agent's session data syncs to the Foundry NAS and the Airtable habit tracking system automatically.

## Permissions
API and MCP access listed for its device(s):
- **Cognitive Coaching Shell**: APIs: ZenFlow /v1/agents/spawn; Anthropic claude-sonnet-4-6 (coaching dialogue); Notion API (behavioral profile); Airtable API (habit tracking); ZenFlow /v1/knowledge/write. MCPs: Notion MCP; Airtable MCP; ZenFlow Internal API MCP.
- **Behavioral Sensing Station**: APIs: Anthropic claude-sonnet-4-6 (tone + pattern analysis); ZenFlow /v1/knowledge/write; Airtable API; ZenFlow /v1/agents/spawn. MCPs: Airtable MCP; Notion MCP; ZenFlow Internal API MCP.
- **Psychographic Field Kit**: APIs: ZenFlow Agent API (local cache); Anthropic claude-haiku-4-5 (edge inference); Meshtastic Python API. MCPs: ZenFlow Internal API MCP (local cache); n8n MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
No escalation path is stated beyond the device's workflows listed under Dependencies.

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Behavioral Pattern Analysis Agent]], [[Habit Architecture Agent]], [[Knowledge Keeper (Device Agent)]], [[Psychographic Profile Agent]]
- n8n workflows: Habit Architecture Workflow (scheduled interventions); Behavioral Pattern Digest (weekly profile update); Cognara Mind Engagement Monitor; Behavioral Pattern Digest; Habit Architecture Workflow; Session Archive Sync (fires on mesh reconnect). See [[n8n Workflow Blueprint]].
- MCPs: Notion MCP; Airtable MCP; ZenFlow Internal API MCP; ZenFlow Internal API MCP (local cache); n8n MCP
- Models as written in the spec: claude-sonnet-4-6, claude-haiku-4-5. Current vault routing is in [[Agent Tier Registry]].
