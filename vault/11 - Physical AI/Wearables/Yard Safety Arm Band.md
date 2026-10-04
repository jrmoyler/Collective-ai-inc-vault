---
title: Yard Safety Arm Band
cost: ~$115-$185
tags:
- wearable
- physical-ai
- vectorshift
- upper-arm-band
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Upper-Arm Band
cost_low: 115
division: VectorShift
cost_high: 185
data_class: standard internal
form_factor: upper-arm band
catalog_entry: 75
division_status: chartered
---
# Yard Safety Arm Band

**Upper-Arm Band** for [[VectorShift Division]] · budget **~$115-$185** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
High-visibility armband for logistics yards, loading areas, and route testing.

## Spec
| Field | Value |
|---|---|
| Form factor | upper-arm band |
| Catalog category | Upper-Arm Band |
| Entity | VectorShift (Autonomous Logistics and Aerial Mobility) |
| Budget | ~$115-$185 |
| Industrial design | Silver/reflective armband. |
| Data class | standard internal |

## Sensors, signals and outputs
- Motion state
- Proximity cue
- Haptic alert
- BLE

## Bill of materials
| # | Part |
|---|---|
| 1 | Nano 33 BLE Sense |
| 2 | DRV2605L |
| 3 | LiPo |
| 4 | Reflective strap |

The catalog prices the whole build at **~$115-$185**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Vector safety workflow, Obsidian Arc.

Linked notes: [[Director_VectorShift]], [[Obsidian Arc Division]]

## Safety gate and data handling
- **Safety gate:** Advisory safety cue, not a substitute for PPE.
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
- Division: [[VectorShift Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
