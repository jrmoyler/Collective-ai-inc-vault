---
title: Reaction Arm Band
cost: ~$120-$190
tags:
- wearable
- physical-ai
- kinetic-edge
- upper-arm-band
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Upper-Arm Band
cost_low: 120
division: Kinetic Edge
cost_high: 190
data_class: standard internal
form_factor: upper-arm band
catalog_entry: 47
division_status: chartered
---
# Reaction Arm Band

**Upper-Arm Band** for [[Kinetic Edge Division]] · budget **~$120-$190** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Upper-arm performance band for sprint starts, reaction drills, and load cueing.

## Spec
| Field | Value |
|---|---|
| Form factor | upper-arm band |
| Catalog category | Upper-Arm Band |
| Entity | Kinetic Edge (Sports Technology and Human Performance) |
| Budget | ~$120-$190 |
| Industrial design | Green armband with removable electronics capsule. |
| Data class | standard internal |

## Sensors, signals and outputs
- Arm acceleration
- Haptic start cue
- BLE upload

## Bill of materials
| # | Part |
|---|---|
| 1 | Nano 33 BLE Sense |
| 2 | DRV2605L |
| 3 | LiPo |
| 4 | Elastic armband cradle |

The catalog prices the whole build at **~$120-$190**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Apex Motion Cage, training load recommendation.

Linked notes: [[Director_Kinetic_Edge]], [[Apex System]]

## Safety gate and data handling
- **Safety gate:** Coach-supervised training only.
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
- Division: [[Kinetic Edge Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
