---
title: OA-01 Cipher Guardian Node
id: OA-01
cost: ~$2,200–$3,000
tags:
- physical-ai
- build-spec
- hardware
- obsidian-arc
type: build-spec
owner: JR Moyler (Hataalii)
phase: prototype
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
cost_low: 2200
division: Obsidian Arc
cost_high: 3000
division_status: operating
---
# OA-01 Cipher Guardian Node

*Zero-trust enforcement in a rack.*

**Division:** [[Obsidian Arc Division]] (operating) · **Director:** [[Director_Obsidian_Arc]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `OA-01` |
| Product | Cipher Guardian Node |
| Est. budget | ~$2,200–$3,000 |
| Parts listed | 8 |
| Status | Specified in build spec (prototype to working product) |

## What it is

Obsidian Arc's network security enforcement hardware. Runs UniFi controller, IDS/IPS, VLAN segmentation, and camera NVR — isolated from all department nodes for audit integrity.

## Outcome

Zero-trust Foundry network — VLAN segmentation, IDS/IPS, camera NVR, hardware audit logging.

## Hardware (bill of materials)

- [ ] UniFi Dream Machine Pro Max
- [ ] UniFi Enterprise XG 24
- [ ] UniFi Enterprise 24 PoE
- [ ] UniFi U7 Pro Max
- [ ] Raspberry Pi 5 (audit logger)
- [ ] Logic analyzer Saleae clone
- [ ] CyberPower Rackmount UPS 1500VA
- [ ] Rack + PDU + patch panel

Est. budget: **~$2,200–$3,000**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].
