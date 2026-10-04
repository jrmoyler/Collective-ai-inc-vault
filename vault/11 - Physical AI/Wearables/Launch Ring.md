---
title: Launch Ring
cost: ~$95-$150
tags:
- wearable
- physical-ai
- signal-velocity
- smart-ring
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Smart Ring
cost_low: 95
division: Signal Velocity
cost_high: 150
data_class: standard internal
form_factor: smart ring
catalog_entry: 86
division_status: operating
---
# Launch Ring

**Smart Ring** for [[Signal Velocity Division]] · budget **~$95-$150** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Campaign lead ring for launch-stage haptics, conversion alerts, and approval moments.

## Spec
| Field | Value |
|---|---|
| Form factor | smart ring |
| Catalog category | Smart Ring |
| Entity | Signal Velocity (Growth Intelligence and Performance Marketing) |
| Budget | ~$95-$150 |
| Industrial design | Coral ring with arrow/play notch. |
| Data class | standard internal |

## Sensors, signals and outputs
- Launch alert
- Approve marker
- Haptic KPI cue

## Bill of materials
| # | Part |
|---|---|
| 1 | Feather nRF52840 Sense |
| 2 | DRV2605L |
| 3 | Tap pad |
| 4 | LiPo |

The catalog prices the whole build at **~$95-$150**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Signal Velocity campaign engine, analytics dashboard.

Linked notes: [[Director_Signal_Velocity]]

## Safety gate and data handling
- **Safety gate:** No auto-publish from ring without review.
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
