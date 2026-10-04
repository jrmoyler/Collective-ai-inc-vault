---
title: SV-02 Conversion Capture Node
id: SV-02
cost: ~$310–$420
tags:
- physical-ai
- build-spec
- hardware
- signal-velocity
type: build-spec
owner: JR Moyler (Hataalii)
phase: prototype
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
cost_low: 310
division: Signal Velocity
cost_high: 420
division_status: operating
---
# SV-02 Conversion Capture Node

*Every touchpoint measured, every funnel stage logged.*

**Division:** [[Signal Velocity Division]] (operating) · **Director:** [[Director_Signal_Velocity]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `SV-02` |
| Product | Conversion Capture Node |
| Est. budget | ~$310–$420 |
| Parts listed | 6 |
| Status | Specified in build spec (prototype to working product) |

## What it is

A Pi 5 + camera node deployed at physical touchpoints (check-in desks, kiosks, event entrances) to capture conversion events, scan QR codes, and log interactions to the Signal Velocity Mac mini.

## Outcome

Physical conversion tracking — QR scan, presence detection, touchpoint event logging.

## Hardware (bill of materials)

- [ ] Raspberry Pi 5 8GB
- [ ] Pi Camera Module 3 (QR + presence)
- [ ] Pi AI Camera (Sony IMX500, on-sensor scan)
- [ ] Whisplay HAT
- [ ] Pi M.2 HAT+ + 512GB NVMe
- [ ] 3D-printed Bambu A1 touchpoint enclosure

Est. budget: **~$310–$420**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].
