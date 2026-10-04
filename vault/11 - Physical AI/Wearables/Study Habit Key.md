---
title: Study Habit Key
cost: ~$70-$120
tags:
- wearable
- physical-ai
- hybrid-living
- key-fob
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Key Fob
cost_low: 70
division: Hybrid Living
cost_high: 120
data_class: standard internal
form_factor: key fob
catalog_entry: 19
division_status: operating
---
# Study Habit Key

**Key Fob** for [[Hybrid Living Division]] · budget **~$70-$120** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Student study-chain fob that triggers micro-lessons and habit check-ins at desks.

## Spec
| Field | Value |
|---|---|
| Form factor | key fob |
| Catalog category | Key Fob |
| Entity | Hybrid Living (AI-Native Education) |
| Budget | ~$70-$120 |
| Industrial design | Rounded amber key token with tactile symbol. |
| Data class | standard internal |

## Sensors, signals and outputs
- NFC check-in
- Haptic streak cue
- Button response

## Bill of materials
| # | Part |
|---|---|
| 1 | Circuit Playground Bluefruit |
| 2 | NFC tag |
| 3 | LiPo |
| 4 | Haptic motor |
| 5 | Key shell |

The catalog prices the whole build at **~$70-$120**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Hybrid Living LMS, habit tracker, Knowledge Keeper.

Linked notes: [[Director_Hybrid_Living]], [[Knowledge_Keeper]]

## Safety gate and data handling
- **Safety gate:** Minor-safe data minimization required.
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
