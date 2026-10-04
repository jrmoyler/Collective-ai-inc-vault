---
title: Prediction Market Signal Aggregator
tags:
- device-agent
- physical-ai
- wearables
- wearable
tier: not stated
type: device-agent
model: not stated
owner: JR Moyler (Hataalii)
device: QL-W02 Alpha Signal Wristband
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Quantum Ledger
clearance: not stated
device_count: 1
---
# Prediction Market Signal Aggregator

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Quantum Ledger Division]].
Related: [[Prediction Markets & MiroFish Method]].

## Role
Listed as an agent on the Alpha Signal Wristband, paired with the n8n workflow of the same name.

## Device it runs on
**QL-W02 Alpha Signal Wristband** (Wearable), described in [[Wearables Agent Spec — Quantum Ledger Devices]]. A BLE wearable that receives coded haptic patterns from the Aurum Trading Terminal. Distinct vibration sequences map to: buy signal, sell signal, stop hit, Polymarket prediction flip, and portfolio P&L threshold breach. The wristband also allows a single-press 'market brief' request: a Task Agent summarizes the current session state as 3 haptic pulses: position count, P&L direction, risk level.

## Inputs and sensors
- **Alpha Signal Wristband**: Adafruit Feather nRF52840 Sense; Adafruit DRV2605L Haptic Controller; IMU ICM-20948

## Outputs and actions
- Aggregate Polymarket/Kalshi prediction market signals
- Trigger the Polymarket flip haptic pattern
- On Alpha Signal Wristband: JR is in a meeting. The wristband delivers a double-pulse: a Polymarket position flipped. Without looking at a screen, he knows a signal-level event occurred and can decide whether to step out. Market intelligence without interruption.

## Permissions
API and MCP access listed for its device(s):
- **Alpha Signal Wristband**: APIs: ZenFlow /v1/agents (haptic event dispatch); Polymarket CLOB API; Broker webhook API; BLE Gateway API. MCPs: ZenFlow Internal API MCP; LunarCrush MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
Alert and review workflows on its devices:
- **Alpha Signal Wristband**: Crypto Market Anomaly Alert; Options Trade Alert + Journal Logger

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Quantum Alpha Signal Agent]], [[Portfolio P&L Aggregator Task Agent]]
- n8n workflows: Crypto Market Anomaly Alert; Options Trade Alert + Journal Logger; Prediction Market Signal Aggregator. See [[n8n Workflow Blueprint]].
- MCPs: ZenFlow Internal API MCP; LunarCrush MCP
