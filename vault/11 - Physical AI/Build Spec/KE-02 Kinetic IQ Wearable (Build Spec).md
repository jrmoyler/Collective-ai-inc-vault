---
title: KE-02 Kinetic IQ Wearable (Build Spec)
id: KE-02
cost: ~$150–$210
tags:
- physical-ai
- build-spec
- hardware
- kinetic-edge
- wearable
type: build-spec
owner: JR Moyler (Hataalii)
phase: prototype
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
cost_low: 150
division: Kinetic Edge
cost_high: 210
division_status: chartered
---
# KE-02 Kinetic IQ Wearable (Build Spec)

*Intelligence on the body — performance tracking you can feel.*

**Division:** [[Kinetic Edge Division]] (chartered, not operating) · **Director:** [[Director_Kinetic_Edge]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `KE-02` |
| Product | Kinetic IQ Wearable |
| Est. budget | ~$150–$210 |
| Parts listed | 6 |
| Status | Specified in build spec (prototype to working product) |

## What it is

A wearable performance sensor for athletes. Captures acceleration, orientation, and biometric context via BLE, delivering real-time haptic coaching cues and logging sessions to the Kinetic Edge Mac mini.

## Outcome

Athlete wearable — BLE motion capture, haptic coaching cues, session data logging.

## Hardware (bill of materials)

- [ ] Arduino Nano 33 BLE Sense Rev2
- [ ] IMU ICM-20948
- [ ] Adafruit DRV2605L Haptic Controller
- [ ] Adafruit Feather nRF52840 Sense
- [ ] PowerBoost 1000 + LiPo
- [ ] 3D-printed Bambu A1 PETG/TPU sport enclosure

Est. budget: **~$150–$210**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].

## Related vault notes

- [[Kinetic IQ]]
