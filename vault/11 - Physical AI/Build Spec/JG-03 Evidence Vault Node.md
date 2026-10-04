---
title: JG-03 Evidence Vault Node
id: JG-03
cost: ~$350–$500
tags:
- physical-ai
- build-spec
- hardware
- juris-guard
type: build-spec
owner: JR Moyler (Hataalii)
phase: prototype
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
cost_low: 350
division: Juris Guard
cost_high: 500
division_status: operating
---
# JG-03 Evidence Vault Node

*Air-gapped, hashed, preserved.*

**Division:** [[Juris Guard Division]] (operating) · **Director:** [[Director_Juris_Guard]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `JG-03` |
| Product | Evidence Vault Node |
| Est. budget | ~$350–$500 |
| Parts listed | 6 |
| Status | Specified in build spec (prototype to working product) |

## What it is

An air-gapped storage node for legal evidence preservation. All files are hashed on-device at ingestion, written to an encrypted NAS partition, and never touch the main VLAN.

## Outcome

Air-gapped evidence vault — on-device hashing, encrypted isolated storage, document capture.

## Hardware (bill of materials)

- [ ] Raspberry Pi 5 8GB (air-gap controller)
- [ ] Pi M.2 HAT+ + 2TB NVMe (encrypted)
- [ ] Synology NAS air-gapped partition
- [ ] Arducam 64MP Hawkeye Camera (document capture)
- [ ] 3D-printed Bambu P1S secure enclosure
- [ ] Labeled Cat6A drop to VLAN 80 Quarantine

Est. budget: **~$350–$500**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].
