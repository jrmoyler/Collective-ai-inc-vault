---
title: Portfolio P&L Aggregator Task Agent
tags:
- device-agent
- physical-ai
- wearables
- edge-terminal
- wearable
- field-kit
tier: not stated
type: device-agent
model: claude-sonnet-4-6, claude-haiku-4-5
owner: JR Moyler (Hataalii)
device: QL-W01 Aurum Trading Terminal, QL-W02 Alpha Signal Wristband, QL-W04 Market Intelligence Field Kit, QL-W05 Institutional Briefing Node
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Quantum Ledger
clearance: not stated
device_count: 4
---
# Portfolio P&L Aggregator Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Quantum Ledger Division]].

## Role
Aggregates positions and P&L across the Quantum Ledger devices. Runs offline on the Market Intelligence Field Kit.

## Devices it runs on
| Code | Device | Type | Section | Listed as |
|---|---|---|---|---|
| QL-W01 | Aurum Trading Terminal | Edge Terminal | [[Wearables Agent Spec — Quantum Ledger Devices]] | Portfolio P&L Aggregator Task Agent |
| QL-W02 | Alpha Signal Wristband | Wearable | [[Wearables Agent Spec — Quantum Ledger Devices]] | Portfolio P&L Aggregator Task Agent |
| QL-W04 | Market Intelligence Field Kit | Field Kit | [[Wearables Agent Spec — Quantum Ledger Devices]] | Portfolio P&L Aggregator Task Agent (offline) |
| QL-W05 | Institutional Briefing Node | Physical AI | [[Wearables Agent Spec — Quantum Ledger Devices]] | Portfolio P&L Aggregator Task Agent |

## Inputs and sensors
- **Aurum Trading Terminal**: NVIDIA Jetson Orin Nano Super; Raspberry Pi 5 + Whisplay HAT; Pi Camera Module 3 (QR scan); ReSpeaker 2-Mics HAT; Adafruit I2S Speaker Bonnet
- **Alpha Signal Wristband**: Adafruit Feather nRF52840 Sense; Adafruit DRV2605L Haptic Controller; IMU ICM-20948
- **Market Intelligence Field Kit**: Raspberry Pi 5 8GB; Whisplay HAT; LILYGO T-Beam Meshtastic (market data sync)
- **Institutional Briefing Node**: Raspberry Pi 5 8GB; Whisplay HAT (report review + approval); Adafruit I2S Speaker Bonnet

## Outputs and actions
- Aggregate portfolio P&L
- Answer the wristband 'market brief' request as 3 pulses: position count, P&L direction, risk level

## Permissions
API and MCP access listed for its device(s):
- **Aurum Trading Terminal**: APIs: Anthropic claude-sonnet-4-6 (signal analysis); Polymarket CLOB API; Kalshi API; Broker webhook API; LSEG/FactSet data API; Notion API (trade journal). MCPs: LSEG MCP; FactSet MCP; Notion MCP; ZenFlow Internal API MCP; LunarCrush MCP (crypto sentiment).
- **Alpha Signal Wristband**: APIs: ZenFlow /v1/agents (haptic event dispatch); Polymarket CLOB API; Broker webhook API; BLE Gateway API. MCPs: ZenFlow Internal API MCP; LunarCrush MCP.
- **Market Intelligence Field Kit**: APIs: ZenFlow Agent API (mesh sync); Anthropic claude-haiku-4-5 (edge); Meshtastic Python API. MCPs: ZenFlow Internal API MCP (local); LunarCrush MCP.
- **Institutional Briefing Node**: APIs: Anthropic claude-sonnet-4-6 (report authoring); Notion API; Gmail API (distribution); LSEG API; FactSet API. MCPs: Notion MCP; Gmail MCP; LSEG MCP; FactSet MCP; ZenFlow Internal API MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
Alert and review workflows on its devices:
- **Aurum Trading Terminal**: Options Trade Alert + Journal Logger; Crypto Market Anomaly Alert
- **Alpha Signal Wristband**: Crypto Market Anomaly Alert; Options Trade Alert + Journal Logger

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Quantum Alpha Signal Agent]], [[Crypto Risk Monitor Agent]], [[Knowledge Keeper (Device Agent)]], [[Prediction Market Signal Aggregator]], [[Quantum Alpha Institutional Report Generator Agent]], [[Distribution Agent]]
- n8n workflows: Options Trade Alert + Journal Logger; Crypto Market Anomaly Alert; Portfolio P&L Daily Aggregator; Prediction Market Signal Aggregator; Regulatory Compliance Monitor; Portfolio P&L Daily Aggregator (sync on reconnect); Quantum Alpha Institutional Report Generator (weekly); Invoice + Revenue Recognition Automation; Investor Update Auto-Pack. See [[n8n Workflow Blueprint]].
- MCPs: LSEG MCP; FactSet MCP; Notion MCP; ZenFlow Internal API MCP; LunarCrush MCP (crypto sentiment); LunarCrush MCP; ZenFlow Internal API MCP (local); Gmail MCP
- Models as written in the spec: claude-sonnet-4-6, claude-haiku-4-5. Current vault routing is in [[Agent Tier Registry]].
