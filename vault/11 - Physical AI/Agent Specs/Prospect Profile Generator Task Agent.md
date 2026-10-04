---
title: Prospect Profile Generator Task Agent
tags:
- device-agent
- physical-ai
- wearables
- edge-terminal
tier: not stated
type: device-agent
model: claude-sonnet-4-6
owner: JR Moyler (Hataalii)
device: KE-W05 Scout Intelligence Terminal
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Kinetic Edge
clearance: not stated
device_count: 1
---
# Prospect Profile Generator Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Kinetic Edge Division]].

## Role
Generates prospect profiles on the Scout Intelligence Terminal.

## Device it runs on
**KE-W05 Scout Intelligence Terminal** (Edge Terminal), described in [[Wearables Agent Spec — Kinetic Edge Devices]]. A dedicated Pi 5 terminal running the Scout Intelligence Aggregator workflow. Monitors draft/transfer news RSS, Claude filters by sport and position relevance, and the Scout Agent builds structured prospect profiles with public performance data, social signals from LunarCrush, and comparable athlete baselines. All profiles are stored in Airtable and accessible from the TeamOS platform.

## Inputs and sensors
- **Scout Intelligence Terminal**: Raspberry Pi 5 8GB; Whisplay HAT; Pi Camera Module 3; Adafruit I2S Speaker Bonnet

## Outputs and actions
- Produce scouting reports with a fit score against current roster needs
- On Scout Intelligence Terminal: Coaches get a Slack notification: '3 new prospects profiled overnight'. They open Airtable and find fully structured scouting reports: performance data, social presence, comparable baselines, and a fit score against the team's current roster needs, all produced autonomously.

## Permissions
API and MCP access listed for its device(s):
- **Scout Intelligence Terminal**: APIs: Anthropic claude-sonnet-4-6 (profile generation); LunarCrush API (athlete social); Perplexity Pro API (news research); Airtable API; ZenFlow /v1/knowledge/write. MCPs: LunarCrush MCP; Airtable MCP; ZenFlow Internal API MCP; Notion MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
No escalation path is stated beyond the device's workflows listed under Dependencies.

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Scout Intelligence Agent]], [[Research Director]], [[Knowledge Keeper (Device Agent)]]
- n8n workflows: Scout Intelligence Aggregator; Weekly Performance Report Generator; Kinetic IQ Consumer Onboarding. See [[n8n Workflow Blueprint]].
- MCPs: LunarCrush MCP; Airtable MCP; ZenFlow Internal API MCP; Notion MCP
- Models as written in the spec: claude-sonnet-4-6. Current vault routing is in [[Agent Tier Registry]].
