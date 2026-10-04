---
title: Harvester Glove Controller
cost: ~$130-$220
tags:
- wearable
- physical-ai
- gaia-synthesis
- smart-glove
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Smart Glove
cost_low: 130
division: Gaia Synthesis
cost_high: 220
data_class: standard internal
form_factor: smart glove
catalog_entry: 68
division_status: chartered
---
# Harvester Glove Controller

**Smart Glove** for [[Gaia Synthesis Division]] · budget **~$130-$220** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Fingerless glove for tagging harvest quality, plant rows, and robot-assist actions.

## Spec
| Field | Value |
|---|---|
| Form factor | smart glove |
| Catalog category | Smart Glove |
| Entity | Gaia Synthesis (AgriTech and Environmental Engineering) |
| Budget | ~$130-$220 |
| Industrial design | Green glove pod with washable mount. |
| Data class | standard internal |

## Sensors, signals and outputs
- Gesture marker
- Row tag
- Haptic confirm
- BLE

## Bill of materials
| # | Part |
|---|---|
| 1 | Nano 33 BLE Sense |
| 2 | Tactile switches |
| 3 | DRV2605L |
| 4 | LiPo |
| 5 | TPU glove module |

The catalog prices the whole build at **~$130-$220**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Gaia workflow, Animus Prime robot assist.

Linked notes: [[Director_Gaia_Synthesis]]

## Safety gate and data handling
- **Safety gate:** Manual commands only; robot assist stays gated.
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
- Division: [[Gaia Synthesis Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
