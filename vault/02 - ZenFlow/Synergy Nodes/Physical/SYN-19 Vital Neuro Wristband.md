---
title: SYN-19 Vital Neuro Wristband
id: SYN-19
cost: ~$180–$260 per unit
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
divisions: Vital Helix, Cognara Mind
---
# SYN-19 Vital Neuro Wristband

Physical Synergy Node SYN-19 from the [[Full Synergy Node Catalog]]. Phase 2 — Intelligence + Sensing. Divisions: [[Vital Helix Division]] ✦ [[Cognara Mind Division]].

| Field | Value |
|---|---|
| Node | SYN-19 |
| Kind | Physical hardware fusion node |
| Phase | 2 — Intelligence + Sensing |
| Divisions | Vital Helix, Cognara Mind |
| Est. build budget | ~$180–$260 per unit |
| Status | planned |

## Why These Divisions Fuse
Vital Helix monitors biological health state continuously. Cognara Mind studies cognitive load and behavioral patterns. Both need continuous wearable data. A wristband simultaneously capturing physiological signals (Vital Helix) and behavioral proxy signals (Cognara Mind) from one sensor array generates research data for both divisions from a single consent-first deployment.

## Product Description
A research-grade wristband running dual data collection pipelines. The Vital Helix Wellness Agent receives the primary biometric stream — continuous HRV, heart rate, skin temperature, and sleep stage data. The Cognara Behavioral Task Agent receives a processed behavioral signal stream derived from motion variance and micro-gesture patterns — cognitive load and emotional state correlates that do not constitute identifiable health data. Both pipelines run under separate consent gates.

## Hardware Components (Bill of Materials)
The catalog gives one estimated budget for the whole build (~$180–$260 per unit); it does not price parts individually.
- Seeed XIAO nRF52840 Sense — MCU + 6-DOF IMU + BLE 5.0
- MAX30102 Pulse Oximeter + Heart Rate — continuous HRV + SpO2
- MLX90614 IR skin temperature sensor — metabolic state proxy
- LIS3DH Accelerometer — motion + behavioral gesture capture
- Adafruit DRV2605L Haptic Controller — consent prompt + alert delivery
- LiPo 500mAh — 5-day continuous monitoring battery life
- Medical-grade TPU band — skin-contact safe, washable
- Bambu A1 TPU case — Vital Helix DNA motif + Cognara Mind neural accents

## ZenFlow Agents
- Vital Helix Wellness Agent (primary biometric pipeline)
- Cognara Behavioral Task Agent (consent-gated behavioral pipeline)
- Dual-Consent Gate Controller
- ZenFlow Knowledge Keeper

## n8n Workflows
- Vital Helix Biometric Sync — continuous overnight + daytime health data
- Cognara Behavioral Pattern Capture — motion + arousal indicators
- Consent State Manager — enforces dual-consent separation at data layer
- Longitudinal Health Baseline Sync — feeds Eon Core SYN-17 between-session data

## Division Contributions
| Division | Contribution |
|---|---|
| [[Vital Helix Division]] | Continuous biometric monitoring, Bio-Digital Twin data feed, HRV + sleep + SpO2 health modeling |
| [[Cognara Mind Division]] | Behavioral proxy signals, cognitive load indicators, motion-based arousal modeling, consent-gated research data |

## Build Outcome
Dual-consent continuous monitoring wristband — physiological and behavioral intelligence from one body-worn device.

**Est. budget:** ~$180–$260 per unit

## Phase Context
Wearables, terminals, compliance rigs, and intelligence kits. The human-scale sensing and data intelligence layer. 11 nodes, no actuation — these can all be built and operated before Phase 3 Aegis-Hold clearance.

> [!note] Build rule
> Phase 1 funds Phase 2. Phase 2 funds Phase 3. Phase 3 funds Phase 4. Do not build Phase 4 before Phase 1 proves revenue and operating discipline. This applies to both digital and physical nodes.

## Related
- [[Bio-Digital Twin]]
- [[Neuro-Pulse]]
- [[Cognitive Assessment Layer]]
- [[Knowledge Keeper]]
- [[Director_Vital_Helix]]
- [[Director_Cognara_Mind]]
- [[Full Synergy Node Catalog]]
- [[Synergy Node Handbook]]
- [[Aegis Protocol]]
