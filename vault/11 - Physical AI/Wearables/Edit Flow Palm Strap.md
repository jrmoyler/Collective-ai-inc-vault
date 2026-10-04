---
title: Edit Flow Palm Strap
cost: ~$105-$170
tags:
- wearable
- physical-ai
- nexus-labs
- hand-strap-controller
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Hand Strap Controller
cost_low: 105
division: Nexus Labs
cost_high: 170
data_class: standard internal
form_factor: hand strap controller
catalog_entry: 25
division_status: operating
---
# Edit Flow Palm Strap

**Hand Strap Controller** for [[Nexus Labs Division]] · budget **~$105-$170** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Palm strap that lets creators drop markers while filming, editing, or performing.

## Spec
| Field | Value |
|---|---|
| Form factor | hand strap controller |
| Catalog category | Hand Strap Controller |
| Entity | Nexus Labs (Media, Entertainment, and Creative) |
| Budget | ~$105-$170 |
| Industrial design | Crimson/black strap with raised tactile controls. |
| Data class | standard internal |

## Sensors, signals and outputs
- Gesture/button markers
- Haptic metronome
- BLE command

## Bill of materials
| # | Part |
|---|---|
| 1 | Nano 33 BLE Sense |
| 2 | Tactile switches |
| 3 | DRV2605L |
| 4 | LiPo |
| 5 | Flexible TPU strap |

The catalog prices the whole build at **~$105-$170**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Editing queue, content calendar, clip marker API.

Linked notes: [[Director_Nexus_Labs]]

## Safety gate and data handling
- **Safety gate:** User-controlled commands only.
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
- Division: [[Nexus Labs Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
