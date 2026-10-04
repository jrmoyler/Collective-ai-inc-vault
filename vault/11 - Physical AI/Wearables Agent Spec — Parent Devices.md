---
title: Wearables Agent Spec — Parent Devices
tags:
- physical-ai
- wearables
- device-specs
- parent
type: spec-section
owner: JR Moyler (Hataalii)
source: Physical AI Wearables Agent Spec
updated: 2026-10-04
division: Collective AI (parent)
device_count: 6
---
# Wearables Agent Spec — Parent Devices

Section of the [[Physical AI Wearables Agent Spec]]. The physical command layer for a 20-division AI venture studio. Division: [[Collective AI — Company Charter]].

Note: the spec lists 6 parent products in its table of contents.
| Code | Device | Type | Est. budget |
|---|---|---|---|
| CAI-W01 | Zenith Command Band | Wearable | ~$130–$190 |
| CAI-W02 | Herald Badge Node | Wearable | ~$120–$170 |
| CAI-W03 | Aegis Command Station | Physical AI | ~$3,500–$5,000 |
| CAI-W04 | Mesh Sentinel Array | Mesh Node | ~$400–$600 |
| CAI-W05 | Atlas Perception Tower | Physical AI | ~$850–$1,100 |
| CAI-W06 | Zenith Oracle Voice Shell | Physical AI | ~$320–$420 |

## CAI-W01 Zenith Command Band
*JR's wrist becomes the Foundry's nerve center.* (Wearable)

A custom smartband for the Founder/CEO that delivers real-time ZenFlow agent status, Aegis Protocol alerts, and division KPI pulses via haptic codes. BLE-synced to the Aegis Command Station and ZenFlow API. Vibration patterns are mapped to division health states: green pulse for aegis_clear, amber double-tap for aegis_review, red triple for aegis_hold.

### Hardware
- Adafruit Feather nRF52840 Sense
- Adafruit DRV2605L Haptic Controller
- IMU ICM-20948
- PowerBoost 1000 + LiPo cell
- 3D-printed Bambu A1 PETG/TPU wristband

### ZenFlow agents
- [[ZENITH Overseer]] (Tier 1)
- [[Aegis Protocol Guardian]]
- [[Knowledge Keeper (Device Agent)]]
- [[Agent Health Monitor]]

### APIs
- ZenFlow Agent API /v1/aegis/queue
- ZenFlow /v1/agents/health
- Anthropic claude-sonnet-4-6
- Slack alert webhook

### n8n workflows
- ZenFlow Agent Health Monitor
- Aegis Incident Reporter
- Daily Agent Performance Digest

### MCPs
- ZenFlow Internal API MCP
- Slack MCP
- n8n MCP

### Use case
JR receives a haptic pulse pattern and knows instantly, without looking at a screen, whether a division agent is blocked, an Aegis flag is queued, or the cluster is healthy. Operates 24/7 with 72-hour battery life.

### Build outcome
Always-on Foundry health wristband: Aegis alerts, agent status, KPI pulses via haptic codes.

**Est. budget:** ~$130–$190

> [!warning] Aegis
> Haptic codes map to Aegis states: green pulse aegis_clear, amber double-tap aegis_review, red triple aegis_hold.

## CAI-W02 Herald Badge Node
*Collective AI identity, always on body.* (Wearable)

A smart clip badge worn by all Foundry team members. Captures ambient session audio in 30-second snippets, sends BLE summaries to the nearest Pi gateway, and logs action items to the Knowledge Keeper via the ZenFlow API. Haptic confirmation acknowledges receipt. Each badge is registered in the ZenFlow agent registry as a sensor endpoint with its own device identity.

### Hardware
- Seeed XIAO ESP32S3 Sense
- Adafruit DRV2605L Haptic Controller
- Circuit Playground Bluefruit
- PowerBoost 1000 + LiPo
- 3D-printed Bambu A1 TPU badge shell

### ZenFlow agents
- [[Knowledge Keeper (Device Agent)]]
- [[Transcription Task Agent]]
- [[Blueprint Architect]] (badge config)

### APIs
- ZenFlow /v1/knowledge/write
- Anthropic claude-haiku-4-5 (transcription)
- BLE Gateway API

