---
title: VH-01 Helix Bio Scanner
id: VH-01
cost: ~$650–$850
tags:
- physical-ai
- build-spec
- hardware
- vital-helix
- jetson
type: build-spec
owner: JR Moyler (Hataalii)
phase: prototype
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
cost_low: 650
division: Vital Helix
cost_high: 850
division_status: chartered
---
# VH-01 Helix Bio Scanner

*Biometric intelligence, locally processed.*

**Division:** [[Vital Helix Division]] (chartered, not operating) · **Director:** [[Director_Vital_Helix]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `VH-01` |
| Product | Helix Bio Scanner |
| Est. budget | ~$650–$850 |
| Parts listed | 8 |
| Status | Specified in build spec (prototype to working product) |

## What it is

Vital Helix's wearable sensor hub. Aggregates BLE biometric streams from on-body sensors, runs a lightweight health inference model on Jetson, and logs longitudinal wellness data to the NAS.

## Outcome

Edge biometric hub — BLE sensor aggregation, wellness inference, local health data logging.

## Hardware (bill of materials)

- [ ] NVIDIA Jetson Orin Nano Super
- [ ] Arduino Nano 33 BLE Sense Rev2
- [ ] Adafruit Feather nRF52840 Sense
- [ ] IMU ICM-20948
- [ ] Raspberry Pi 5 (gateway + display)
- [ ] Whisplay HAT
- [ ] Pi M.2 HAT+ + 2TB NVMe
- [ ] 3D-printed Bambu A1 clinical enclosure (PETG)

Est. budget: **~$650–$850**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].
