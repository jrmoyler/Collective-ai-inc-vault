---
title: HL-02 Instructor Capture Node (Build Spec)
id: HL-02
cost: ~$600–$820
tags:
- physical-ai
- build-spec
- hardware
- hybrid-living
- jetson
type: build-spec
owner: JR Moyler (Hataalii)
phase: prototype
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
cost_low: 600
division: Hybrid Living
cost_high: 820
division_status: operating
---
# HL-02 Instructor Capture Node (Build Spec)

*Capture the lesson, surface the knowledge.*

**Division:** [[Hybrid Living Division]] (operating) · **Director:** [[Director_Hybrid_Living]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `HL-02` |
| Product | Instructor Capture Node |
| Est. budget | ~$600–$820 |
| Parts listed | 7 |
| Status | Specified in build spec (prototype to working product) |

## What it is

A dual-camera, far-field audio capture node for recording and transcribing instructor sessions. Feeds a local AI that extracts key concepts, generates study guides, and indexes content into the Knowledge Keeper vault.

## Outcome

Instructor session capture — dual-camera recording, local transcription, auto-generated study content.

## Hardware (bill of materials)

- [ ] Raspberry Pi 5 8GB (×2 dual-camera)
- [ ] Pi Camera Module 3 Wide
- [ ] Pi Global Shutter Camera
- [ ] ReSpeaker 4-Mic Array v2.0
- [ ] NVIDIA Jetson Orin Nano Super (transcription)
- [ ] Pi M.2 HAT+ + 2TB NVMe
- [ ] 3D-printed Bambu P1S ceiling/desk mount

Est. budget: **~$600–$820**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].

## Connected builds

- [[ZF-02 Knowledge Keeper Vault]]

## Related vault notes

- [[Knowledge Keeper]]
