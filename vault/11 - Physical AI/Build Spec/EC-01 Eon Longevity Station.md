---
title: EC-01 Eon Longevity Station
id: EC-01
cost: ~$700–$950
tags:
- physical-ai
- build-spec
- hardware
- eon-core
- jetson
type: build-spec
owner: JR Moyler (Hataalii)
phase: prototype
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
cost_low: 700
division: Eon Core
cost_high: 950
division_status: chartered
---
# EC-01 Eon Longevity Station

*Biological age runs as a local inference model.*

**Division:** [[Eon Core Division]] (chartered, not operating) · **Director:** [[Director_Eon_Core]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `EC-01` |
| Product | Eon Longevity Station |
| Est. budget | ~$700–$950 |
| Parts listed | 9 |
| Status | Specified in build spec (prototype to working product) |

## What it is

Eon Core's biometric research station. Aggregates wearable sensor streams, runs biological age inference on Jetson, and stores longitudinal health data on an encrypted NAS partition.

## Outcome

Longevity research station — biometric logging, biological age inference, encrypted longitudinal storage.

## Hardware (bill of materials)

- [ ] NVIDIA Jetson Orin Nano Super
- [ ] Arduino Nano 33 BLE Sense Rev2
- [ ] Adafruit Feather nRF52840 Sense
- [ ] IMU ICM-20948
- [ ] Raspberry Pi 5 (gateway + display)
- [ ] Whisplay HAT
- [ ] Pi M.2 HAT+ + 2TB NVMe
- [ ] Geekworm X1202 UPS HAT
- [ ] 3D-printed Bambu A1 clinical enclosure (PETG)

Est. budget: **~$700–$950**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].
