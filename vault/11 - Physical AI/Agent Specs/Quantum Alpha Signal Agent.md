---
title: Quantum Alpha Signal Agent
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
device: QL-W01 Aurum Trading Terminal, QL-W02 Alpha Signal Wristband, QL-W04 Market Intelligence Field Kit
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Quantum Ledger
clearance: not stated
device_count: 3
---
# Quantum Alpha Signal Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Quantum Ledger Division]].
Related: [[Quantum Alpha]], [[MiroFish]], [[Prediction Markets & MiroFish Method]].

## Role
Runs locally on the Aurum Trading Terminal's Jetson. Delivers real-time trade signals with Kelly Criterion sizing from the MiroFish thesis. Runs on local cache on the Market Intelligence Field Kit.

## Devices it runs on
| Code | Device | Type | Section | Listed as |
|---|---|---|---|---|
| QL-W01 | Aurum Trading Terminal | Edge Terminal | [[Wearables Agent Spec — Quantum Ledger Devices]] | Quantum Alpha Signal Agent |
| QL-W02 | Alpha Signal Wristband | Wearable | [[Wearables Agent Spec — Quantum Ledger Devices]] | Quantum Alpha Signal Agent |
| QL-W04 | Market Intelligence Field Kit | Field Kit | [[Wearables Agent Spec — Quantum Ledger Devices]] | Quantum Alpha Signal Agent (local cache) |

## Inputs and sensors
- **Aurum Trading Terminal**: NVIDIA Jetson Orin Nano Super; Raspberry Pi 5 + Whisplay HAT; Pi Camera Module 3 (QR scan); ReSpeaker 2-Mics HAT; Adafruit I2S Speaker Bonnet
- **Alpha Signal Wristband**: Adafruit Feather nRF52840 Sense; Adafruit DRV2605L Haptic Controller; IMU ICM-20948
- **Market Intelligence Field Kit**: Raspberry Pi 5 8GB; Whisplay HAT; LILYGO T-Beam Meshtastic (market data sync)

## Outputs and actions
- Pull overnight signals and size them with Kelly Criterion
- Show the day's top 3 trade candidates
- Send coded haptic patterns to the Alpha Signal Wristband
- Update recommendations after mesh sync
- On Aurum Trading Terminal: At market open, the Aurum Terminal pulls overnight signals, runs Kelly Criterion sizing via the Signal Agent, and displays the day's top 3 trade candidates on the Whisplay. When a position crosses a stop threshold, the terminal fires a haptic alert on the Zenith Command Band before the chart shows the candle.
- On Alpha Signal Wristband: JR is in a meeting. The wristband delivers a double-pulse: a Polymarket position flipped. Without looking at a screen, he knows a signal-level event occurred and can decide whether to step out. Market intelligence without interruption.
- On Market Intelligence Field Kit: JR attends a VC pitch. The field kit runs cached morning signals, the Whisplay shows current P&L. During a break, it reconnects via T-Beam mesh to the Foundry, syncs new Polymarket positions, and the Signal Agent updates its recommendations without a phone or laptop.

## Permissions
API and MCP access listed for its device(s):
- **Aurum Trading Terminal**: APIs: Anthropic claude-sonnet-4-6 (signal analysis); Polymarket CLOB API; Kalshi API; Broker webhook API; LSEG/FactSet data API; Notion API (trade journal). MCPs: LSEG MCP; FactSet MCP; Notion MCP; ZenFlow Internal API MCP; LunarCrush MCP (crypto sentiment).
- **Alpha Signal Wristband**: APIs: ZenFlow /v1/agents (haptic event dispatch); Polymarket CLOB API; Broker webhook API; BLE Gateway API. MCPs: ZenFlow Internal API MCP; LunarCrush MCP.
- **Market Intelligence Field Kit**: APIs: ZenFlow Agent API (mesh sync); Anthropic claude-haiku-4-5 (edge); Meshtastic Python API. MCPs: ZenFlow Internal API MCP (local); LunarCrush MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
Alert and review workflows on its devices:
- **Aurum Trading Terminal**: Options Trade Alert + Journal Logger; Crypto Market Anomaly Alert
- **Alpha Signal Wristband**: Crypto Market Anomaly Alert; Options Trade Alert + Journal Logger

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Portfolio P&L Aggregator Task Agent]], [[Crypto Risk Monitor Agent]], [[Knowledge Keeper (Device Agent)]], [[Prediction Market Signal Aggregator]]
- n8n workflows: Options Trade Alert + Journal Logger; Crypto Market Anomaly Alert; Portfolio P&L Daily Aggregator; Prediction Market Signal Aggregator; Regulatory Compliance Monitor; Portfolio P&L Daily Aggregator (sync on reconnect). See [[n8n Workflow Blueprint]].
- MCPs: LSEG MCP; FactSet MCP; Notion MCP; ZenFlow Internal API MCP; LunarCrush MCP (crypto sentiment); LunarCrush MCP; ZenFlow Internal API MCP (local)
- Models as written in the spec: claude-sonnet-4-6, claude-haiku-4-5. Current vault routing is in [[Agent Tier Registry]].
