---
title: Cable Tech Sleeve Pod
cost: ~$105-$165
tags:
- wearable
- physical-ai
- binary-loom
- sleeve-module
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Sleeve Module
cost_low: 105
division: Binary Loom
cost_high: 165
data_class: standard internal
form_factor: sleeve module
catalog_entry: 38
division_status: operating
---
# Cable Tech Sleeve Pod

**Sleeve Module** for [[Binary Loom Division]] · budget **~$105-$165** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Forearm sleeve module for technicians receiving wiring-test status and safety prompts.

## Spec
| Field | Value |
|---|---|
| Form factor | sleeve module |
| Catalog category | Sleeve Module |
| Entity | Binary Loom (Digital Infrastructure and Developer Tools) |
| Budget | ~$105-$165 |
| Industrial design | Teal-on-black serviceable sled with heat-set inserts. |
| Data class | standard internal |

## Sensors, signals and outputs
- Haptic warnings
- Motion context
- Timer
- BLE receive

## Bill of materials
| # | Part |
|---|---|
| 1 | Nano 33 BLE Sense |
| 2 | DRV2605L |
| 3 | LiPo |
| 4 | TPU sleeve sled |

The catalog prices the whole build at **~$105-$165**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Wire bench workflow, safety checklist.

Linked notes: [[Director_Binary_Loom]]

## Safety gate and data handling
- **Safety gate:** Bench isolation rules enforced.
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
