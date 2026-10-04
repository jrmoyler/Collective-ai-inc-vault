---
title: Resonance Ear Clip
cost: ~$115-$180
tags:
- wearable
- physical-ai
- nexus-labs
- ear-worn-recorder-cue
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Ear-Worn Recorder/Cue
cost_low: 115
division: Nexus Labs
cost_high: 180
data_class: standard internal
form_factor: ear-worn recorder/cue
catalog_entry: 22
division_status: operating
---
# Resonance Ear Clip

**Ear-Worn Recorder/Cue** for [[Nexus Labs Division]] · budget **~$115-$180** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Behind-ear creator device for recording-status haptics and production pacing.

## Spec
| Field | Value |
|---|---|
| Form factor | ear-worn recorder/cue |
| Catalog category | Ear-Worn Recorder/Cue |
| Entity | Nexus Labs (Media, Entertainment, and Creative) |
| Budget | ~$115-$180 |
| Industrial design | Crimson ear clip with small LED jewel. |
| Data class | standard internal |

## Sensors, signals and outputs
- Haptic cue
- Audio prompt
- Optional capture button
- BLE sync

## Bill of materials
| # | Part |
|---|---|
| 1 | XIAO ESP32S3 Sense |
| 2 | Micro speaker |
| 3 | DRV2605L |
| 4 | LiPo |
| 5 | TPU ear clip |

The catalog prices the whole build at **~$115-$180**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Nexus Labs studio agent, production calendar.

Linked notes: [[Director_Nexus_Labs]]

## Safety gate and data handling
- **Safety gate:** Studio mode requires visible cue.
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
- Division: [[Nexus Labs Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