### n8n workflows
- Cross-Division Weekly Standup Digest
- Aegis Protocol Compliance Logger

### MCPs
- ZenFlow Internal API MCP
- Notion MCP

### Use case
During any Foundry meeting or workshop, all badges passively log key phrases and action items. At session end, the Knowledge Keeper produces a structured briefing and pushes it to Notion automatically.

### Build outcome
Team ambient capture badge: session logging, Knowledge Keeper sync, BLE Foundry credential.

**Est. budget:** ~$120–$170

## CAI-W03 Aegis Command Station
*The Foundry's nerve center: one terminal, all 20 nodes.* (Physical AI)

The parent company's primary physical command terminal. Mac mini M4 Pro cluster controller with ZenFlow API dashboard, NAS gateway, UniFi network console, and an ambient Zenith Oracle voice shell. Displays live division health from all 30 Mac mini nodes on a Whisplay interface. The ZENITH Overseer agent runs here as the primary cross-portfolio intelligence layer. Every n8n workflow in the 150-automation blueprint is monitored from this station.

### Hardware
- Mac mini M4 Pro 64GB (parent command node)
- Synology DS1825+ 8-bay NAS
- UniFi Dream Machine Pro Max
- Raspberry Pi 5 + Whisplay HAT (ZenFlow shell)
- ReSpeaker 4-Mic Array v2.0
- CyberPower Rackmount UPS 1500VA
- Sonnet RackMac mini mount

### ZenFlow agents
- [[ZENITH Overseer]]
- [[CORTEX Director]] (ZenFlow)
- [[Aegis Protocol Guardian]]
- [[Knowledge Keeper (Device Agent)]]
- [[Director_Operations (Device Agent)]]

### APIs
- ZenFlow Agent API (all endpoints)
- Anthropic claude-sonnet-4-6 / claude-opus-4-6
- n8n REST API
- Slack API
- Notion API
- GitHub API

### n8n workflows
- ZenFlow Agent Health Monitor
- Portfolio Revenue Dashboard Sync
- Cross-Division Weekly Standup Digest
- Aegis Safety Review Queue
- JWT Token Rotation Monitor
- Cost Tracker

### MCPs
- ZenFlow Internal API MCP
- Slack MCP
- Notion MCP
- GitHub MCP
- n8n MCP
- Google Drive MCP

### Use case
JR's primary physical intelligence terminal. Voice-queries ZENITH for division status, receives Aegis queue alerts, monitors 150 n8n workflows, and routes cross-division intelligence requests, all from one desk node.

### Build outcome
Unified Foundry command center: 30-node visibility, 150-workflow monitor, ZENITH voice interface, Aegis control.

**Est. budget:** ~$3,500–$5,000

> [!warning] Aegis
> Runs the Aegis Safety Review Queue; JR receives Aegis queue alerts here.

## CAI-W04 Mesh Sentinel Array
*The Foundry's off-grid nervous system: every signal tracked.* (Mesh Node)

A distributed LoRa mesh network covering the Foundry floor, yard, drone test zone, and mobile field kits. Each node registers as a device endpoint in the ZenFlow agent registry. The Raspberry Pi MQTT gateway bridges mesh telemetry into the n8n automation layer, where the ZenFlow Agent Health Monitor receives device heartbeats alongside software agent status in a unified operational picture.

### Hardware
- LILYGO T-Beam Meshtastic (×4)
- Heltec V3 Meshtastic nodes (×6)
- LILYGO T-Deck (field terminal)
- Raspberry Pi 5 (MQTT bridge gateway)
- 12V battery + solar for outdoor nodes
- Waterproof 3D-printed Bambu P1S ASA enclosures

### ZenFlow agents
- [[Agent Health Monitor]]
- [[Director_Operations (Device Agent)]]
- [[Knowledge Keeper (Device Agent)]]

### APIs
- ZenFlow /v1/agents/health (device registration)
- MQTT broker API
- n8n webhook triggers
- Meshtastic Python API

### n8n workflows
- ZenFlow Agent Health Monitor
- Aegis Protocol Compliance Logger

### MCPs
- ZenFlow Internal API MCP
- n8n MCP

### Use case
Provides ISP-failover communications and physical device heartbeat monitoring. When a physical node goes offline, the n8n ZenFlow Agent Health Monitor fires the same alert path as a software agent failure: hardware and software treated identically.

