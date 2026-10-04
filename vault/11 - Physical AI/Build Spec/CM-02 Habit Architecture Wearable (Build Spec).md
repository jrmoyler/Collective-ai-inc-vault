---
title: CM-02 Habit Architecture Wearable (Build Spec)
id: CM-02
cost: ~$150–$210
tags:
- physical-ai
- build-spec
- hardware
- cognara-mind
- wearable
type: build-spec
owner: JR Moyler (Hataalii)
phase: prototype
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
cost_low: 150
division: Cognara Mind
cost_high: 210
division_status: chartered
---
# CM-02 Habit Architecture Wearable (Build Spec)

*The nudge engine — behavior change you can feel.*

**Division:** [[Cognara Mind Division]] (chartered, not operating) · **Director:** [[Director_Cognara_Mind]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `CM-02` |
| Product | Habit Architecture Wearable |
| Est. budget | ~$150–$210 |
| Parts listed | 6 |
| Status | Specified in build spec (prototype to working product) |

## What it is

A BLE wearable that delivers precisely timed haptic nudges based on behavioral AI outputs from the Cognara Mac mini. Captures response signals and feeds them back into the habit formation model.

## Outcome

Behavioral nudge wristband — timed haptic cues, BLE response capture, habit model feedback loop.

## Hardware (bill of materials)

- [ ] Adafruit Feather nRF52840 Sense
- [ ] Adafruit DRV2605L Haptic Controller
- [ ] IMU ICM-20948 (response motion capture)
- [ ] PowerBoost 1000 + LiPo
- [ ] Arduino Nano 33 BLE Sense Rev2
- [ ] 3D-printed Bambu A1 PETG/TPU wristband

Est. budget: **~$150–$210**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].
