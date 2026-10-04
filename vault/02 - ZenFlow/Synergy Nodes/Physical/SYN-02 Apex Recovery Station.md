---
title: SYN-02 Apex Recovery Station
id: SYN-02
cost: ~$480–$650
kind: physical
tags:
- synergy-node
- physical-node
- phase-2
type: synergy-node
owner: JR Moyler (Hataalii)
phase: 2
source: Full Synergy Node Catalog
status: planned
updated: 2026-10-04
divisions: Kinetic Edge, Vital Helix
---
# SYN-02 Apex Recovery Station

Physical Synergy Node SYN-02 from the [[Full Synergy Node Catalog]]. Phase 2 — Intelligence + Sensing. Divisions: [[Kinetic Edge Division]] ✦ [[Vital Helix Division]].

| Field | Value |
|---|---|
| Node | SYN-02 |
| Kind | Physical hardware fusion node |
| Phase | 2 — Intelligence + Sensing |
| Divisions | Kinetic Edge, Vital Helix |
| Est. build budget | ~$480–$650 |
| Status | planned |

## Why These Divisions Fuse
Kinetic Edge captures acute athletic performance data. Vital Helix tracks longitudinal biological health. The crossover is recovery — the state between sessions where both divisions have data and neither acts alone. This node fuses both pipelines into a single morning readiness recommendation.

## Product Description
A wearable BLE aggregation hub combining Kinetic Edge Apex System biometrics (HRV, motion recovery, sleep quality) with Vital Helix Bio-Digital Twin health model on a shared Jetson compute node. Each morning, both agents run concurrently — Kinetic Edge scores physical recovery capacity, Vital Helix scores systemic biological readiness. The combined score determines training load, rest protocol, or medical referral.

## Hardware Components (Bill of Materials)
The catalog gives one estimated budget for the whole build (~$480–$650); it does not price parts individually.
- NVIDIA Jetson Orin Nano Super — combined inference for both pipelines
- Raspberry Pi 5 8GB — BLE hub + morning brief display controller
- Whisplay HAT — morning readiness dashboard
- Adafruit 9-DOF IMU Feather ×4 — Kinetic IQ BLE sensor pack
- MAX30102 Pulse Oximeter + Heart Rate — HRV proxy
- Pi M.2 HAT+ + 1TB NVMe — biometric time-series partition

## ZenFlow Agents
- Kinetic Edge Apex Recovery Agent
- Vital Helix Wellness Agent
- Biosignal Fusion Task Agent
- ZenFlow Knowledge Keeper

## n8n Workflows
- Athlete Recovery Alert — 6AM readiness brief to coaches
- Vital Helix Biometric Sync — overnight wearable data ingestion
- Medical Referral Escalation — fires on biometric threshold breach

## Division Contributions
| Division | Contribution |
|---|---|
| [[Kinetic Edge Division]] | Apex System wearables, HRV + motion recovery scoring, training load protocol |
| [[Vital Helix Division]] | Bio-Digital Twin model, systemic biological readiness score, medical referral path |

## Build Outcome
Unified athlete recovery station — combined physical + biological readiness score delivered before every session.

**Est. budget:** ~$480–$650

## Phase Context
Wearables, terminals, compliance rigs, and intelligence kits. The human-scale sensing and data intelligence layer. 11 nodes, no actuation — these can all be built and operated before Phase 3 Aegis-Hold clearance.

> [!note] Build rule
> Phase 1 funds Phase 2. Phase 2 funds Phase 3. Phase 3 funds Phase 4. Do not build Phase 4 before Phase 1 proves revenue and operating discipline. This applies to both digital and physical nodes.

## Related
- [[Apex System]]
- [[Kinetic IQ]]
- [[Bio-Digital Twin]]
- [[Knowledge Keeper]]
- [[Director_Kinetic_Edge]]
- [[Director_Vital_Helix]]
- [[Full Synergy Node Catalog]]
- [[Synergy Node Handbook]]
- [[Aegis Protocol]]
