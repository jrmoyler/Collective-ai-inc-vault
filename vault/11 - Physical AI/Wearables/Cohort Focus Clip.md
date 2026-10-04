---
title: Cohort Focus Clip
cost: ~$90-$140
tags:
- wearable
- physical-ai
- hybrid-living
- garment-clip
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Garment Clip
cost_low: 90
division: Hybrid Living
cost_high: 140
data_class: standard internal
form_factor: garment clip
catalog_entry: 17
division_status: operating
---
# Cohort Focus Clip

**Garment Clip** for [[Hybrid Living Division]] · budget **~$90-$140** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Small collar or sleeve clip for attention-safe classroom cues and break reminders.

## Spec
| Field | Value |
|---|---|
| Form factor | garment clip |
| Catalog category | Garment Clip |
| Entity | Hybrid Living (AI-Native Education) |
| Budget | ~$90-$140 |
| Industrial design | Learning amber shell with replaceable student color tab. |
| Data class | standard internal |

## Sensors, signals and outputs
- Motion/context proxy
- Haptic nudge
- BLE attendance ping

## Bill of materials
| # | Part |
|---|---|
| 1 | Nano 33 BLE Sense Rev2 |
| 2 | DRV2605L |
| 3 | LiPo |
| 4 | TPU clip |

The catalog prices the whole build at **~$90-$140**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Instructor dashboard, learning session logs.

Linked notes: [[Director_Hybrid_Living]]

## Safety gate and data handling
- **Safety gate:** No grading from raw sensor data.
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
