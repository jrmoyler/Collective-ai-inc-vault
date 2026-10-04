---
title: Wearables Agent Spec — Device Data Flow
tags:
- physical-ai
- wearables
- data-flow
type: spec-section
owner: JR Moyler (Hataalii)
source: Physical AI Wearables Agent Spec
updated: 2026-10-04
---
# Wearables Agent Spec — Device Data Flow

How devices in the [[Physical AI Wearables Agent Spec]] move data into ZenFlow. Built from the device entries.

## Paths
1. **BLE wearables → Pi gateway → ZenFlow API.** Badges and wristbands send BLE data to the nearest Pi gateway (BLE Gateway API). Badges are registered in the ZenFlow agent registry as sensor endpoints with their own device identity.
2. **LoRa mesh → MQTT bridge → n8n → ZenFlow.** Meshtastic nodes (T-Beam, Heltec V3, T-Deck) relay telemetry to a Raspberry Pi 5 MQTT bridge. n8n webhooks pass heartbeats into ZenFlow /v1/agents/health. The ZenFlow Meshtastic Gateway ([[Wearables Agent Spec — ZenFlow Devices]]) translates LoRa packets (heartbeats, GPS, sensor readings) into agent status events.
3. **Hardware treated as agents.** Rovers, drones and mesh nodes are registered agents. A lost hardware heartbeat follows the same alert path as a software agent crash (ZenFlow Agent Health Monitor).
4. **Knowledge writes.** Most devices log to Knowledge Keeper via /v1/knowledge/write. The Knowledge Keeper Vault Node indexes all 600 agent interactions with embeddings and serves semantic search to every division shell.
5. **Haptic dispatch.** Alerts reach wearables through /v1/agents (haptic event dispatch) or /v1/aegis/queue.
6. **Aegis injection.** Physical, network and evidence events enter the Aegis queue via /v1/aegis.
7. **Offline and reconnect.** Field kits run agents on local NVMe cache and sync on mesh reconnect (Session Archive Sync on Return; Portfolio P&L Daily Aggregator sync on reconnect).
8. **Voice-triggered workflows.** The Zenith Oracle Voice Shell can fire all 150 n8n workflows via webhook.

## ZenFlow endpoints by device
| Endpoint | Devices |
|---|---|
| /v1/aegis/queue | Zenith Command Band, Synaptic Relay Badge, Threat Intel Wearable, Flight Ops Wearable |
| /v1/agents/health | Zenith Command Band, Mesh Sentinel Array, Logistics Mesh Node |
| /v1/knowledge/write | Herald Badge Node, Atlas Perception Tower, Herald Consultant Badge, Strategy Scan Node, AI Audit Wearable Kit, Workshop Presence Node, Cohort Engagement Badge, Instructor Capture Node, Resonance Studio Node, Vision Director Node, Creator Nexus Wearable, Documentary Capture Rig, Apex Motion Cage, Team OS Field Station, Recovery Intelligence Node, Scout Intelligence Terminal, Cipher Guardian Rack, Sentinel Prime Tower, Forensic Evidence Node, Prime Shell v0.1, Titan Bench Arm, Dexterous Hand Node, Mobile Base Rover, Embodied AI Control Wearable, Sky Vector Dev Drone, Ground Vector Rover, Aerial Mesh Relay Drone, Cognitive Coaching Shell, Behavioral Sensing Station |
| ZenFlow Agent API (all endpoints) | Aegis Command Station |
| /v1/aegis | Atlas Perception Tower, Cipher Guardian Rack, Sentinel Prime Tower, Forensic Evidence Node, Prime Shell v0.1, Titan Bench Arm, Dexterous Hand Node, Mobile Base Rover, Embodied AI Control Wearable, Sky Vector Dev Drone, Ground Vector Rover, Aerial Mesh Relay Drone |
| ZenFlow Agent API (all) | Zenith Oracle Voice Shell |
| ZenFlow Agent API (all tiers) | CORTEX Director Shell |
| /v1/agents/status | Synaptic Relay Badge |
| /v1/knowledge | Knowledge Keeper Vault Node |
| ZenFlow Agent API (staging) | Agent Eval Bench |
| /v1/agents | ZenFlow Meshtastic Gateway, Alpha Signal Wristband, Kinetic IQ Wearable, Habit Architecture Wearable, Neuro-Pulse Wristband |
| /v1/agents/spawn | Atlas Learning Kiosk, P.E.T.E.E.R. Assessment Node, Cognitive Coaching Shell, Behavioral Sensing Station |
| ZenFlow Agent API (local cache) | Field Learning Kit, Psychographic Field Kit |
| ZenFlow Agent API (mesh sync) | Market Intelligence Field Kit |
| ZenFlow Agent API | SOC Intelligence Terminal |

## Data residency stated in the spec
- Cohort Engagement Badge: all data stays on the local Hybrid Living Mac mini.
- Behavioral Sensing Station: all data remains on the local Cognara Mac mini, never cloud-synced.
- Forensic Evidence Node: SHA-256 on-device hashing, encrypted NVMe partition, air-gapped Synology NAS backup.
- Chain Ledger Node: Synology NAS encrypted share; on-premises Web3 monitoring.

Related: [[ZenFlow API]], [[ZenFlow API — FastAPI Docs]], [[Wearables Agent Spec — Architecture and Stack]], [[Wearables Agent Spec — n8n Workflow and MCP Index]].
