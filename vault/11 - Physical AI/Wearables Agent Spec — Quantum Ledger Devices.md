---
title: Wearables Agent Spec — Quantum Ledger Devices
tags:
- physical-ai
- wearables
- device-specs
- quantum-ledger
type: spec-section
owner: JR Moyler (Hataalii)
source: Physical AI Wearables Agent Spec
updated: 2026-10-04
division: Quantum Ledger
device_count: 5
---
# Wearables Agent Spec — Quantum Ledger Devices

Section of the [[Physical AI Wearables Agent Spec]]. FinTech and Web3: the financial edge terminal. Division: [[Quantum Ledger Division]].

| Code | Device | Type | Est. budget |
|---|---|---|---|
| QL-W01 | Aurum Trading Terminal | Edge Terminal | ~$600–$780 |
| QL-W02 | Alpha Signal Wristband | Wearable | ~$100–$140 |
| QL-W03 | Chain Ledger Node | Edge Terminal | ~$350–$500 (beyond Mac mini) |
| QL-W04 | Market Intelligence Field Kit | Field Kit | ~$380–$510 |
| QL-W05 | Institutional Briefing Node | Physical AI | ~$280–$380 |

## QL-W01 Aurum Trading Terminal
*Seven years of options experience, in hardware.* (Edge Terminal)

Quantum Ledger's dedicated financial intelligence terminal. Jetson runs the Quantum Alpha Signal Agent locally, delivering real-time trade signals with Kelly Criterion sizing from the MiroFish thesis. The Crypto Market Anomaly Alert n8n workflow fires Slack + haptic alerts when key assets cross thresholds. All trade logs sync to the Quantum Ledger Mac mini and Notion journal automatically.

### Hardware
- NVIDIA Jetson Orin Nano Super
- Raspberry Pi 5 + Whisplay HAT
- Pi Camera Module 3 (QR scan)
- ReSpeaker 2-Mics HAT
- Adafruit I2S Speaker Bonnet
- Pi M.2 HAT+ + 2TB NVMe
- 3D-printed Bambu P1S terminal enclosure

### ZenFlow agents
- [[Quantum Alpha Signal Agent]]
- [[Portfolio P&L Aggregator Task Agent]]
- [[Crypto Risk Monitor Agent]]
- [[Knowledge Keeper (Device Agent)]]

### APIs
- Anthropic claude-sonnet-4-6 (signal analysis)
- Polymarket CLOB API
- Kalshi API
- Broker webhook API
- LSEG/FactSet data API
- Notion API (trade journal)

### n8n workflows
- Options Trade Alert + Journal Logger
- Crypto Market Anomaly Alert
- Portfolio P&L Daily Aggregator
- Prediction Market Signal Aggregator
- Regulatory Compliance Monitor

### MCPs
- LSEG MCP
- FactSet MCP
- Notion MCP
- ZenFlow Internal API MCP
- LunarCrush MCP (crypto sentiment)

### Use case
At market open, the Aurum Terminal pulls overnight signals, runs Kelly Criterion sizing via the Signal Agent, and displays the day's top 3 trade candidates on the Whisplay. When a position crosses a stop threshold, the terminal fires a haptic alert on the Zenith Command Band before the chart shows the candle.

### Build outcome
Local trading intelligence terminal: real-time signals, Kelly sizing, haptic alerts, auto trade journal.

**Est. budget:** ~$600–$780

## QL-W02 Alpha Signal Wristband
*Market pulse, felt before it's seen.* (Wearable)

A BLE wearable that receives coded haptic patterns from the Aurum Trading Terminal. Distinct vibration sequences map to: buy signal, sell signal, stop hit, Polymarket prediction flip, and portfolio P&L threshold breach. The wristband also allows a single-press 'market brief' request: a Task Agent summarizes the current session state as 3 haptic pulses: position count, P&L direction, risk level.

### Hardware
- Adafruit Feather nRF52840 Sense
- Adafruit DRV2605L Haptic Controller
- IMU ICM-20948
- PowerBoost 1000 + LiPo
- 3D-printed Bambu A1 PETG/TPU wristband

### ZenFlow agents
- [[Quantum Alpha Signal Agent]]
- [[Portfolio P&L Aggregator Task Agent]]
- [[Prediction Market Signal Aggregator]]

### APIs
- ZenFlow /v1/agents (haptic event dispatch)
- Polymarket CLOB API
- Broker webhook API
- BLE Gateway API

### n8n workflows
- Crypto Market Anomaly Alert
- Options Trade Alert + Journal Logger
- Prediction Market Signal Aggregator

### MCPs
- ZenFlow Internal API MCP
- LunarCrush MCP

### Use case
JR is in a meeting. The wristband delivers a double-pulse: a Polymarket position flipped. Without looking at a screen, he knows a signal-level event occurred and can decide whether to step out. Market intelligence without interruption.

### Build outcome
Market signal wristband: coded haptic alerts for trade signals, P&L breaches, Polymarket flips.

**Est. budget:** ~$100–$140

## QL-W03 Chain Ledger Node
*On-chain, on-premises: Web3 without the cloud.* (Edge Terminal)

A Mac mini node running a local blockchain light client, Web3 wallet monitor, and Quantum Genesis token event logger. All DeFi protocol risk feeds are ingested by the DeFi Risk Monitor Agent, which produces a weekly risk brief. The Regulatory Compliance Monitor n8n workflow ingests SEC, CFTC, and FinCEN RSS feeds and routes Claude summaries to the compliance log.

