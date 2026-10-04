---
title: AI Tutor Task Agent
tags:
- device-agent
- physical-ai
- wearables
- edge-terminal
- field-kit
tier: not stated
type: device-agent
model: claude-sonnet-4-6, claude-haiku-4-5
owner: JR Moyler (Hataalii)
device: HL-W01 Atlas Learning Kiosk, HL-W05 Field Learning Kit
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Hybrid Living
clearance: not stated
device_count: 2
---
# AI Tutor Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Hybrid Living Division]].
Related: [[P.E.T.E.E.R. Framework]], [[Atlas Platform]].

## Role
Hybrid Living AI tutor. Generates Socratic responses calibrated to the student's learning state tracked in Notion/Airtable. The P.E.T.E.E.R. pedagogical framework is embedded in its system prompt. Runs in offline mode on the Field Learning Kit.

## Devices it runs on
| Code | Device | Type | Section | Listed as |
|---|---|---|---|---|
| HL-W01 | Atlas Learning Kiosk | Edge Terminal | [[Wearables Agent Spec — Hybrid Living Devices]] | AI Tutor Task Agent (P.E.T.E.E.R. framework) |
| HL-W05 | Field Learning Kit | Field Kit | [[Wearables Agent Spec — Hybrid Living Devices]] | AI Tutor Task Agent (offline mode) |

## Inputs and sensors
- **Atlas Learning Kiosk**: Raspberry Pi 5 8GB; Whisplay HAT; ReSpeaker 4-Mic Array v2.0; Adafruit I2S Speaker Bonnet; Pi Camera Module 3
- **Field Learning Kit**: Raspberry Pi 5 8GB; Whisplay HAT; ReSpeaker 4-Mic Array v2.0; LILYGO T-Deck Meshtastic

## Outputs and actions
- Retrieve learning history from Notion
- Generate calibrated Socratic questions
- Log exchanges to Knowledge Keeper for curriculum optimization
- On Atlas Learning Kiosk: A student asks the kiosk a question about AI ethics. The AI Tutor Task Agent retrieves their learning history from Notion, generates a Socratic question calibrated to their level, and logs the exchange to Knowledge Keeper for curriculum optimization.
- On Field Learning Kit: Hybrid Living deploys to a community center with no reliable internet. The field kit runs the full Atlas learning experience locally, caches all interactions, and auto-syncs to the Foundry NAS and Knowledge Keeper the moment it reconnects to the mesh.

## Permissions
API and MCP access listed for its device(s):
- **Atlas Learning Kiosk**: APIs: ZenFlow /v1/agents/spawn; Anthropic claude-sonnet-4-6; Notion API (learning state); Airtable API (progress tracking). MCPs: Notion MCP; Airtable MCP; ZenFlow Internal API MCP.
- **Field Learning Kit**: APIs: ZenFlow Agent API (local cache); Anthropic claude-haiku-4-5 (edge inference); Meshtastic Python API. MCPs: ZenFlow Internal API MCP (local cache); n8n MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
No escalation path is stated beyond the device's workflows listed under Dependencies.

## System prompt
The spec does not reproduce the prompt text. It states that the P.E.T.E.E.R. pedagogical framework is embedded in the agent system prompt. See [[P.E.T.E.E.R. Framework]].

## Dependencies
- Co-resident agents: [[Learning Path Agent]], [[Knowledge Keeper (Device Agent)]], [[Cohort Manager Task Agent]], [[P.E.T.E.E.R. Assessment Task Agent]]
- n8n workflows: Student Progress Report Generator; Cohort Engagement Monitor; Hybrid Living Enrollment Sequence; Session Archive Sync on Return (fires on reconnect). See [[n8n Workflow Blueprint]].
- MCPs: Notion MCP; Airtable MCP; ZenFlow Internal API MCP; ZenFlow Internal API MCP (local cache); n8n MCP
- Models as written in the spec: claude-sonnet-4-6, claude-haiku-4-5. Current vault routing is in [[Agent Tier Registry]].
