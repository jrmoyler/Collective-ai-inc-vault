---
title: SYN-06 Aether Relay Drone
id: SYN-06
cost: ~$1,400–$2,000
kind: physical
tags:
- synergy-node
- physical-node
- phase-4
- aegis-hold
type: synergy-node
owner: JR Moyler (Hataalii)
phase: 4
source: Full Synergy Node Catalog
status: aegis-hold
updated: 2026-10-04
divisions: VectorShift, Aether Link
---
# SYN-06 Aether Relay Drone

Physical Synergy Node SYN-06 from the [[Full Synergy Node Catalog]]. Phase 4 — Aerial + Field. Divisions: [[VectorShift Division]] ✦ [[Aether Link Division]].

> [!warning] Aegis-Hold
> Aegis-Hold until flight tests (master index). Phase 4 rule: Aegis-Hold until FAA authorization is confirmed for the operational area. The Drone Safety Guardian agent runs under Aegis-Hold.

| Field | Value |
|---|---|
| Node | SYN-06 |
| Kind | Physical hardware fusion node |
| Phase | 4 — Aerial + Field |
| Divisions | VectorShift, Aether Link |
| Est. build budget | ~$1,400–$2,000 |
| Status | aegis-hold |

## Why These Divisions Fuse
VectorShift provides drone airframes and autonomous flight infrastructure. Aether Link provides mesh communications and signal routing. A drone carrying a mesh relay node extends the Foundry mesh into areas without ground coverage while the same airframe handles logistics and inspection missions.

## Product Description
A relay-capable quadcopter functioning simultaneously as a VectorShift logistics/inspection drone and an Aether Link aerial mesh relay node. In relay mode, the drone hovers at altitude extending the Meshtastic LoRa mesh into areas outside ground node coverage. In logistics mode, the Autonomous Routing Agent takes control for delivery and inspection missions.

## Hardware Components (Bill of Materials)
The catalog gives one estimated budget for the whole build (~$1,400–$2,000); it does not price parts individually.
- DJI F450 quad frame — logistics + relay capable airframe
- Raspberry Pi 5 8GB — dual-agent flight companion
- LILYGO T-Beam Supreme Meshtastic — primary aerial relay node
- Heltec V3 LoRa module — secondary mesh bridge
- NVIDIA Jetson Orin Nano Super — autonomous navigation inference
- RPLIDAR A1M8 — obstacle avoidance
- LiPo 6000mAh — extended hover + relay endurance

## ZenFlow Agents
- VectorShift Autonomous Routing Agent
- Aether Link Mesh Relay Agent
- ZenFlow Knowledge Keeper
- Drone Safety Guardian (Aegis-Hold)

## n8n Workflows
- Mesh Coverage Gap Detection — triggers relay positioning
- VectorShift Delivery Confirmation Workflow
- Aether Link Signal Quality Monitor — fires on RSSI degradation
- Emergency Relay Deploy — rapid mesh extension for incidents

## Division Contributions
| Division | Contribution |
|---|---|
| [[VectorShift Division]] | Autonomous flight infrastructure, logistics routing, delivery confirmation, obstacle avoidance |
| [[Aether Link Division]] | Meshtastic relay operations, mesh coverage optimization, signal quality monitoring, field comms bridging |

## Build Outcome
Aerial mesh relay + logistics drone — extends Foundry mesh to any location while conducting delivery missions.

**Est. budget:** ~$1,400–$2,000

## Phase Context
Survey drone and relay drone. Aerial intelligence and mesh extension. Aegis-Hold until FAA authorization is confirmed for the operational area.

> [!note] Build rule
> Phase 1 funds Phase 2. Phase 2 funds Phase 3. Phase 3 funds Phase 4. Do not build Phase 4 before Phase 1 proves revenue and operating discipline. This applies to both digital and physical nodes.

## Related
- [[Sky Vector]]
- [[The Mesh Network]]
- [[Knowledge Keeper]]
- [[Director_VectorShift]]
- [[Director_Aether_Link]]
- [[Full Synergy Node Catalog]]
- [[Synergy Node Handbook]]
- [[Aegis Protocol]]
