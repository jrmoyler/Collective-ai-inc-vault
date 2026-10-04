---
title: EC-02 Lifespan Wearable
id: EC-02
cost: ~$140–$200
tags:
- physical-ai
- build-spec
- hardware
- eon-core
- wearable
type: build-spec
owner: JR Moyler (Hataalii)
phase: prototype
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
cost_low: 140
division: Eon Core
cost_high: 200
division_status: chartered
---
# EC-02 Lifespan Wearable

*Wear your longevity data.*

**Division:** [[Eon Core Division]] (chartered, not operating) · **Director:** [[Director_Eon_Core]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `EC-02` |
| Product | Lifespan Wearable |
| Est. budget | ~$140–$200 |
| Parts listed | 6 |
| Status | Specified in build spec (prototype to working product) |

## What it is

A BLE sensor wearable for continuous longitudinal health tracking. Captures motion, orientation, and environmental signals, uploading to the Eon Core station at end of each session.

## Outcome

Longitudinal health wearable — continuous BLE biometric capture, session upload, haptic feedback.

## Hardware (bill of materials)

- [ ] Arduino Nano 33 BLE Sense Rev2
- [ ] IMU BNO085
- [ ] Adafruit Feather nRF52840 Sense
- [ ] Adafruit DRV2605L Haptic Controller
- [ ] PowerBoost 1000 + LiPo
- [ ] 3D-printed Bambu A1 PETG/TPU wristband

Est. budget: **~$140–$200**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].
