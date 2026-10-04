---
title: Atlas Learner Pendant
cost: ~$95-$155
tags:
- wearable
- physical-ai
- hybrid-living
- smart-pendant
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Smart Pendant
cost_low: 95
division: Hybrid Living
cost_high: 155
data_class: standard internal
form_factor: smart pendant
catalog_entry: 16
division_status: operating
---
# Atlas Learner Pendant

**Smart Pendant** for [[Hybrid Living Division]] · budget **~$95-$155** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Student pendant that lets learners request help, mark confusion, or save a study insight.

## Spec
| Field | Value |
|---|---|
| Form factor | smart pendant |
| Catalog category | Smart Pendant |
| Entity | Hybrid Living (AI-Native Education) |
| Budget | ~$95-$155 |
| Industrial design | Amber-accent medallion with soft rounded edges. |
| Data class | standard internal |

## Sensors, signals and outputs
- Help press
- Confusion marker
- Ambient noise level
- BLE sync

## Bill of materials
| # | Part |
|---|---|
| 1 | XIAO ESP32S3 Sense |
| 2 | Circuit Playground Bluefruit |
| 3 | LiPo |
| 4 | Button |
| 5 | Haptic |

The catalog prices the whole build at **~$95-$155**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Hybrid Living tutor agent, cohort analytics, Knowledge Keeper.

Linked notes: [[Director_Hybrid_Living]], [[Knowledge_Keeper]]

## Safety gate and data handling
- **Safety gate:** Education analytics are cohort-level by default.
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
