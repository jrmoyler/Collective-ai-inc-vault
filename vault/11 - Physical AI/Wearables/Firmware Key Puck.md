---
title: Firmware Key Puck
cost: ~$70-$125
tags:
- wearable
- physical-ai
- binary-loom
- key-fob
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Key Fob
cost_low: 70
division: Binary Loom
cost_high: 125
data_class: standard internal
form_factor: key fob
catalog_entry: 37
division_status: operating
---
# Firmware Key Puck

**Key Fob** for [[Binary Loom Division]] · budget **~$70-$125** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Pocket key for unlocking firmware flash docks and tagging device batches.

## Spec
| Field | Value |
|---|---|
| Form factor | key fob |
| Catalog category | Key Fob |
| Entity | Binary Loom (Digital Infrastructure and Developer Tools) |
| Budget | ~$70-$125 |
| Industrial design | Teal circuit puck with physical serial field. |
| Data class | standard internal |

## Sensors, signals and outputs
- NFC identity
- Batch marker
- Haptic pass/fail

## Bill of materials
| # | Part |
|---|---|
| 1 | Circuit Playground Bluefruit |
| 2 | NFC tag |
| 3 | LiPo |
| 4 | Haptic motor |
| 5 | ASA shell |

The catalog prices the whole build at **~$70-$125**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Device registry, GitHub release workflow, Knowledge Keeper.

Linked notes: [[Director_Binary_Loom]], [[Knowledge_Keeper]]

## Safety gate and data handling
- **Safety gate:** No secrets stored in plaintext on-device.
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