### Build outcome
Off-grid physical device mesh: hardware heartbeat monitoring, drone/field tracking, ISP-failover comms.

**Est. budget:** ~$400–$600

## CAI-W05 Atlas Perception Tower
*The Foundry sees itself: full spatial intelligence.* (Physical AI)

Parent-level physical security and spatial awareness mast. Jetson inference + LiDAR + depth + AI cameras feed the Obsidian Arc security node and the Aegis Command Station simultaneously. The Jetson runs a dedicated Task Agent that classifies detected objects/people as aegis_clear or aegis_review events, routing physical security flags through the same Aegis Protocol queue as software agent outputs.

### Hardware
- NVIDIA Jetson Orin Nano Super
- RPLIDAR A1M8
- Luxonis OAK-D Lite
- Raspberry Pi AI Camera (Sony IMX500)
- RealSense D435i
- Pi M.2 HAT+ + NVMe
- 3D-printed Prusa CORE One+ mast
- PoE injector

### ZenFlow agents
- [[Aegis Protocol Guardian]]
- [[Physical Security Task Agent]]
- [[Knowledge Keeper (Device Agent)]]

### APIs
- ZenFlow /v1/aegis (physical flag injection)
- ZenFlow /v1/knowledge/write
- Anthropic claude-haiku-4-5 (edge inference)
- UniFi NVR API
- Sentry MCP (anomaly logging)

### n8n workflows
- Aegis Safety Review Queue
- ZenFlow Agent Health Monitor

### MCPs
- ZenFlow Internal API MCP
- Sentry MCP
- Obsidian Arc Security MCP

### Use case
Physical threat events are classified as Aegis Protocol entries: the same system that governs 600 software agents now governs the physical space. Person detected in quarantine zone after hours triggers aegis_hold and routes to JR's Zenith Command Band.

### Build outcome
Unified physical + software Aegis enforcement: spatial intelligence feeding the same safety queue as AI agents.

**Est. budget:** ~$850–$1,100

> [!warning] Aegis
> Detections become aegis_clear or aegis_review events; a person in the quarantine zone after hours triggers aegis_hold and routes to the Zenith Command Band.

## CAI-W06 Zenith Oracle Voice Shell
*ZENITH Overseer, made physical and portable.* (Physical AI)

A battery-backed portable voice terminal that acts as the physical body for the ZENITH Overseer agent. Routes voice queries directly to the ZenFlow API, surfaces Knowledge Keeper logs on the Whisplay display, and reads Aegis queue items aloud. Integrates with all 150 n8n workflows via webhook triggers: saying 'run standup digest' fires the Cross-Division Weekly Standup Digest workflow.

### Hardware
- Raspberry Pi 5 8GB
- Whisplay HAT
- ReSpeaker 4-Mic Array v2.0
- Adafruit I2S Speaker Bonnet
- Pi Camera Module 3
- Pi M.2 HAT+ + 1TB NVMe
- PiSugar 3 Plus Battery
- 3D-printed Bambu A1 handle-grip PETG shell

### ZenFlow agents
- [[ZENITH Overseer]]
- [[Knowledge Keeper (Device Agent)]]
- [[Director_Operations (Device Agent)]]
- [[Aegis Protocol Guardian]]

### APIs
- ZenFlow Agent API (all)
- Anthropic claude-sonnet-4-6
- n8n webhook API
- Slack API
- Notion API

### n8n workflows
- All 150 n8n workflows via voice-triggered webhook
- Daily Agent Performance Digest
- Knowledge Keeper Digest
- ZenFlow Agent Health Monitor

### MCPs
- ZenFlow Internal API MCP
- n8n MCP
- Notion MCP
- Slack MCP

### Use case
JR carries this to any room in the Foundry and has full ZENITH Overseer access: voice-triggered n8n workflows, live Knowledge Keeper recall, Aegis queue review, and cross-division agent routing without touching a laptop.

### Build outcome
Portable ZENITH agent terminal: voice-trigger 150 workflows, Knowledge Keeper access, Aegis queue review.

**Est. budget:** ~$320–$420

> [!warning] Aegis
> Reads Aegis queue items aloud for review.
