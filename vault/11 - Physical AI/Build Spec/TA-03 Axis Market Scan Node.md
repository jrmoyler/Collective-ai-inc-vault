---
title: TA-03 Axis Market Scan Node
id: TA-03
cost: ~$380–$500
tags:
- physical-ai
- build-spec
- hardware
- terra-axis
- lora-mesh
type: build-spec
owner: JR Moyler (Hataalii)
phase: prototype
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
cost_low: 380
division: Terra Axis
cost_high: 500
division_status: chartered
---
# TA-03 Axis Market Scan Node

*Property data at street level — the node that reads the market.*

**Division:** [[Terra Axis Division]] (chartered, not operating) · **Director:** [[Director_Terra_Axis]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `TA-03` |
| Product | Axis Market Scan Node |
| Est. budget | ~$380–$500 |
| Parts listed | 6 |
| Status | Specified in build spec (prototype to working product) |

## What it is

A field-deployable Pi node with high-resolution camera and LoRa mesh uplink for capturing property imagery, condition data, and GPS coordinates during site visits. Data syncs to the Terra Axis Mac mini on return.

## Outcome

Field property capture node — 64MP imagery, GPS logging, LoRa mesh uplink, site data sync.

## Hardware (bill of materials)

- [ ] Raspberry Pi 5 8GB
- [ ] Arducam 64MP Hawkeye Camera
- [ ] LILYGO T-Beam Meshtastic (GPS + LoRa)
- [ ] PiSugar 3 Plus Battery
- [ ] Pi M.2 HAT+ + 1TB NVMe
- [ ] 3D-printed Bambu A1 ruggedized field shell (TPU bumper)

Est. budget: **~$380–$500**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].

## Related vault notes

- [[Axis Market]]
- [[Axis Market Columbus]]
