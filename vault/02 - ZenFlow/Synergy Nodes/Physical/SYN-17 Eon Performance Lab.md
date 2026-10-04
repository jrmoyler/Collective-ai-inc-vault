---
title: SYN-17 Eon Performance Lab
id: SYN-17
cost: ~$1,200–$1,800
kind: physical
tags:
- synergy-node
- physical-node
- phase-3
type: synergy-node
owner: JR Moyler (Hataalii)
phase: 3
source: Full Synergy Node Catalog
status: planned
updated: 2026-10-04
divisions: Eon Core, Kinetic Edge
---
# SYN-17 Eon Performance Lab

Physical Synergy Node SYN-17 from the [[Full Synergy Node Catalog]]. Phase 3 — Mobility + Actuation. Divisions: [[Eon Core Division]] ✦ [[Kinetic Edge Division]].

| Field | Value |
|---|---|
| Node | SYN-17 |
| Kind | Physical hardware fusion node |
| Phase | 3 — Mobility + Actuation |
| Divisions | Eon Core, Kinetic Edge |
| Est. build budget | ~$1,200–$1,800 |
| Status | planned |

## Why These Divisions Fuse
Eon Core studies biological age over long time horizons. Kinetic Edge captures athletic performance in short training windows. The fusion is human optimization across two timescales — today's performance and longitudinal biological trajectory.

## Product Description
A combined performance and longevity assessment station running Kinetic Edge Apex System acute performance measurement alongside Eon Core longitudinal biological health monitoring. The station features a motion capture zone for athletic performance data and a biometric assessment bench for longevity markers. Both agents run after each assessment session — the Apex Performance Agent generates the immediate training recommendation while the Longevity Intelligence Agent updates the subject's biological age model.

## Hardware Components (Bill of Materials)
The catalog gives one estimated budget for the whole build (~$1,200–$1,800); it does not price parts individually.
- NVIDIA Jetson Orin Nano Super — performance inference (Kinetic) + longevity modeling (Eon)
- Raspberry Pi 5 8GB ×2 — one per division pipeline
- Whisplay HAT ×2 — Kinetic: performance brief; Eon Core: longevity trend
- Adafruit 9-DOF IMU Feather ×6 — full-body motion capture array
- Pi Camera Module 3 ×2 — gait analysis + reaction time measurement
- Polar H10 BLE chest strap — HRV + heart rate ground truth
- Dynamometer (grip strength) + GPIO interface — Eon Core longevity marker
- Pi M.2 HAT+ + 2TB NVMe — dual partition: athletic performance + longevity time-series

## ZenFlow Agents
- Kinetic Edge Apex Performance Agent
- Eon Core Longevity Intelligence Agent
- Cross-Timescale Optimization Task Agent
- ZenFlow Knowledge Keeper

## n8n Workflows
- Post-Assessment Combined Brief Generator — dual timescale report
- Eon Core Biological Age Model Update — each session adds a data point
- Physician Review Queue Escalation — flags longitudinal anomalies
- Training + Longevity Correlation Report — monthly cross-division analysis

## Division Contributions
| Division | Contribution |
|---|---|
| [[Eon Core Division]] | Longitudinal biological age modeling, longevity marker tracking, physician review escalation, lifespan trend analysis |
| [[Kinetic Edge Division]] | Acute performance measurement, training load recommendation, gait + power analysis, recovery scoring |

## Build Outcome
Dual-timescale optimization station — today's performance and multi-year biological trajectory in one assessment session.

**Est. budget:** ~$1,200–$1,800

## Phase Context
Kiosks, rovers, and labs. Ground-level mobility and human interaction surfaces. Aegis-Hold for all actuation nodes until e-stop verification is complete.

> [!note] Build rule
> Phase 1 funds Phase 2. Phase 2 funds Phase 3. Phase 3 funds Phase 4. Do not build Phase 4 before Phase 1 proves revenue and operating discipline. This applies to both digital and physical nodes.

## Related
- [[Apex System]]
- [[BioAge Engine]]
- [[Eon Biological Age Platform]]
- [[Knowledge Keeper]]
- [[Director_Eon_Core]]
- [[Director_Kinetic_Edge]]
- [[Full Synergy Node Catalog]]
- [[Synergy Node Handbook]]
- [[Aegis Protocol]]
