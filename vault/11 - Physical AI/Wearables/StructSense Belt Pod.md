---
title: StructSense Belt Pod
cost: ~$110-$180
tags:
- wearable
- physical-ai
- terra-axis
- belt-lumbar-pod
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Belt/Lumbar Pod
cost_low: 110
division: Terra Axis
cost_high: 180
data_class: standard internal
form_factor: belt/lumbar pod
catalog_entry: 30
division_status: chartered
---
# StructSense Belt Pod

**Belt/Lumbar Pod** for [[Terra Axis Division]] · budget **~$110-$180** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Belt pod for field inspectors logging ladder use, crawlspace movement, and task posture.

## Spec
| Field | Value |
|---|---|
| Form factor | belt/lumbar pod |
| Catalog category | Belt/Lumbar Pod |
| Entity | Terra Axis (Real Estate and Physical Infrastructure) |
| Budget | ~$110-$180 |
| Industrial design | Rugged belt pod with blue rubber bumper. |
| Data class | standard internal |

## Sensors, signals and outputs
- Motion profile
- Posture proxy
- Haptic safety cue
- BLE upload

## Bill of materials
| # | Part |
|---|---|
| 1 | Nano 33 BLE Sense |
| 2 | IMU BNO085 |
| 3 | DRV2605L |
| 4 | LiPo |
| 5 | TPU belt holster |

The catalog prices the whole build at **~$110-$180**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Terra field workflow, safety report, Knowledge Keeper.

Linked notes: [[Director_Terra_Axis]], [[Knowledge_Keeper]]

## Safety gate and data handling
- **Safety gate:** Work-safety assist only.
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
- Division: [[Terra Axis Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
