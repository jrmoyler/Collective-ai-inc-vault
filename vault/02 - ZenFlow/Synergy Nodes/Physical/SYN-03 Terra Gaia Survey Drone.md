---
title: SYN-03 Terra Gaia Survey Drone
id: SYN-03
cost: ~$1,200–$1,800
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
divisions: Terra Axis, Gaia Synthesis
---
# SYN-03 Terra Gaia Survey Drone

Physical Synergy Node SYN-03 from the [[Full Synergy Node Catalog]]. Phase 4 — Aerial + Field. Divisions: [[Terra Axis Division]] ✦ [[Gaia Synthesis Division]].

> [!warning] Aegis-Hold
> Phase 4 rule: Aegis-Hold until FAA authorization is confirmed for the operational area.

| Field | Value |
|---|---|
| Node | SYN-03 |
| Kind | Physical hardware fusion node |
| Phase | 4 — Aerial + Field |
| Divisions | Terra Axis, Gaia Synthesis |
| Est. build budget | ~$1,200–$1,800 |
| Status | aegis-hold |

## Why These Divisions Fuse
Terra Axis needs aerial property inspection data. Gaia Synthesis needs environmental field data. The same drone platform collecting both datasets simultaneously costs half the flight time and generates cross-domain intelligence neither division can produce alone.

## Product Description
A field-deployable quadcopter running two simultaneous data collection pipelines mid-flight. The Terra Axis Terra Inspector Agent processes RGB + depth data into SLAM-based property maps and asset registers. The Gaia Synthesis Crop Sentinel Agent processes multispectral and thermal imaging to generate NDVI vegetation indices, soil moisture estimates, and environmental anomaly flags. Both agents write to partitioned sections of the onboard NVMe.

## Hardware Components (Bill of Materials)
The catalog gives one estimated budget for the whole build (~$1,200–$1,800); it does not price parts individually.
- DJI F450 quad frame — custom build base
- Raspberry Pi 5 8GB — dual-pipeline flight companion
- NVIDIA Jetson Orin Nano Super — onboard inference for both agents
- Intel RealSense D435i — SLAM + depth for Terra property mapping
- Raspberry Pi AI Camera / Sony IMX500 — RGB + on-sensor classification
- Adafruit BME688 — atmospheric sensor (temp, humidity, VOC, pressure)
- LILYGO T-Beam Meshtastic — mesh telemetry + GPS heartbeat to Foundry
- Pi M.2 HAT+ + 2TB NVMe — dual-partition: Terra + Gaia data
- LiPo 5000mAh — 20+ min flight time under full sensor load

## ZenFlow Agents
- Terra Axis Terra Inspector Agent
- Gaia Synthesis Crop Sentinel Agent
- Terra Gaia Field Intelligence Fusion Task Agent
- ZenFlow Knowledge Keeper

## n8n Workflows
- Terra Gaia Field Sync — post-landing dual pipeline sync
- Property Condition Report Generator — Terra Axis output
- Gaia Environmental Anomaly Alert — fires on threshold breach

## Division Contributions
| Division | Contribution |
|---|---|
| [[Terra Axis Division]] | SLAM property mapping, infrastructure condition assessment, asset register generation |
| [[Gaia Synthesis Division]] | Multispectral crop analysis, NDVI scoring, soil moisture estimation, environmental alerting |

## Build Outcome
Dual-intelligence survey drone — one flight produces both property inspection and environmental field intelligence.

**Est. budget:** ~$1,200–$1,800

## Phase Context
Survey drone and relay drone. Aerial intelligence and mesh extension. Aegis-Hold until FAA authorization is confirmed for the operational area.

> [!note] Build rule
> Phase 1 funds Phase 2. Phase 2 funds Phase 3. Phase 3 funds Phase 4. Do not build Phase 4 before Phase 1 proves revenue and operating discipline. This applies to both digital and physical nodes.

## Related
- [[Terra Vision]]
- [[Field Intelligence Platform]]
- [[Knowledge Keeper]]
- [[Director_Terra_Axis]]
- [[Director_Gaia_Synthesis]]
- [[Full Synergy Node Catalog]]
- [[Synergy Node Handbook]]
- [[Aegis Protocol]]
