---
title: CM-01 Cognara Behavior Node
id: CM-01
cost: ~$380–$510
tags:
- physical-ai
- build-spec
- hardware
- cognara-mind
type: build-spec
owner: JR Moyler (Hataalii)
phase: prototype
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
cost_low: 380
division: Cognara Mind
cost_high: 510
division_status: chartered
---
# CM-01 Cognara Behavior Node

*Behavioral signal capture at the physical edge.*

**Division:** [[Cognara Mind Division]] (chartered, not operating) · **Director:** [[Director_Cognara_Mind]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `CM-01` |
| Product | Cognara Behavior Node |
| Est. budget | ~$380–$510 |
| Parts listed | 8 |
| Status | Specified in build spec (prototype to working product) |

## What it is

Cognara Mind's ambient behavioral sensing station. Captures voice tone, micro-gesture, and environmental context via BLE and IMU sensors — all routed to the Cognara Mac mini for behavioral pattern analysis.

## Outcome

Ambient behavioral sensing node — voice tone, micro-gesture, environmental context, pattern logging.

## Hardware (bill of materials)

- [ ] Raspberry Pi 5 8GB
- [ ] ReSpeaker 4-Mic Array v2.0 (voice tone capture)
- [ ] IMU BNO085 (micro-gesture + motion)
- [ ] Pi Camera Module 3 (facial context, opt-in only)
- [ ] Arduino Nano 33 BLE Sense Rev2
- [ ] Whisplay HAT
- [ ] Pi M.2 HAT+ + 1TB NVMe
- [ ] 3D-printed Bambu A1 behavioral lab enclosure

Est. budget: **~$380–$510**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].
