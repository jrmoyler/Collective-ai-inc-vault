---
title: NN-03 Visa Intel Terminal
id: NN-03
cost: ~$520–$700
tags:
- physical-ai
- build-spec
- hardware
- nomad-nexus
- jetson
type: build-spec
owner: JR Moyler (Hataalii)
phase: prototype
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
cost_low: 520
division: Nomad Nexus
cost_high: 700
division_status: chartered
---
# NN-03 Visa Intel Terminal

*Global residency intelligence, locally processed.*

**Division:** [[Nomad Nexus Division]] (chartered, not operating) · **Director:** [[Director_Nomad_Nexus]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `NN-03` |
| Product | Visa Intel Terminal |
| Est. budget | ~$520–$700 |
| Parts listed | 6 |
| Status | Specified in build spec (prototype to working product) |

## What it is

A dedicated document scanning and AI analysis terminal for visa, residency, and relocation document processing. Runs entirely on-premises using the Nomad Nexus Mac mini.

## Outcome

On-premises relocation intelligence — document scan, AI analysis, visa requirement processing.

## Hardware (bill of materials)

- [ ] Raspberry Pi 5 8GB (controller)
- [ ] NVIDIA Jetson Orin Nano Super (inference)
- [ ] Arducam 64MP Hawkeye Camera (document scan)
- [ ] Whisplay HAT
- [ ] Pi M.2 HAT+ + 1TB NVMe
- [ ] 3D-printed Bambu P1S document tray

Est. budget: **~$520–$700**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].

## Related vault notes

- [[Visa Intelligence Database]]
