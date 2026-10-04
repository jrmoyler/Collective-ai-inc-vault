---
title: VS-03 Logistics Mesh Node (Build Spec)
id: VS-03
cost: ~$200–$310
tags:
- physical-ai
- build-spec
- hardware
- vectorshift
- lora-mesh
type: build-spec
owner: JR Moyler (Hataalii)
phase: prototype
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
cost_low: 200
division: VectorShift
cost_high: 310
division_status: chartered
---
# VS-03 Logistics Mesh Node (Build Spec)

*Every package tracked, every route logged.*

**Division:** [[VectorShift Division]] (chartered, not operating) · **Director:** [[Director_VectorShift]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `VS-03` |
| Product | Logistics Mesh Node |
| Est. budget | ~$200–$310 |
| Parts listed | 6 |
| Status | Specified in build spec (prototype to working product) |

## What it is

A fixed LoRa mesh node deployed along logistics corridors for tracking Ground Vector and Sky Vector assets in real time. GPS-enabled, solar-powered, weatherproof.

## Outcome

Logistics tracking mesh — asset GPS logging, route monitoring, solar-powered outdoor deployment.

## Hardware (bill of materials)

- [ ] LILYGO T-Beam Meshtastic (GPS + LoRa)
- [ ] Raspberry Pi 5 (MQTT bridge)
- [ ] 12V battery + solar input
- [ ] Heltec V3 relay nodes (×2 corridor)
- [ ] Waterproof 3D-printed Bambu P1S ASA enclosure
- [ ] Directional LoRa antenna

Est. budget: **~$200–$310**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].

## Related vault notes

- [[Ground Vector]]
- [[Sky Vector]]
