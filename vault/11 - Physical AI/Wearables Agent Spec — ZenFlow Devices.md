---
title: Wearables Agent Spec — ZenFlow Devices
tags:
- physical-ai
- wearables
- device-specs
- zenflow
type: spec-section
owner: JR Moyler (Hataalii)
source: Physical AI Wearables Agent Spec
updated: 2026-10-04
division: ZenFlow
device_count: 5
---
# Wearables Agent Spec — ZenFlow Devices

Section of the [[Physical AI Wearables Agent Spec]]. The Central Nervous System: hardware-embodied agent intelligence. Division: [[ZenFlow Division]].

| Code | Device | Type | Est. budget |
|---|---|---|---|
| ZF-W01 | CORTEX Director Shell | Physical AI | ~$380–$520 (beyond Mac mini) |
| ZF-W02 | Synaptic Relay Badge | Wearable | ~$110–$160 |
| ZF-W03 | Knowledge Keeper Vault Node | Edge Terminal | ~$280–$380 |
| ZF-W04 | Agent Eval Bench | Edge Terminal | ~$500–$700 (beyond Mac mini) |
| ZF-W05 | ZenFlow Meshtastic Gateway | Mesh Node | ~$220–$310 |

## ZF-W01 CORTEX Director Shell
*The CORTEX Director agent runs on this desk. Permanently.* (Physical AI)

A dedicated Mac mini node with Pi 5 ambient shell that permanently hosts the AXIS Division Director agent. Monitors the full 30-agent ZenFlow cluster, routes infrastructure requests from all 19 divisions, and enforces Aegis Protocol. The Pi shell provides a physical status display: green/amber/red LED ring maps directly to cluster health state.

### Hardware
- Mac mini M4 24GB (ZenFlow node Mac-02)
- Raspberry Pi 5 + Whisplay HAT
- ReSpeaker 2-Mics Pi HAT
- Adafruit I2S Speaker Bonnet
- Pi M.2 HAT+ + 2TB NVMe
- 3D-printed Bambu A1 desk pod

### ZenFlow agents
- [[CORTEX Director]]
- [[Blueprint Architect]]
- [[Aegis Protocol Guardian]]
- [[Knowledge Keeper (Device Agent)]]
- [[ZenFlow Marketplace Listing Auto-Generator]]

### APIs
- ZenFlow Agent API (all tiers)
- Anthropic claude-sonnet-4-6 + claude-opus-4-6
- GitHub API
- Anthropic API Console
- n8n REST API

### n8n workflows
- Agent Spawn + Teardown Orchestrator
- Prompt Library Version Control
- ZenFlow API Error Alerting
- Daily Agent Performance Digest
- New Agent Onboarding Flow

### MCPs
- ZenFlow Internal API MCP
- GitHub MCP
- n8n MCP
- Slack MCP

### Use case
CORTEX Director runs continuously on this node. Every division infrastructure request routes through here. When a new agent is onboarded, the Blueprint Architect and New Agent Onboarding n8n workflow both execute from this station.

### Build outcome
CORTEX Director permanent host: agent lifecycle management, infrastructure routing, cluster health display.

**Est. budget:** ~$380–$520 (beyond Mac mini)

> [!warning] Aegis
> CORTEX Director enforces Aegis Protocol for the cluster.

## ZF-W02 Synaptic Relay Badge
*Every dev's wrist is a ZenFlow endpoint.* (Wearable)

A BLE wearable for ZenFlow engineers that delivers haptic notifications for: new agent deployment success, Aegis Protocol flags requiring engineering review, and JWT token rotation alerts. One button tap on the badge triggers a 'status check' Task Agent via the ZenFlow API and reads the response back as a haptic pattern.

### Hardware
- Seeed XIAO ESP32S3 Sense
- Adafruit DRV2605L Haptic Controller
- Arduino Nano 33 BLE Sense Rev2
- PowerBoost 1000 + LiPo
- 3D-printed Bambu A1 clip badge (PETG)

### ZenFlow agents
- [[Status Check Task Agent]]
- [[JWT Token Rotation Monitor]]
- [[Aegis Protocol Guardian]]

### APIs
- ZenFlow /v1/agents/status
- ZenFlow /v1/aegis/queue
- Anthropic claude-haiku-4-5
- BLE Gateway API

### n8n workflows
- JWT Token Rotation Monitor
- ZenFlow API Error Alerting
- Aegis Incident Reporter

### MCPs
- ZenFlow Internal API MCP
- Slack MCP

### Use case
ZenFlow engineers on the Foundry floor get haptic alerts for deployment results and Aegis flags without unlocking a phone. Single button tap fires a Task Agent status check and returns results as coded vibrations.

### Build outcome
ZenFlow engineer wearable: haptic deployment alerts, Aegis flags, JWT expiry warnings, one-tap status check.

**Est. budget:** ~$110–$160

> [!warning] Aegis
> Haptic notification for Aegis Protocol flags that need engineering review.

## ZF-W03 Knowledge Keeper Vault Node
*Persistent agent memory with a physical home.* (Edge Terminal)

