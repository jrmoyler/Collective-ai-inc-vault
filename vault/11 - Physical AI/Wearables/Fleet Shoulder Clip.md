---
title: Fleet Shoulder Clip
cost: ~$125-$205
tags:
- wearable
- physical-ai
- vectorshift
- shoulder-clip
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Shoulder Clip
cost_low: 125
division: VectorShift
cost_high: 205
data_class: standard internal
form_factor: shoulder clip
catalog_entry: 72
division_status: chartered
---
# Fleet Shoulder Clip

**Shoulder Clip** for [[VectorShift Division]] · budget **~$125-$205** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Operator shoulder clip for yard, dock, and mobile logistics status markers.

## Spec
| Field | Value |
|---|---|
| Form factor | shoulder clip |
| Catalog category | Shoulder Clip |
| Entity | VectorShift (Autonomous Logistics and Aerial Mobility) |
| Budget | ~$125-$205 |
| Industrial design | Silver-on-deep-blue rugged clip. |
| Data class | standard internal |

## Sensors, signals and outputs
- Short visual/audio note
- Motion
- BLE

## Bill of materials
| # | Part |
|---|---|
| 1 | XIAO ESP32S3 Sense |
| 2 | LiPo |
| 3 | Haptic |
| 4 | Rugged TPU clip |

The catalog prices the whole build at **~$125-$205**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Fleet dispatch, Knowledge Keeper, safety log.

Linked notes: [[Director_VectorShift]], [[Knowledge_Keeper]]

## Safety gate and data handling
- **Safety gate:** Capture visible and user-controlled.
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
