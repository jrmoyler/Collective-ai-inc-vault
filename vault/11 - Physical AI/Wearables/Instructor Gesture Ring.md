---
title: Instructor Gesture Ring
cost: ~$95-$150
tags:
- wearable
- physical-ai
- hybrid-living
- smart-ring
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Smart Ring
cost_low: 95
division: Hybrid Living
cost_high: 150
data_class: standard internal
form_factor: smart ring
catalog_entry: 18
division_status: operating
---
# Instructor Gesture Ring

**Smart Ring** for [[Hybrid Living Division]] · budget **~$95-$150** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Teacher command ring for advancing lesson modes and marking teachable moments.

## Spec
| Field | Value |
|---|---|
| Form factor | smart ring |
| Catalog category | Smart Ring |
| Entity | Hybrid Living (AI-Native Education) |
| Budget | ~$95-$150 |
| Industrial design | Slim black ring with amber highlight. |
| Data class | standard internal |

## Sensors, signals and outputs
- Tap gesture
- Lesson marker
- Haptic timer

## Bill of materials
| # | Part |
|---|---|
| 1 | Feather nRF52840 Sense |
| 2 | Capacitive button |
| 3 | DRV2605L |
| 4 | LiPo |
| 5 | PETG ring |

The catalog prices the whole build at **~$95-$150**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Instructor capture workflow, study-guide generator.

Linked notes: [[Director_Hybrid_Living]]

## Safety gate and data handling
- **Safety gate:** Manual triggers only.
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
- Division: [[Hybrid Living Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
