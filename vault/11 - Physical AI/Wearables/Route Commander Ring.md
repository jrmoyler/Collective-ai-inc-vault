---
title: Route Commander Ring
cost: ~$95-$155
tags:
- wearable
- physical-ai
- vectorshift
- smart-ring
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Smart Ring
cost_low: 95
division: VectorShift
cost_high: 155
data_class: standard internal
form_factor: smart ring
catalog_entry: 71
division_status: chartered
---
# Route Commander Ring

**Smart Ring** for [[VectorShift Division]] · budget **~$95-$155** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Operator ring for route state acknowledgments, dock handoffs, and vehicle check-ins.

## Spec
| Field | Value |
|---|---|
| Form factor | smart ring |
| Catalog category | Smart Ring |
| Entity | VectorShift (Autonomous Logistics and Aerial Mobility) |
| Budget | ~$95-$155 |
| Industrial design | Velocity-silver ring with route-line engraving. |
| Data class | standard internal |

## Sensors, signals and outputs
- Route haptics
- Acknowledge tap
- BLE

## Bill of materials
| # | Part |
|---|---|
| 1 | Feather nRF52840 Sense |
| 2 | DRV2605L |
| 3 | Tap pad |
| 4 | LiPo |

The catalog prices the whole build at **~$95-$155**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Vector route planner, Ground/Sky Vector workflows.

Linked notes: [[Director_VectorShift]]

## Safety gate and data handling
- **Safety gate:** No direct vehicle control from ring.
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
