---
title: Crypto Risk Monitor Agent
tags:
- device-agent
- physical-ai
- wearables
- edge-terminal
tier: not stated
type: device-agent
model: claude-sonnet-4-6
owner: JR Moyler (Hataalii)
device: QL-W01 Aurum Trading Terminal
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Quantum Ledger
clearance: not stated
device_count: 1
---
# Crypto Risk Monitor Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Quantum Ledger Division]].

## Role
Runs on the Aurum Trading Terminal with the Crypto Market Anomaly Alert workflow.

## Device it runs on
**QL-W01 Aurum Trading Terminal** (Edge Terminal), described in [[Wearables Agent Spec — Quantum Ledger Devices]]. Quantum Ledger's dedicated financial intelligence terminal. Jetson runs the Quantum Alpha Signal Agent locally, delivering real-time trade signals with Kelly Criterion sizing from the MiroFish thesis. The Crypto Market Anomaly Alert n8n workflow fires Slack + haptic alerts when key assets cross thresholds. All trade logs sync to the Quantum Ledger Mac mini and Notion journal automatically.

## Inputs and sensors
- **Aurum Trading Terminal**: NVIDIA Jetson Orin Nano Super; Raspberry Pi 5 + Whisplay HAT; Pi Camera Module 3 (QR scan); ReSpeaker 2-Mics HAT; Adafruit I2S Speaker Bonnet

## Outputs and actions
- Flag crypto threshold crossings for Slack and haptic alerts
- On Aurum Trading Terminal: At market open, the Aurum Terminal pulls overnight signals, runs Kelly Criterion sizing via the Signal Agent, and displays the day's top 3 trade candidates on the Whisplay. When a position crosses a stop threshold, the terminal fires a haptic alert on the Zenith Command Band before the chart shows the candle.

## Permissions
API and MCP access listed for its device(s):
- **Aurum Trading Terminal**: APIs: Anthropic claude-sonnet-4-6 (signal analysis); Polymarket CLOB API; Kalshi API; Broker webhook API; LSEG/FactSet data API; Notion API (trade journal). MCPs: LSEG MCP; FactSet MCP; Notion MCP; ZenFlow Internal API MCP; LunarCrush MCP (crypto sentiment).

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
Alert and review workflows on its devices:
- **Aurum Trading Terminal**: Options Trade Alert + Journal Logger; Crypto Market Anomaly Alert

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Quantum Alpha Signal Agent]], [[Portfolio P&L Aggregator Task Agent]], [[Knowledge Keeper (Device Agent)]]
- n8n workflows: Options Trade Alert + Journal Logger; Crypto Market Anomaly Alert; Portfolio P&L Daily Aggregator; Prediction Market Signal Aggregator; Regulatory Compliance Monitor. See [[n8n Workflow Blueprint]].
- MCPs: LSEG MCP; FactSet MCP; Notion MCP; ZenFlow Internal API MCP; LunarCrush MCP (crypto sentiment)
- Models as written in the spec: claude-sonnet-4-6. Current vault routing is in [[Agent Tier Registry]].
