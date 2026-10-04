---
title: Neighborhood Safety Clip
cost: ~$90-$145
tags:
- wearable
- physical-ai
- civic-core
- garment-clip
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Garment Clip
cost_low: 90
division: Civic Core
cost_high: 145
data_class: civic
form_factor: garment clip
catalog_entry: 58
division_status: chartered
---
# Neighborhood Safety Clip

**Garment Clip** for [[Civic Core Division]] · budget **~$90-$145** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Clip-on event safety device for marshals and volunteers during public programs.

## Spec
| Field | Value |
|---|---|
| Form factor | garment clip |
| Catalog category | Garment Clip |
| Entity | Civic Core (Non-Profit Civic Infrastructure) |
| Budget | ~$90-$145 |
| Industrial design | Hope-blue clip with clear emergency button. |
| Data class | civic |

## Sensors, signals and outputs
- Check-in
- Motion state
- Haptic broadcast
- BLE

## Bill of materials
| # | Part |
|---|---|
| 1 | Nano 33 BLE Sense |
| 2 | DRV2605L |
| 3 | LiPo |
| 4 | TPU clip |

The catalog prices the whole build at **~$90-$145**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Event command, Obsidian Arc support when needed.

Linked notes: [[Director_Civic_Core]], [[Obsidian Arc Division]]

## Safety gate and data handling
- **Safety gate:** Emergency escalation only with human confirmation.
- **Data class:** civic — stays local/encrypted unless a reviewed workflow permits export.
- Physical autonomy stays staged under Aegis-Hold until testing, human review, logging and deployment safety checks are complete.

## Deployment gate
Steps from the catalog build governance rules ([[Wearable Catalog — Build Governance]]):
- [ ] Assign device ID, owner, division, firmware version, physical label and registry entry
- [ ] Start on VLAN 80 Quarantine
- [ ] Pass Binary Loom QA
- [ ] Pass Aegis review ([[Aegis Protocol]])
- [ ] LiPo: fire-safe charging, thermal monitoring where possible, labeled storage

## Related
- Division: [[Civic Core Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
