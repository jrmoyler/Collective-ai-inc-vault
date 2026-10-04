---
title: Debug Palm Strap
cost: ~$105-$175
tags:
- wearable
- physical-ai
- binary-loom
- hand-strap
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Hand Strap
cost_low: 105
division: Binary Loom
cost_high: 175
data_class: standard internal
form_factor: hand strap
catalog_entry: 39
division_status: operating
---
# Debug Palm Strap

**Hand Strap** for [[Binary Loom Division]] · budget **~$105-$175** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Hand strap with tactile shortcuts for oscilloscope screenshots, logic captures, and test annotations.

## Spec
| Field | Value |
|---|---|
| Form factor | hand strap |
| Catalog category | Hand Strap |
| Entity | Binary Loom (Digital Infrastructure and Developer Tools) |
| Budget | ~$105-$175 |
| Industrial design | Teal strap with raised button geometry. |
| Data class | standard internal |

## Sensors, signals and outputs
- Button macros
- Haptic result
- Motion marker

## Bill of materials
| # | Part |
|---|---|
| 1 | Nano 33 BLE Sense |
| 2 | Tactile switches |
| 3 | DRV2605L |
| 4 | LiPo |
| 5 | Flexible TPU |

The catalog prices the whole build at **~$105-$175**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Lab notebook, Knowledge Keeper, ticketing system.

Linked notes: [[Director_Binary_Loom]], [[Knowledge_Keeper]]

## Safety gate and data handling
- **Safety gate:** No direct power switching from strap.
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
- Division: [[Binary Loom Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
