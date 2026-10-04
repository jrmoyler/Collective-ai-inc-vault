---
title: KE-01 Apex Motion Cage (Build Spec)
id: KE-01
cost: ~$700–$950
tags:
- physical-ai
- build-spec
- hardware
- kinetic-edge
- jetson
type: build-spec
owner: JR Moyler (Hataalii)
phase: prototype
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
cost_low: 700
division: Kinetic Edge
cost_high: 950
division_status: chartered
---
# KE-01 Apex Motion Cage (Build Spec)

*Where athletes meet sensors.*

**Division:** [[Kinetic Edge Division]] (chartered, not operating) · **Director:** [[Director_Kinetic_Edge]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `KE-01` |
| Product | Apex Motion Cage |
| Est. budget | ~$700–$950 |
| Parts listed | 7 |
| Status | Specified in build spec (prototype to working product) |

## What it is

Kinetic Edge's multi-camera, multi-IMU performance sensing station. Captures athlete motion, gait, and reaction time, feeding the Apex System pipeline via the local Mac mini.

## Outcome

Athlete motion capture — gait analysis, reaction time logging, Apex System data ingestion.

## Hardware (bill of materials)

- [ ] Raspberry Pi 5 8GB (×2)
- [ ] Pi Global Shutter Camera (×2)
- [ ] IMU BNO085 (×3)
- [ ] NVIDIA Jetson Orin Nano Super
- [ ] Arduino Nano 33 BLE Sense Rev2
- [ ] Pi M.2 HAT+ + NVMe SSD
- [ ] 3D-printed Bambu P1S sensor brackets + mounts

Est. budget: **~$700–$950**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].

## Related vault notes

- [[Apex System]]
