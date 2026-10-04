---
title: AP-01 Prime Shell v0.1 (Build Spec)
id: AP-01
cost: ~$1,200–$1,800
tags:
- physical-ai
- build-spec
- hardware
- animus-prime
- aegis-hold
- jetson
type: build-spec
owner: JR Moyler (Hataalii)
phase: prototype
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
cost_low: 1200
division: Animus Prime
cost_high: 1800
division_status: chartered
---
# AP-01 Prime Shell v0.1 (Build Spec)

*The first android is assembled.*

**Division:** [[Animus Prime Division]] (chartered, not operating) · **Director:** [[Director_Animus_Prime]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `AP-01` |
| Product | Prime Shell v0.1 |
| Est. budget | ~$1,200–$1,800 |
| Parts listed | 9 |
| Status | Specified in build spec (prototype to working product) |

## What it is

Animus Prime's inaugural humanoid subsystem — InMoov-style 3D-printed torso/head, Amazing Hand manipulation, ReSpeaker audio, and Jetson-powered perception.

## Outcome

Android interaction shell — voice conversation, head tracking, hand gestures, embodied agent interface.

## Hardware (bill of materials)

- [ ] InMoov 3D-printed head + torso (Bambu P1S + Prusa CORE One+)
- [ ] Amazing Hand (<$200 parts)
- [ ] NVIDIA Jetson Orin Nano Super
- [ ] ReSpeaker 4-Mic Array v2.0
- [ ] Adafruit I2S Speaker Bonnet
- [ ] Pi Camera Module 3 Wide
- [ ] PCA9685 16-channel servo driver
- [ ] DYNAMIXEL XL330 smart servos
- [ ] Emergency stop + fused rails

Est. budget: **~$1,200–$1,800**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].

> [!warning] Aegis-Hold
> This build has physical autonomy (flight, drive or actuation). The spec stages all physical autonomy behind the Aegis-Hold safety gate. See [[Physical AI Build Spec — Safety and Network Isolation]].

## Related vault notes

- [[Prime Humanoid R&D]]
