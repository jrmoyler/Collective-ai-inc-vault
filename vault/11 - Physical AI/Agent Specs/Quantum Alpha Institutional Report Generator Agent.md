---
title: Quantum Alpha Institutional Report Generator Agent
tags:
- device-agent
- physical-ai
- wearables
tier: not stated
type: device-agent
model: claude-sonnet-4-6
owner: JR Moyler (Hataalii)
device: QL-W05 Institutional Briefing Node
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Quantum Ledger
clearance: not stated
device_count: 1
---
# Quantum Alpha Institutional Report Generator Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Quantum Ledger Division]].
Related: [[Quantum Alpha]].

## Role
Runs permanently on the Institutional Briefing Node. Every Friday at 4PM aggregates alpha signals, positions and risk metrics from the Aurum Terminal and Chain Ledger Node.

## Device it runs on
**QL-W05 Institutional Briefing Node** (Physical AI), described in [[Wearables Agent Spec — Quantum Ledger Devices]]. A dedicated Pi 5 node permanently running the Quantum Alpha Institutional Report Generator. Every Friday, the node aggregates alpha signals, portfolio positions, and risk metrics from the Aurum Terminal and Chain Ledger Node, then Claude writes a formatted institutional brief. The report is rendered on the Whisplay, approved with a button press, and distributed via the Notion + email pipeline.

## Inputs and sensors
- **Institutional Briefing Node**: Raspberry Pi 5 8GB; Whisplay HAT (report review + approval); Adafruit I2S Speaker Bonnet

## Outputs and actions
- Write the weekly institutional brief with Claude
- Render it on the Whisplay for one-press approval
- On Institutional Briefing Node: Every Friday at 4PM, the node auto-generates the weekly Quantum Alpha brief. JR reviews the display, approves with one button press, and it distributes to the client list automatically. Total time: 60 seconds of JR's attention for a fully researched institutional-grade report.

## Permissions
API and MCP access listed for its device(s):
- **Institutional Briefing Node**: APIs: Anthropic claude-sonnet-4-6 (report authoring); Notion API; Gmail API (distribution); LSEG API; FactSet API. MCPs: Notion MCP; Gmail MCP; LSEG MCP; FactSet MCP; ZenFlow Internal API MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
No escalation path is stated beyond the device's workflows listed under Dependencies.

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Portfolio P&L Aggregator Task Agent]], [[Knowledge Keeper (Device Agent)]], [[Distribution Agent]]
- n8n workflows: Quantum Alpha Institutional Report Generator (weekly); Invoice + Revenue Recognition Automation; Investor Update Auto-Pack. See [[n8n Workflow Blueprint]].
- MCPs: Notion MCP; Gmail MCP; LSEG MCP; FactSet MCP; ZenFlow Internal API MCP
- Models as written in the spec: claude-sonnet-4-6. Current vault routing is in [[Agent Tier Registry]].