A dedicated NVMe-backed Pi 5 node that serves as the physical Knowledge Keeper endpoint. All 600 ZenFlow agent interactions are indexed here using vector embeddings. The Whisplay display shows live ingestion rate. Any division's physical shell can query this node for semantic search via the ZenFlow /v1/knowledge API, making this the memory hardware for the entire Foundry.

### Hardware
- Raspberry Pi 5 8GB
- Pi M.2 HAT+ + 2TB NVMe
- Whisplay HAT (ingestion rate display)
- Raspberry Pi Active Cooler
- Geekworm X1202 UPS HAT
- 3D-printed Bambu A1 server enclosure

### ZenFlow agents
- [[Knowledge Keeper (Device Agent)]]
- [[Research Director]]
- [[Data Ingestion Task Agent]]

### APIs
- ZenFlow /v1/knowledge (read + write)
- Anthropic claude-haiku-4-5 (embedding)
- Notion API (export)
- OpenTelemetry (traces)

### n8n workflows
- Knowledge Keeper Digest
- ZenFlow Marketplace Listing Auto-Generator
- Research Pipeline

### MCPs
- ZenFlow Internal API MCP
- Notion MCP
- n8n MCP

### Use case
Every physical AI shell in the Foundry queries this node for agent memory. When a division's Pi shell asks 'what did we decide about the Quantum Ledger Web3 architecture?', the Knowledge Keeper Vault Node returns the indexed answer from any prior session.

### Build outcome
Foundry-wide vector memory node: 600-agent interaction index, semantic search endpoint, live ingestion display.

**Est. budget:** ~$280–$380

## ZF-W04 Agent Eval Bench
*No agent ships without passing this bench.* (Edge Terminal)

An isolated Jetson + Mac mini pair for agent evaluation and model testing. The Model Performance Auditor agent runs continuously here, sampling 10% of all agent outputs against the 5-dimension scoring rubric (accuracy, coherence, relevance, safety, efficiency). Operates in VLAN 80 Quarantine: no trusted network access until eval signs off.

### Hardware
- Mac mini M4 24GB (Mac-30 Model Sandbox)
- NVIDIA Jetson Orin Nano Super (eval runner)
- Raspberry Pi 5 (test driver)
- Logic analyzer Saleae clone
- Pi M.2 HAT+ + 2TB NVMe
- Labeled Cat6A to VLAN 80

### ZenFlow agents
- [[Model Performance Auditor]]
- [[Agent Spawner]] (T4)
- [[Aegis Protocol Guardian]]
- [[MCP Tool Integration Test Agent]]

### APIs
- ZenFlow Agent API (staging)
- Anthropic claude-sonnet-4-6
- GitHub API
- n8n staging API

### n8n workflows
- MCP Tool Integration Test Pipeline
- New Agent Onboarding Flow
- Prompt Library Version Control

### MCPs
- ZenFlow Internal API MCP (staging)
- GitHub MCP
- Sentry MCP

### Use case
Before any new agent goes to production, it runs a full eval suite here. The Model Performance Auditor scores outputs, the MCP Integration Test pipeline validates tool connections, and Aegis Protocol Guardian signs off. Fail = blocked from VLAN 20.

### Build outcome
Agent quality gate: isolated eval environment, 5-dimension scoring, Aegis clearance before production.

**Est. budget:** ~$500–$700 (beyond Mac mini)

> [!warning] Aegis
> Aegis Protocol Guardian signs off after eval. Fail = blocked from VLAN 20. Bench sits in VLAN 80 Quarantine.

## ZF-W05 ZenFlow Meshtastic Gateway
*Physical devices speak ZenFlow: the mesh bridge.* (Mesh Node)

A Pi 5 node that bridges the Foundry's Meshtastic LoRa mesh into the ZenFlow agent registry. Every physical device on the mesh is registered as a sensor endpoint with an agent identity. The gateway translates LoRa telemetry packets into ZenFlow API calls: device heartbeats, GPS coordinates, and sensor readings become agent status events in the same operational dashboard as software agents.

### Hardware
- Raspberry Pi 5 8GB (MQTT bridge)
- LILYGO T-Beam Meshtastic (master node)
- Heltec V3 relay nodes (×2 ZenFlow zone)
- Pi M.2 HAT+ + 512GB NVMe
- Raspberry Pi Active Cooler
- 3D-printed Bambu A1 gateway enclosure

### ZenFlow agents
- [[Device Registry Task Agent]]
- [[Agent Health Monitor]]
- [[Director_Operations (Device Agent)]]

### APIs
- ZenFlow /v1/agents (device registration)
- Meshtastic Python API
- MQTT broker
- n8n webhook API

### n8n workflows
- ZenFlow Agent Health Monitor (physical devices)
- Cross-Division Intelligence Request Router

### MCPs
- ZenFlow Internal API MCP
- n8n MCP

### Use case
When VectorShift's Sky Vector Drone goes offline mid-flight, the Meshtastic Gateway registers the lost heartbeat as an agent health event in ZenFlow: the same alert path as a software agent crash. Hardware and software failure modes handled identically.

### Build outcome
Physical-to-software mesh bridge: IoT devices as ZenFlow agent endpoints, unified health monitoring.

**Est. budget:** ~$220–$310
