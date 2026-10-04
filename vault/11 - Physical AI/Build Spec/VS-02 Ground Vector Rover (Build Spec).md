---
title: VS-02 Ground Vector Rover (Build Spec)
id: VS-02
cost: ~$1,100–$1,600
tags:
- physical-ai
- build-spec
- hardware
- vectorshift
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
cost_low: 1100
division: VectorShift
cost_high: 1600
division_status: chartered
---
# VS-02 Ground Vector Rover (Build Spec)

*Last-mile delivery, on the ground.*

**Division:** [[VectorShift Division]] (chartered, not operating) · **Director:** [[Director_VectorShift]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `VS-02` |
| Product | Ground Vector Rover |
| Est. budget | ~$1,100–$1,600 |
| Parts listed | 7 |
| Status | Specified in build spec (prototype to working product) |

## What it is

A ROS2 rover base configured for autonomous last-mile navigation experiments. LiDAR + depth camera perception with Jetson inference and mesh uplink for route planning.

## Outcome

Autonomous last-mile rover — ROS2 navigation, obstacle avoidance, mesh route uplink.

## Hardware (bill of materials)

- [ ] ROSMASTER R2 ROS2 rover base
- [ ] NVIDIA Jetson Orin Nano Super
- [ ] RPLIDAR A1M8
- [ ] Luxonis OAK-D Lite
- [ ] Cytron MD13S motor driver
- [ ] LILYGO T-Beam Meshtastic (route comms)
- [ ] Emergency stop + fused rails

Est. budget: **~$1,100–$1,600**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].

> [!warning] Aegis-Hold
> This build has physical autonomy (flight, drive or actuation). The spec stages all physical autonomy behind the Aegis-Hold safety gate. See [[Physical AI Build Spec — Safety and Network Isolation]].

## Related vault notes

- [[Ground Vector]]
- [[Ground Vector Fleet]]
