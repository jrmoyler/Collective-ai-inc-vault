---
title: VH-03 Bio-Digital Twin Station
id: VH-03
cost: ~$600–$800 (beyond Mac mini infrastructure)
tags:
- physical-ai
- build-spec
- hardware
- vital-helix
- jetson
- mac-mini
type: build-spec
owner: JR Moyler (Hataalii)
phase: prototype
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
cost_low: 600
division: Vital Helix
cost_high: 800
division_status: chartered
---
# VH-03 Bio-Digital Twin Station

*Your digital twin runs here — locally, privately.*

**Division:** [[Vital Helix Division]] (chartered, not operating) · **Director:** [[Director_Vital_Helix]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `VH-03` |
| Product | Bio-Digital Twin Station |
| Est. budget | ~$600–$800 (beyond Mac mini infrastructure) |
| Parts listed | 7 |
| Status | Specified in build spec (prototype to working product) |

## What it is

A dedicated Mac mini inference station running Vital Helix's Bio-Digital Twin model locally. Ingests wearable sensor streams, generates personalized health simulations, and stores all data on-premises.

## Outcome

On-premises Bio-Digital Twin — local health model inference, private data storage, wearable data ingestion.

## Hardware (bill of materials)

- [ ] Mac mini M4 Pro 48GB (Vital Helix node)
- [ ] NVIDIA Jetson Orin Nano Super (sensor gateway)
- [ ] Raspberry Pi 5 (display/UI)
- [ ] Whisplay HAT
- [ ] Pi M.2 HAT+ + 2TB NVMe
- [ ] Synology NAS share (encrypted partition)
- [ ] 3D-printed Bambu P1S workstation enclosure

Est. budget: **~$600–$800 (beyond Mac mini infrastructure)**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].

## Related vault notes

- [[Bio-Digital Twin]]
