---
title: AP-03 Dexterous Hand Node (Build Spec)
id: AP-03
cost: ~$600–$900
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
cost_low: 600
division: Animus Prime
cost_high: 900
division_status: chartered
---
# AP-03 Dexterous Hand Node (Build Spec)

*The hand that learns.*

**Division:** [[Animus Prime Division]] (chartered, not operating) · **Director:** [[Director_Animus_Prime]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `AP-03` |
| Product | Dexterous Hand Node |
| Est. budget | ~$600–$900 |
| Parts listed | 7 |
| Status | Specified in build spec (prototype to working product) |

## What it is

An isolated Amazing Hand prototype attached to a Jetson for fine motor control experiments, grasp learning, and manipulation algorithm development — independent of the full Prime Shell.

## Outcome

Dexterous hand research node — grasp learning, manipulation experiments, fine motor AI training.

## Hardware (bill of materials)

- [ ] Amazing Hand 3D-printed humanoid hand
- [ ] NVIDIA Jetson Orin Nano Super
- [ ] DYNAMIXEL XL330 smart servos (finger joints)
- [ ] PCA9685 servo driver
- [ ] Luxonis OAK-D Lite (visual feedback)
- [ ] Emergency stop + bench PSU
- [ ] 3D-printed Bambu P1S wrist mount + fixture

Est. budget: **~$600–$900**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].

> [!warning] Aegis-Hold
> This build has physical autonomy (flight, drive or actuation). The spec stages all physical autonomy behind the Aegis-Hold safety gate. See [[Physical AI Build Spec — Safety and Network Isolation]].
