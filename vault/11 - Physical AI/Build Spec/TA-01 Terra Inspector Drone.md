---
title: TA-01 Terra Inspector Drone
id: TA-01
cost: ~$1,000–$1,500
tags:
- physical-ai
- build-spec
- hardware
- terra-axis
- drone
- aegis-hold
- jetson
type: build-spec
owner: JR Moyler (Hataalii)
phase: prototype
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
cost_low: 1000
division: Terra Axis
cost_high: 1500
division_status: chartered
---
# TA-01 Terra Inspector Drone

*Property intelligence from above.*

**Division:** [[Terra Axis Division]] (chartered, not operating) · **Director:** [[Director_Terra_Axis]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `TA-01` |
| Product | Terra Inspector Drone |
| Est. budget | ~$1,000–$1,500 |
| Parts listed | 8 |
| Status | Specified in build spec (prototype to working product) |

## What it is

An aerial inspection drone for property condition surveys, construction progress documentation, and smart habitat site mapping. PX4-controlled with Jetson + depth camera payload.

## Outcome

Aerial property inspection — SLAM mapping, condition documentation, site progress reporting.

## Hardware (bill of materials)

- [ ] Holybro X500 V2 ARF Kit
- [ ] Pixhawk 6C Flight Controller
- [ ] NVIDIA Jetson Orin Nano Super
- [ ] RealSense D435i
- [ ] Pi AI Camera
- [ ] Holybro GPS + telemetry
- [ ] LiPo battery + XT60 harness
- [ ] 3D-printed Bambu P1S payload bay

Est. budget: **~$1,000–$1,500**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].

> [!warning] Aegis-Hold
> This build has physical autonomy (flight, drive or actuation). The spec stages all physical autonomy behind the Aegis-Hold safety gate. See [[Physical AI Build Spec — Safety and Network Isolation]].

## Related vault notes

- [[Smart Habitat System]]
