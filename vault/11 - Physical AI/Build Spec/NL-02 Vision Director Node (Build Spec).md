---
title: NL-02 Vision Director Node (Build Spec)
id: NL-02
cost: ~$650–$880
tags:
- physical-ai
- build-spec
- hardware
- nexus-labs
- jetson
type: build-spec
owner: JR Moyler (Hataalii)
phase: prototype
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
cost_low: 650
division: Nexus Labs
cost_high: 880
division_status: operating
---
# NL-02 Vision Director Node (Build Spec)

*Every frame captured, analyzed, and filed.*

**Division:** [[Nexus Labs Division]] (operating) · **Director:** [[Director_Nexus_Labs]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `NL-02` |
| Product | Vision Director Node |
| Est. budget | ~$650–$880 |
| Parts listed | 7 |
| Status | Specified in build spec (prototype to working product) |

## What it is

A multi-camera director node for Nexus Labs content production. Manages 4 camera angles simultaneously, performs on-device AI scene detection and tagging, and pushes indexed clips to the NAS for post-production.

## Outcome

4-camera AI director node — scene detection, clip tagging, NAS archive, post-production pipeline.

## Hardware (bill of materials)

- [ ] Raspberry Pi 5 8GB (×2 — dual controller)
- [ ] Pi Camera Module 3 (×2)
- [ ] Arducam 64MP Hawkeye Camera (hero close-up)
- [ ] Pi AI Camera (scene tagging)
- [ ] NVIDIA Jetson Orin Nano Super (inference + tagging)
- [ ] Pi M.2 HAT+ + 2TB NVMe
- [ ] 3D-printed Bambu P1S multi-mount rig

Est. budget: **~$650–$880**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].
