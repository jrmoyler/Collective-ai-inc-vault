---
title: Coach Cue Ring
cost: ~$95-$150
tags:
- wearable
- physical-ai
- kinetic-edge
- smart-ring
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Smart Ring
cost_low: 95
division: Kinetic Edge
cost_high: 150
data_class: standard internal
form_factor: smart ring
catalog_entry: 49
division_status: chartered
---
# Coach Cue Ring

**Smart Ring** for [[Kinetic Edge Division]] · budget **~$95-$150** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Coach control ring for starting drills, tagging reps, and receiving athlete readiness alerts.

## Spec
| Field | Value |
|---|---|
| Form factor | smart ring |
| Catalog category | Smart Ring |
| Entity | Kinetic Edge (Sports Technology and Human Performance) |
| Budget | ~$95-$150 |
| Industrial design | Matte-black ring with green timing mark. |
| Data class | standard internal |

## Sensors, signals and outputs
- Start/stop drill
- Rep marker
- Haptic readiness alert

## Bill of materials
| # | Part |
|---|---|
| 1 | Feather nRF52840 Sense |
| 2 | DRV2605L |
| 3 | Tap pad |
| 4 | LiPo |

The catalog prices the whole build at **~$95-$150**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Apex System, coach dashboard.

Linked notes: [[Director_Kinetic_Edge]], [[Apex System]]

## Safety gate and data handling
- **Safety gate:** Human coach remains decision maker.
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
