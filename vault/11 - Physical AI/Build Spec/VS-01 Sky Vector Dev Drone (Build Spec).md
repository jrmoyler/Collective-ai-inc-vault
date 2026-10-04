---
title: VS-01 Sky Vector Dev Drone (Build Spec)
id: VS-01
cost: ~$900–$1,300
tags:
- physical-ai
- build-spec
- hardware
- vectorshift
- drone
- aegis-hold
- jetson
- lora-mesh
type: build-spec
owner: JR Moyler (Hataalii)
phase: prototype
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
cost_low: 900
division: VectorShift
cost_high: 1300
division_status: chartered
---
# VS-01 Sky Vector Dev Drone (Build Spec)

*First flight, first autonomy.*

**Division:** [[VectorShift Division]] (chartered, not operating) · **Director:** [[Director_VectorShift]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `VS-01` |
| Product | Sky Vector Dev Drone |
| Est. budget | ~$900–$1,300 |
| Parts listed | 7 |
| Status | Specified in build spec (prototype to working product) |

## What it is

Vector Shift's PX4/ArduPilot development platform for autonomous flight experiments, telemetry logging, and payload sensor integration.

## Outcome

PX4 autonomous drone — YOLO navigation, waypoint flight, mesh telemetry, safe dev platform.

## Hardware (bill of materials)

- [ ] Holybro X500 V2 PX4 Dev Kit
- [ ] Pixhawk 6C
- [ ] NVIDIA Jetson Orin Nano Super (companion)
- [ ] Pi AI Camera
- [ ] LILYGO T-Beam Meshtastic (mesh telemetry)
- [ ] LiPo battery + XT60
- [ ] Emergency stop + ground station Pi 5

Est. budget: **~$900–$1,300**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].

> [!warning] Aegis-Hold
> This build has physical autonomy (flight, drive or actuation). The spec stages all physical autonomy behind the Aegis-Hold safety gate. See [[Physical AI Build Spec — Safety and Network Isolation]].

## Related vault notes

- [[Sky Vector]]
- [[Sky Vector Aerial Delivery]]
