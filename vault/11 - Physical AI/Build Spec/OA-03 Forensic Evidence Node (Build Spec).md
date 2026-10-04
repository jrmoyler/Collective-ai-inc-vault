---
title: OA-03 Forensic Evidence Node (Build Spec)
id: OA-03
cost: ~$560–$760
tags:
- physical-ai
- build-spec
- hardware
- obsidian-arc
- jetson
type: build-spec
owner: JR Moyler (Hataalii)
phase: prototype
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
cost_low: 560
division: Obsidian Arc
cost_high: 760
division_status: operating
---
# OA-03 Forensic Evidence Node (Build Spec)

*Capture, hash, preserve — on premises.*

**Division:** [[Obsidian Arc Division]] (operating) · **Director:** [[Director_Obsidian_Arc]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `OA-03` |
| Product | Forensic Evidence Node |
| Est. budget | ~$560–$760 |
| Parts listed | 6 |
| Status | Specified in build spec (prototype to working product) |

## What it is

A dedicated 64MP camera + Jetson + encrypted NVMe node for capturing and preserving forensic-grade evidence images. All captures are hashed on-device and written to an air-gapped NAS partition.

## Outcome

Forensic capture station — 64MP evidence imaging, on-device hashing, encrypted air-gapped storage.

## Hardware (bill of materials)

- [ ] NVIDIA Jetson Orin Nano Super
- [ ] Arducam 64MP Hawkeye Camera
- [ ] Pi M.2 HAT+ + 2TB NVMe (encrypted)
- [ ] Raspberry Pi 5 (controller)
- [ ] Synology NAS air-gapped partition
- [ ] 3D-printed Bambu P1S forensic case enclosure

Est. budget: **~$560–$760**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].
