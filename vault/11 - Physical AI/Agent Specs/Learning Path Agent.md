---
title: Learning Path Agent
tags:
- device-agent
- physical-ai
- wearables
- edge-terminal
- wearable
tier: not stated
type: device-agent
model: claude-sonnet-4-6, claude-haiku-4-5
owner: JR Moyler (Hataalii)
device: HL-W01 Atlas Learning Kiosk, HL-W02 Cohort Engagement Badge, HL-W04 P.E.T.E.E.R. Assessment Node
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Hybrid Living
clearance: not stated
device_count: 3
---
# Learning Path Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Hybrid Living Division]].
Related: [[Atlas Platform]].

## Role
Maintains learning paths on the Hybrid Living kiosk, badge and assessment node.

## Devices it runs on
| Code | Device | Type | Section | Listed as |
|---|---|---|---|---|
| HL-W01 | Atlas Learning Kiosk | Edge Terminal | [[Wearables Agent Spec — Hybrid Living Devices]] | Learning Path Agent |
| HL-W02 | Cohort Engagement Badge | Wearable | [[Wearables Agent Spec — Hybrid Living Devices]] | Learning Path Agent |
| HL-W04 | P.E.T.E.E.R. Assessment Node | Physical AI | [[Wearables Agent Spec — Hybrid Living Devices]] | Learning Path Agent |

## Inputs and sensors
- **Atlas Learning Kiosk**: Raspberry Pi 5 8GB; Whisplay HAT; ReSpeaker 4-Mic Array v2.0; Adafruit I2S Speaker Bonnet; Pi Camera Module 3
- **Cohort Engagement Badge**: Arduino Nano 33 BLE Sense Rev2; Adafruit DRV2605L Haptic Controller; IMU BNO085; Circuit Playground Bluefruit
- **P.E.T.E.E.R. Assessment Node**: Raspberry Pi 5 8GB; Whisplay HAT; ReSpeaker 2-Mics Pi HAT; Adafruit I2S Speaker Bonnet

## Outputs and actions
- Update personalized learning paths
- On Atlas Learning Kiosk: A student asks the kiosk a question about AI ethics. The AI Tutor Task Agent retrieves their learning history from Notion, generates a Socratic question calibrated to their level, and logs the exchange to Knowledge Keeper for curriculum optimization.
- On Cohort Engagement Badge: During a 3-day AI business cohort, every participant wears a badge. Engagement data feeds the Cohort Manager Task Agent, which surfaces real-time insights to the instructor's display and adjusts the session pacing recommendation automatically.
- On P.E.T.E.E.R. Assessment Node: An instructor voice-logs 'Marcus is strong on systems thinking but struggles with prompt design'. The Assessment Task Agent updates Marcus's competency map, flags a recommended exercise, and schedules a check-in for next session.

## Permissions
API and MCP access listed for its device(s):
- **Atlas Learning Kiosk**: APIs: ZenFlow /v1/agents/spawn; Anthropic claude-sonnet-4-6; Notion API (learning state); Airtable API (progress tracking). MCPs: Notion MCP; Airtable MCP; ZenFlow Internal API MCP.
- **Cohort Engagement Badge**: APIs: ZenFlow /v1/knowledge/write; Anthropic claude-haiku-4-5 (engagement analysis); Airtable API; BLE Gateway API. MCPs: Airtable MCP; Notion MCP; ZenFlow Internal API MCP.
- **P.E.T.E.E.R. Assessment Node**: APIs: ZenFlow /v1/agents/spawn; Anthropic claude-sonnet-4-6; Notion API; Airtable API (competency matrix). MCPs: Notion MCP; Airtable MCP; ZenFlow Internal API MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
No escalation path is stated beyond the device's workflows listed under Dependencies.

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[AI Tutor Task Agent]], [[Knowledge Keeper (Device Agent)]], [[Cohort Manager Task Agent]], [[P.E.T.E.E.R. Assessment Task Agent]]
- n8n workflows: Student Progress Report Generator; Cohort Engagement Monitor; Hybrid Living Enrollment Sequence; Weekly Performance Report Generator. See [[n8n Workflow Blueprint]].
- MCPs: Notion MCP; Airtable MCP; ZenFlow Internal API MCP
- Models as written in the spec: claude-sonnet-4-6, claude-haiku-4-5. Current vault routing is in [[Agent Tier Registry]].
