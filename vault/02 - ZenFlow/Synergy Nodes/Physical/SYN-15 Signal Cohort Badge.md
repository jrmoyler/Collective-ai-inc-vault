---
title: SYN-15 Signal Cohort Badge
id: SYN-15
cost: ~$45–$65 per badge (minimum cohort of 20)
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
divisions: Signal Velocity, Hybrid Living
---
# SYN-15 Signal Cohort Badge

Physical Synergy Node SYN-15 from the [[Full Synergy Node Catalog]]. Phase 2 — Intelligence + Sensing. Divisions: [[Signal Velocity Division]] ✦ [[Hybrid Living Division]].

| Field | Value |
|---|---|
| Node | SYN-15 |
| Kind | Physical hardware fusion node |
| Phase | 2 — Intelligence + Sensing |
| Divisions | Signal Velocity, Hybrid Living |
| Est. build budget | ~$45–$65 per badge (minimum cohort of 20) |
| Status | planned |

## Why These Divisions Fuse
Hybrid Living runs cohort programs and needs engagement data. Signal Velocity needs conversion and attribution data for the marketing funnel that produced those cohort enrollees. One badge, two marketing and education intelligence pipelines.

## Product Description
A smart wearable badge distributed to cohort participants at enrollment. Before enrollment it is a Signal Velocity conversion tracking device — logging the participant's funnel entry point and enrollment trigger. During sessions it becomes a Hybrid Living cohort engagement sensor — capturing motion, audio proximity, and interaction frequency as attention signals.

## Hardware Components (Bill of Materials)
The catalog gives one estimated budget for the whole build (~$45–$65 per badge (minimum cohort of 20)); it does not price parts individually.
- Seeed XIAO nRF52840 Sense — badge MCU + IMU + BLE 5.0
- Adafruit DRV2605L Haptic Controller + ERM — engagement feedback vibration
- NFC tag embedded (NTAG215) — enrollment tap-in + session check-in
- LED status ring (NeoPixel 8) — session mode indicator
- LiPo 200mAh — multi-day cohort battery life
- Bambu A1 TPU badge enclosure with lanyard clip
- BLE 5.0 gateway Pi 5 hub — room-level BLE aggregation

## ZenFlow Agents
- Signal Velocity Content Attribution Task Agent
- Hybrid Living Cohort Manager Task Agent
- Cross-Pipeline Learner Attribution Agent
- ZenFlow Knowledge Keeper

## n8n Workflows
- Enrollment Funnel Attribution Logger — captures entry point at badge activation
- Session Engagement Sync — BLE proximity + motion to Hybrid Living
- Post-Cohort Attribution Report — combined Signal + Hybrid analysis

## Division Contributions
| Division | Contribution |
|---|---|
| [[Signal Velocity Division]] | Enrollment attribution, funnel tracking, content-to-conversion data, campaign ROI per cohort |
| [[Hybrid Living Division]] | Session attendance, engagement signals, cohort completion correlation, learning outcome tracking |

## Build Outcome
Enrollment-to-completion intelligence badge — attribution data from funnel to graduation in one wearable.

**Est. budget:** ~$45–$65 per badge (minimum cohort of 20)

## Phase Context
Wearables, terminals, compliance rigs, and intelligence kits. The human-scale sensing and data intelligence layer. 11 nodes, no actuation — these can all be built and operated before Phase 3 Aegis-Hold clearance.

> [!note] Build rule
> Phase 1 funds Phase 2. Phase 2 funds Phase 3. Phase 3 funds Phase 4. Do not build Phase 4 before Phase 1 proves revenue and operating discipline. This applies to both digital and physical nodes.

## Related
- [[Atlas Platform]]
- [[Growth Intelligence Platform]]
- [[Knowledge Keeper]]
- [[Director_Signal_Velocity]]
- [[Director_Hybrid_Living]]
- [[Full Synergy Node Catalog]]
- [[Synergy Node Handbook]]
- [[Aegis Protocol]]
