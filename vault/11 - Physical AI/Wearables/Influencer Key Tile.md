---
title: Influencer Key Tile
cost: ~$75-$130
tags:
- wearable
- physical-ai
- signal-velocity
- pocket-tile
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Pocket Tile
cost_low: 75
division: Signal Velocity
cost_high: 130
data_class: standard internal
form_factor: pocket tile
catalog_entry: 89
division_status: operating
---
# Influencer Key Tile

**Pocket Tile** for [[Signal Velocity Division]] · budget **~$75-$130** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Pocket tile for creators to mark hooks, objections, product mentions, and viral lines.

## Spec
| Field | Value |
|---|---|
| Form factor | pocket tile |
| Catalog category | Pocket Tile |
| Entity | Signal Velocity (Growth Intelligence and Performance Marketing) |
| Budget | ~$75-$130 |
| Industrial design | Flat coral tile with play-symbol texture. |
| Data class | standard internal |

## Sensors, signals and outputs
- Tap categories
- Haptic receipt
- BLE upload

## Bill of materials
| # | Part |
|---|---|
| 1 | Circuit Playground Bluefruit |
| 2 | Haptic |
| 3 | NFC |
| 4 | LiPo |
| 5 | Flat tile shell |

The catalog prices the whole build at **~$75-$130**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Content calendar, clip mining workflow.

Linked notes: [[Director_Signal_Velocity]]

## Safety gate and data handling
- **Safety gate:** Manual marker only.
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
- Division: [[Signal Velocity Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
