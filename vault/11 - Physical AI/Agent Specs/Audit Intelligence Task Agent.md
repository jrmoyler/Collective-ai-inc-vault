---
title: Audit Intelligence Task Agent
tags:
- device-agent
- physical-ai
- wearables
- wearable
tier: not stated
type: device-agent
model: claude-sonnet-4-6
owner: JR Moyler (Hataalii)
device: TC-W04 AI Audit Wearable Kit
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: The Collective
clearance: not stated
device_count: 1
---
# Audit Intelligence Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[The Collective Division]].
Related: [[AI Readiness Audit]].

## Role
Synthesizes behavioral signals from the 3-badge AI Audit Wearable Kit with interview data during a 2-day AI readiness audit.

## Device it runs on
**TC-W04 AI Audit Wearable Kit** (Wearable), described in [[Wearables Agent Spec — The Collective Devices]]. A 3-badge wearable kit deployed to client teams during AI readiness audits. Each badge captures ambient workflow signals (motion patterns, conversation frequency, device interaction cadence) and logs them as structured behavioral data to the Collective's Mac mini. The Audit Intelligence Task Agent synthesizes these signals alongside interview data to generate a scored AI readiness report.

## Inputs and sensors
- **AI Audit Wearable Kit**: Arduino Nano 33 BLE Sense Rev2 (×3); Adafruit DRV2605L Haptic Controller (×3); IMU BNO085 (×3)

## Outputs and actions
- Generate a scored AI readiness report with implementation recommendations by end of day 2
- On AI Audit Wearable Kit: During a 2-day AI readiness audit, client team members wear the badges. Behavioral signals + interview data feed the Audit Intelligence Task Agent, which generates a scored report with specific AI implementation recommendations by end of day 2.

## Permissions
API and MCP access listed for its device(s):
- **AI Audit Wearable Kit**: APIs: ZenFlow /v1/knowledge/write; Anthropic claude-sonnet-4-6 (report generation); Notion API; Airtable API (scoring matrix). MCPs: Notion MCP; Airtable MCP; ZenFlow Internal API MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
No escalation path is stated beyond the device's workflows listed under Dependencies.

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Research Director]], [[Knowledge Keeper (Device Agent)]], [[Proposal Generator Task Agent]]
- n8n workflows: AI Readiness Audit Scoring; Client Onboarding Sequence; Impact Report Auto-Generator. See [[n8n Workflow Blueprint]].
- MCPs: Notion MCP; Airtable MCP; ZenFlow Internal API MCP
- Models as written in the spec: claude-sonnet-4-6. Current vault routing is in [[Agent Tier Registry]].
