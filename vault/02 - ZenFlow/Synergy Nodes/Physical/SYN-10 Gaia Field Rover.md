---
title: SYN-10 Gaia Field Rover
id: SYN-10
cost: ~$1,200–$1,600
kind: physical
tags:
- synergy-node
- physical-node
- phase-3
- aegis-hold
type: synergy-node
owner: JR Moyler (Hataalii)
phase: 3
source: Full Synergy Node Catalog
status: aegis-hold
updated: 2026-10-04
divisions: Gaia Synthesis, VectorShift
---
# SYN-10 Gaia Field Rover

Physical Synergy Node SYN-10 from the [[Full Synergy Node Catalog]]. Phase 3 — Mobility + Actuation. Divisions: [[Gaia Synthesis Division]] ✦ [[VectorShift Division]].

> [!warning] Aegis-Hold
> Aegis-Hold for outdoor deployment. Phase 3 rule: Aegis-Hold for all actuation nodes until e-stop verification is complete.

| Field | Value |
|---|---|
| Node | SYN-10 |
| Kind | Physical hardware fusion node |
| Phase | 3 — Mobility + Actuation |
| Divisions | Gaia Synthesis, VectorShift |
| Est. build budget | ~$1,200–$1,600 |
| Status | aegis-hold |

## Why These Divisions Fuse
Gaia Synthesis needs autonomous ground-level environmental sensing at centimeter resolution that aerial drones cannot provide. VectorShift provides the autonomous routing infrastructure. A slow-moving ground rover with Gaia's sensor array and VectorShift's path planning navigates crop rows and garden zones without human supervision.

## Product Description
A slow-speed autonomous ground rover running Gaia Synthesis environmental sensors through crop rows and greenhouse aisles. The VectorShift Autonomous Routing Agent plans and executes the route — optimized for sensor coverage density rather than speed. The Gaia Crop Sentinel Agent processes the sensor stream in real time, generating irrigation zone flags, disease-risk alerts, and ventilation recommendations.

## Hardware Components (Bill of Materials)
The catalog gives one estimated budget for the whole build (~$1,200–$1,600); it does not price parts individually.
- Yahboom ROSMASTER R2 ROS2 rover — low-speed agricultural chassis
- Raspberry Pi 5 8GB — sensor hub + mission logic
- Jetson Orin Nano Super — Gaia sensor inference + anomaly detection
- Capacitive soil moisture sensors ×8 — row-level soil moisture mapping
- SCD41 CO2 + Humidity + Temperature Sensor — precision atmospheric
- RPLIDAR A1M8 — navigation SLAM + obstacle avoidance
- LILYGO T-Beam Meshtastic — field mesh telemetry
- LiPo 8000mAh — extended row-coverage endurance

## ZenFlow Agents
- Gaia Synthesis Crop Sentinel Agent
- VectorShift Autonomous Routing Agent
- Gaia Environmental Anomaly Detection Agent
- ZenFlow Knowledge Keeper

## n8n Workflows
- Gaia Field Sync — post-mission environmental dataset upload
- Irrigation Zone Flag Generator — fires on soil moisture threshold breach
- Gaia Dashboard Update Trigger — real-time AgriTech dashboard push
- Crop Health Anomaly Alert

## Division Contributions
| Division | Contribution |
|---|---|
| [[Gaia Synthesis Division]] | Environmental sensor array, crop health analysis, soil mapping, atmospheric monitoring, anomaly alerting |
| [[VectorShift Division]] | Autonomous route planning, obstacle avoidance, field coverage optimization, mission logging |

## Build Outcome
Environmental intelligence rover — autonomous field sensor deployment producing real-time crop and soil intelligence.

**Est. budget:** ~$1,200–$1,600

## Phase Context
Kiosks, rovers, and labs. Ground-level mobility and human interaction surfaces. Aegis-Hold for all actuation nodes until e-stop verification is complete.

> [!note] Build rule
> Phase 1 funds Phase 2. Phase 2 funds Phase 3. Phase 3 funds Phase 4. Do not build Phase 4 before Phase 1 proves revenue and operating discipline. This applies to both digital and physical nodes.

## Related
- [[Field Intelligence Platform]]
- [[Gaia Urban Farming Platform]]
- [[Knowledge Keeper]]
- [[Director_Gaia_Synthesis]]
- [[Director_VectorShift]]
- [[Full Synergy Node Catalog]]
- [[Synergy Node Handbook]]
- [[Aegis Protocol]]
