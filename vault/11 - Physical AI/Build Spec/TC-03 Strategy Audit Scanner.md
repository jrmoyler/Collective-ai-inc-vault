---
title: TC-03 Strategy Audit Scanner
id: TC-03
cost: ~$500–$680
tags:
- physical-ai
- build-spec
- hardware
- the-collective
- jetson
type: build-spec
owner: JR Moyler (Hataalii)
phase: prototype
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
cost_low: 500
division: The Collective
cost_high: 680
division_status: operating
---
# TC-03 Strategy Audit Scanner

*Document intelligence at the consulting desk.*

**Division:** [[The Collective Division]] (operating) · **Director:** [[Director_The_Collective]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `TC-03` |
| Product | Strategy Audit Scanner |
| Est. budget | ~$500–$680 |
| Parts listed | 6 |
| Status | Specified in build spec (prototype to working product) |

## What it is

A high-resolution camera + Jetson node for scanning client documents, whiteboards, and frameworks. OCR processes them on-device and sends structured data to the local AI for immediate analysis.

## Outcome

On-premises document intelligence — 64MP scan, local OCR, AI-structured output, encrypted storage.

## Hardware (bill of materials)

- [ ] NVIDIA Jetson Orin Nano Super
- [ ] Arducam 64MP Hawkeye Camera
- [ ] Raspberry Pi 5 (UI controller)
- [ ] Whisplay HAT
- [ ] Pi M.2 HAT+ + 1TB NVMe
- [ ] 3D-printed Bambu P1S document tray

Est. budget: **~$500–$680**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].
