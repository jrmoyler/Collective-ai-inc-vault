---
title: Builder Command Ring
cost: ~$95-$155
tags:
- wearable
- physical-ai
- binary-loom
- smart-ring
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Smart Ring
cost_low: 95
division: Binary Loom
cost_high: 155
data_class: standard internal
form_factor: smart ring
catalog_entry: 36
division_status: operating
---
# Builder Command Ring

**Smart Ring** for [[Binary Loom Division]] · budget **~$95-$155** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Engineer ring for flashing, test start/stop, build queue markers, and hardware lab approvals.

## Spec
| Field | Value |
|---|---|
| Form factor | smart ring |
| Catalog category | Smart Ring |
| Entity | Binary Loom (Digital Infrastructure and Developer Tools) |
| Budget | ~$95-$155 |
| Industrial design | Electric-teal ring with terminal-glyph groove. |
| Data class | standard internal |

## Sensors, signals and outputs
- Tap command
- Haptic test result
- BLE identity

## Bill of materials
| # | Part |
|---|---|
| 1 | Feather nRF52840 Sense |
| 2 | DRV2605L |
| 3 | Capacitive pad |
| 4 | LiPo |
| 5 | Rugged PETG ring |

The catalog prices the whole build at **~$95-$155**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Binary Loom build runner, firmware flasher, Knowledge Keeper.

Linked notes: [[Director_Binary_Loom]], [[Knowledge_Keeper]]

## Safety gate and data handling
- **Safety gate:** Dangerous bench actions require console confirmation.
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
