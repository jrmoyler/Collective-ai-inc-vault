---
title: P.E.T.E.E.R. Assessment Task Agent
tags:
- device-agent
- physical-ai
- wearables
- field-kit
tier: not stated
type: device-agent
model: claude-sonnet-4-6, claude-haiku-4-5
owner: JR Moyler (Hataalii)
device: HL-W04 P.E.T.E.E.R. Assessment Node, HL-W05 Field Learning Kit
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Hybrid Living
clearance: not stated
device_count: 2
---
# P.E.T.E.E.R. Assessment Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Hybrid Living Division]].
Related: [[P.E.T.E.E.R. Framework]], [[Atlas Platform]].

## Role
Runs the P.E.T.E.E.R. pedagogical evaluation framework as a persistent Task Agent. Instructors voice-log observations and the agent turns them into structured outputs stored in the Atlas platform database.

## Devices it runs on
| Code | Device | Type | Section | Listed as |
|---|---|---|---|---|
| HL-W04 | P.E.T.E.E.R. Assessment Node | Physical AI | [[Wearables Agent Spec — Hybrid Living Devices]] | P.E.T.E.E.R. Assessment Task Agent |
| HL-W05 | Field Learning Kit | Field Kit | [[Wearables Agent Spec — Hybrid Living Devices]] | P.E.T.E.E.R. Assessment Task Agent |

## Inputs and sensors
- **P.E.T.E.E.R. Assessment Node**: Raspberry Pi 5 8GB; Whisplay HAT; ReSpeaker 2-Mics Pi HAT; Adafruit I2S Speaker Bonnet
- **Field Learning Kit**: Raspberry Pi 5 8GB; Whisplay HAT; ReSpeaker 4-Mic Array v2.0; LILYGO T-Deck Meshtastic

## Outputs and actions
- Produce structured competency maps
- Recommend interventions and exercises
- Update personalized learning paths and schedule check-ins
- On P.E.T.E.E.R. Assessment Node: An instructor voice-logs 'Marcus is strong on systems thinking but struggles with prompt design'. The Assessment Task Agent updates Marcus's competency map, flags a recommended exercise, and schedules a check-in for next session.
- On Field Learning Kit: Hybrid Living deploys to a community center with no reliable internet. The field kit runs the full Atlas learning experience locally, caches all interactions, and auto-syncs to the Foundry NAS and Knowledge Keeper the moment it reconnects to the mesh.

## Permissions
API and MCP access listed for its device(s):
- **P.E.T.E.E.R. Assessment Node**: APIs: ZenFlow /v1/agents/spawn; Anthropic claude-sonnet-4-6; Notion API; Airtable API (competency matrix). MCPs: Notion MCP; Airtable MCP; ZenFlow Internal API MCP.
- **Field Learning Kit**: APIs: ZenFlow Agent API (local cache); Anthropic claude-haiku-4-5 (edge inference); Meshtastic Python API. MCPs: ZenFlow Internal API MCP (local cache); n8n MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
No escalation path is stated beyond the device's workflows listed under Dependencies.

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Learning Path Agent]], [[Knowledge Keeper (Device Agent)]], [[Cohort Manager Task Agent]], [[AI Tutor Task Agent]]
- n8n workflows: Student Progress Report Generator; Cohort Engagement Monitor; Session Archive Sync on Return (fires on reconnect). See [[n8n Workflow Blueprint]].
- MCPs: Notion MCP; Airtable MCP; ZenFlow Internal API MCP; ZenFlow Internal API MCP (local cache); n8n MCP
- Models as written in the spec: claude-sonnet-4-6, claude-haiku-4-5. Current vault routing is in [[Agent Tier Registry]].