### Hardware
- Mac mini M4 24GB (Quantum Ledger node)
- Raspberry Pi 5 + Whisplay HAT
- Pi M.2 HAT+ + 2TB NVMe
- Synology NAS encrypted share
- Labeled Cat6A to VLAN 20
- 3D-printed Bambu A1 node enclosure

### ZenFlow agents
- [[DeFi Risk Monitor Agent]]
- [[Quantum Genesis Token Logger Task Agent]]
- [[Regulatory Compliance Monitor Agent]]
- [[Knowledge Keeper (Device Agent)]]

### APIs
- Anthropic claude-sonnet-4-6
- Blockscout API (on-chain data)
- LunarCrush API (sentiment)
- SEC/CFTC RSS feeds
- LSEG data API
- Notion API

### n8n workflows
- Quantum Genesis Tokenization Event Logger
- DeFi Protocol Risk Monitor
- Regulatory Compliance Monitor
- Quantum Alpha Institutional Report Generator

### MCPs
- Blockscout MCP
- LSEG MCP
- FactSet MCP
- LunarCrush MCP
- ZenFlow Internal API MCP

### Use case
Every on-chain event for Quantum Genesis tokens is logged, timestamped, and risk-scored by the Token Logger Task Agent. When a DeFi protocol shows TVL anomaly signals, the Risk Monitor fires a Slack alert and queues an aegis_review in the Aegis Protocol before any automated action.

### Build outcome
On-premises Web3 node: local chain monitoring, DeFi risk scoring, regulatory compliance log, token event tracking.

**Est. budget:** ~$350–$500 (beyond Mac mini)

> [!warning] Aegis
> DeFi TVL anomaly queues an aegis_review before any automated action.

## QL-W04 Market Intelligence Field Kit
*Trading intelligence, portable and mesh-connected.* (Field Kit)

A ruggedized field kit for off-site trading sessions, investor meetings, and market events. Battery-backed Pi 5 with the full Quantum Alpha Signal Agent running on local cache. Mesh-synced via T-Beam to the Foundry for live signal updates. The Whisplay display shows P&L and signal state. When disconnected, the local model runs on NVMe-cached market data.

### Hardware
- Raspberry Pi 5 8GB
- PiSugar 3 Plus Battery
- Whisplay HAT
- LILYGO T-Beam Meshtastic (market data sync)
- Pi M.2 HAT+ + 1TB NVMe
- 3D-printed Bambu A1 ruggedized carry case (TPU bumper)

### ZenFlow agents
- [[Quantum Alpha Signal Agent]] (local cache)
- [[Portfolio P&L Aggregator Task Agent]] (offline)

### APIs
- ZenFlow Agent API (mesh sync)
- Anthropic claude-haiku-4-5 (edge)
- Meshtastic Python API

### n8n workflows
- Portfolio P&L Daily Aggregator (sync on reconnect)
- Prediction Market Signal Aggregator

### MCPs
- ZenFlow Internal API MCP (local)
- LunarCrush MCP

### Use case
JR attends a VC pitch. The field kit runs cached morning signals, the Whisplay shows current P&L. During a break, it reconnects via T-Beam mesh to the Foundry, syncs new Polymarket positions, and the Signal Agent updates its recommendations without a phone or laptop.

### Build outcome
Portable trading terminal: cached signal agent, mesh sync, P&L display, offline-capable.

**Est. budget:** ~$380–$510

## QL-W05 Institutional Briefing Node
*The Quantum Alpha report, written by the room.* (Physical AI)

A dedicated Pi 5 node permanently running the Quantum Alpha Institutional Report Generator. Every Friday, the node aggregates alpha signals, portfolio positions, and risk metrics from the Aurum Terminal and Chain Ledger Node, then Claude writes a formatted institutional brief. The report is rendered on the Whisplay, approved with a button press, and distributed via the Notion + email pipeline.

### Hardware
- Raspberry Pi 5 8GB
- Whisplay HAT (report review + approval)
- Pi M.2 HAT+ + 1TB NVMe
- Adafruit I2S Speaker Bonnet
- PiSugar 3 Plus Battery
- 3D-printed Bambu A1 desk report station

### ZenFlow agents
- [[Quantum Alpha Institutional Report Generator Agent]]
- [[Portfolio P&L Aggregator Task Agent]]
- [[Knowledge Keeper (Device Agent)]]
- [[Distribution Agent]]

### APIs
- Anthropic claude-sonnet-4-6 (report authoring)
- Notion API
- Gmail API (distribution)
- LSEG API
- FactSet API

### n8n workflows
- Quantum Alpha Institutional Report Generator (weekly)
- Invoice + Revenue Recognition Automation
- Investor Update Auto-Pack

### MCPs
- Notion MCP
- Gmail MCP
- LSEG MCP
- FactSet MCP
- ZenFlow Internal API MCP

### Use case
Every Friday at 4PM, the node auto-generates the weekly Quantum Alpha brief. JR reviews the display, approves with one button press, and it distributes to the client list automatically. Total time: 60 seconds of JR's attention for a fully researched institutional-grade report.

### Build outcome
Autonomous institutional brief node: weekly auto-report generation, one-press approval + distribution.

**Est. budget:** ~$280–$380
