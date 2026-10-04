---
title: GS-02 Field Rover Base
id: GS-02
cost: ~$1,200–$1,800
tags:
- physical-ai
- build-spec
- hardware
- gaia-synthesis
- rover
- aegis-hold
- jetson
- lora-mesh
type: build-spec
owner: JR Moyler (Hataalii)
phase: prototype
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
cost_low: 1200
division: Gaia Synthesis
cost_high: 1800
division_status: chartered
---
# GS-02 Field Rover Base

*Autonomous ground surveys — crop intelligence at ground level.*

**Division:** [[Gaia Synthesis Division]] (chartered, not operating) · **Director:** [[Director_Gaia_Synthesis]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `GS-02` |
| Product | Field Rover Base |
| Est. budget | ~$1,200–$1,800 |
| Parts listed | 7 |
| Status | Specified in build spec (prototype to working product) |

## What it is

A ROS2-compatible mobile rover for field traversal, soil sampling guidance, and visual crop inspection. Jetson-powered perception, LiDAR navigation, and mesh uplink for real-time data sync.

## Outcome

Autonomous field rover — ROS2 navigation, crop inspection, soil telemetry, mesh data uplink.

## Hardware (bill of materials)

- [ ] ROSMASTER R2 ROS2 rover base
- [ ] NVIDIA Jetson Orin Nano Super
- [ ] RPLIDAR A1M8 (navigation)
- [ ] Luxonis OAK-D Lite (visual crop inspection)
- [ ] LILYGO T-Beam Meshtastic (field mesh uplink)
- [ ] Cytron MD13S motor driver
- [ ] Emergency stop switch + fused rails

Est. budget: **~$1,200–$1,800**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].

> [!warning] Aegis-Hold
> This build has physical autonomy (flight, drive or actuation). The spec stages all physical autonomy behind the Aegis-Hold safety gate. See [[Physical AI Build Spec — Safety and Network Isolation]].
