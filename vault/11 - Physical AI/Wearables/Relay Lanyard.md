---
title: Relay Lanyard
cost: ~$120-$200
tags:
- wearable
- physical-ai
- aether-link
- lanyard
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Lanyard
cost_low: 120
division: Aether Link
cost_high: 200
data_class: standard internal
form_factor: lanyard
catalog_entry: 63
division_status: chartered
---
# Relay Lanyard

**Lanyard** for [[Aether Link Division]] · budget **~$120-$200** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Portable comms lanyard for field operators controlling LoRa check-ins and mesh pings.

## Spec
| Field | Value |
|---|---|
| Form factor | lanyard |
| Catalog category | Lanyard |
| Entity | Aether Link (Connectivity and Communications) |
| Budget | ~$120-$200 |
| Industrial design | Mint lanyard module with signal-ring icon. |
| Data class | standard internal |

## Sensors, signals and outputs
- Ping
- Route check
- Haptic status
- GPS via paired mesh

## Bill of materials
| # | Part |
|---|---|
| 1 | Circuit Playground Bluefruit |
| 2 | LILYGO T-Beam paired |
| 3 | LiPo |
| 4 | Haptic |
| 5 | Buttons |

The catalog prices the whole build at **~$120-$200**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Meshtastic/MQTT bridge, Aether dashboard.

Linked notes: [[Director_Aether_Link]], [[The Mesh Network]]

## Safety gate and data handling
- **Safety gate:** Location sharing session-bound.
- **Data class:** standard internal
- Physical autonomy stays staged under Aegis-Hold until testing, human review, logging and deployment safety checks are complete.

## Deployment gate
Steps from the catalog build governance rules ([[Wearable Catalog — Build Governance]]):
- [ ] Assign device ID, owner, division, firmware version, physical label and registry entry
- [ ] Start on VLAN 80 Quarantine
- [ ] Pass Binary Loom QA
- [ ] Pass Aegis review ([[Aegis Protocol]])
- [ ] LiPo: fire-safe charging, thermal monitoring where possible, labeled storage

## Related
- Division: [[Aether Link Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
