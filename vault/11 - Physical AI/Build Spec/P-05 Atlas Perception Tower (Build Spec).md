---
title: P-05 Atlas Perception Tower (Build Spec)
id: P-05
cost: ~$850–$1,100
tags:
- physical-ai
- build-spec
- hardware
- parent-company
- jetson
type: build-spec
owner: JR Moyler (Hataalii)
phase: prototype
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
cost_low: 850
division: Parent (Collective AI Inc)
cost_high: 1100
---
# P-05 Atlas Perception Tower (Build Spec)

*The Foundry sees itself — full-floor spatial awareness.*

**Entity:** Parent company — [[Collective AI — Company Charter]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `P-05` |
| Product | Atlas Perception Tower |
| Est. budget | ~$850–$1,100 |
| Parts listed | 8 |
| Status | Specified in build spec (prototype to working product) |

## What it is

Parent-level physical security and spatial awareness station. A mounted perception mast combining LiDAR, depth, RGB, and AI cameras with a Jetson inference engine. Feeds the Obsidian Arc security node and the Aegis Command Station simultaneously.

## Outcome

Full-floor spatial intelligence — person/object detection, SLAM mapping, Aegis security data feed.

## Hardware (bill of materials)

- [ ] NVIDIA Jetson Orin Nano Super Developer Kit
- [ ] RPLIDAR A1M8 (360-degree 2D LiDAR)
- [ ] Luxonis OAK-D Lite (depth + RGB + neural inference)
- [ ] Raspberry Pi AI Camera (Sony IMX500, on-sensor AI)
- [ ] RealSense D435i (room SLAM + depth)
- [ ] Raspberry Pi M.2 HAT+ + NVMe SSD
- [ ] 3D-printed Prusa CORE One+ perception mast
- [ ] PoE injector (UniFi PoE switch powered)

Est. budget: **~$850–$1,100**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].

## Connected builds

- [[P-01 Aegis Command Station (Build Spec)]]

## Related vault notes

- [[Obsidian Arc Division]]
