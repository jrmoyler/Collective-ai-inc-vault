---
title: Lab Safety Ear Cue
cost: ~$110-$175
tags:
- wearable
- physical-ai
- hybrid-living
- ear-worn-cue-pod
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Ear-Worn Cue Pod
cost_low: 110
division: Hybrid Living
cost_high: 175
data_class: standard internal
form_factor: ear-worn cue pod
catalog_entry: 20
division_status: operating
---
# Lab Safety Ear Cue

**Ear-Worn Cue Pod** for [[Hybrid Living Division]] · budget **~$110-$175** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Private cue device for workshop/lab instructions, timers, and safety transitions.

## Spec
| Field | Value |
|---|---|
| Form factor | ear-worn cue pod |
| Catalog category | Ear-Worn Cue Pod |
| Entity | Hybrid Living (AI-Native Education) |
| Budget | ~$110-$175 |
| Industrial design | Soft amber ear hook, classroom-safe. |
| Data class | standard internal |

## Sensors, signals and outputs
- Haptic/audio cue
- Group state
- BLE receive

## Bill of materials
| # | Part |
|---|---|
| 1 | XIAO ESP32S3 Sense |
| 2 | DRV2605L |
| 3 | Small audio output |
| 4 | LiPo |
| 5 | TPU ear clip |

The catalog prices the whole build at **~$110-$175**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Instructor agent, safety workflow, emergency broadcast.

Linked notes: [[Director_Hybrid_Living]]

## Safety gate and data handling
- **Safety gate:** Emergency cues override normal mode.
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
