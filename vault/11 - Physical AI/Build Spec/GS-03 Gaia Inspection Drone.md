---
title: GS-03 Gaia Inspection Drone
id: GS-03
cost: ~$900–$1,300
tags:
- physical-ai
- build-spec
- hardware
- gaia-synthesis
- drone
- aegis-hold
- jetson
type: build-spec
owner: JR Moyler (Hataalii)
phase: prototype
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
cost_low: 900
division: Gaia Synthesis
cost_high: 1300
division_status: chartered
---
# GS-03 Gaia Inspection Drone

*Environmental intelligence from altitude.*

**Division:** [[Gaia Synthesis Division]] (chartered, not operating) · **Director:** [[Director_Gaia_Synthesis]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `GS-03` |
| Product | Gaia Inspection Drone |
| Est. budget | ~$900–$1,300 |
| Parts listed | 7 |
| Status | Specified in build spec (prototype to working product) |

## What it is

An aerial inspection drone for agricultural field surveys and environmental monitoring. AI camera + depth sensor payload with GPS logging and mesh telemetry.

## Outcome

Aerial field inspection — crop health imaging, environmental SLAM, GPS-tagged survey data.

## Hardware (bill of materials)

- [ ] Holybro X500 V2 ARF Kit
- [ ] Pixhawk 6C
- [ ] NVIDIA Jetson Orin Nano Super
- [ ] Pi AI Camera (field AI inspection)
- [ ] RealSense D435i (depth)
- [ ] Holybro GPS + telemetry
- [ ] LiPo battery + XT60 harness

Est. budget: **~$900–$1,300**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].

> [!warning] Aegis-Hold
> This build has physical autonomy (flight, drive or actuation). The spec stages all physical autonomy behind the Aegis-Hold safety gate. See [[Physical AI Build Spec — Safety and Network Isolation]].
