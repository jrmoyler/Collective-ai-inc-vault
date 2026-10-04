---
title: P-03 Mesh Sentinel Array (Build Spec)
id: P-03
cost: ~$400–$600
tags:
- physical-ai
- build-spec
- hardware
- parent-company
- lora-mesh
type: build-spec
owner: JR Moyler (Hataalii)
phase: prototype
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
cost_low: 400
division: Parent (Collective AI Inc)
cost_high: 600
---
# P-03 Mesh Sentinel Array (Build Spec)

*The Foundry's invisible nervous system — every signal accounted for.*

**Entity:** Parent company — [[Collective AI — Company Charter]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `P-03` |
| Product | Mesh Sentinel Array |
| Est. budget | ~$400–$600 |
| Parts listed | 7 |
| Status | Specified in build spec (prototype to working product) |

## What it is

The parent company's off-grid communications backbone. A distributed LoRa mesh network spanning the entire Foundry, yard, and mobile field units. Reports device heartbeats, GPS positions, and agent status to the Aegis Command Station.

## Outcome

Off-grid mesh telemetry backbone — device heartbeat monitoring, GPS tracking, ISP-failover comms.

## Hardware (bill of materials)

- [ ] LILYGO T-Beam Meshtastic nodes (×4 indoor/outdoor)
- [ ] Heltec V3 Meshtastic nodes (×6 room relays)
- [ ] LILYGO T-Deck Meshtastic (field terminal with keyboard)
- [ ] Raspberry Pi 5 (MQTT bridge gateway)
- [ ] Waterproof 3D-printed Bambu P1S ASA node enclosures
- [ ] 12V battery packs + solar input for outdoor nodes
- [ ] Directional LoRa antennas

Est. budget: **~$400–$600**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].

## Connected builds

- [[P-01 Aegis Command Station (Build Spec)]]
