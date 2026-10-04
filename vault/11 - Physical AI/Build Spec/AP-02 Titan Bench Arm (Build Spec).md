---
title: AP-02 Titan Bench Arm (Build Spec)
id: AP-02
cost: ~$900–$1,400
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
cost_low: 900
division: Animus Prime
cost_high: 1400
division_status: chartered
---
# AP-02 Titan Bench Arm (Build Spec)

*Manipulation begins here.*

**Division:** [[Animus Prime Division]] (chartered, not operating) · **Director:** [[Director_Animus_Prime]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `AP-02` |
| Product | Titan Bench Arm |
| Est. budget | ~$900–$1,400 |
| Parts listed | 8 |
| Status | Specified in build spec (prototype to working product) |

## What it is

A 6-axis robot arm with depth camera and Jetson for LeRobot teleoperation and embodied AI data collection. The foundation for Prime Directorate arm development.

## Outcome

Embodied AI manipulation bench — teleoperation, pick/place, LeRobot training data.

## Hardware (bill of materials)

- [ ] SO-101 / LeRobot arm (leader + follower pair)
- [ ] NVIDIA Jetson Orin Nano Super
- [ ] Luxonis OAK-D Lite
- [ ] DYNAMIXEL XL330 smart servos
- [ ] PCA9685 16-channel servo driver
- [ ] Emergency stop switch + fused rails
- [ ] Bench power supply
- [ ] 3D-printed Bambu P1S arm mount

Est. budget: **~$900–$1,400**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].

> [!warning] Aegis-Hold
> This build has physical autonomy (flight, drive or actuation). The spec stages all physical autonomy behind the Aegis-Hold safety gate. See [[Physical AI Build Spec — Safety and Network Isolation]].

## Related vault notes

- [[Prime Directorate]]
