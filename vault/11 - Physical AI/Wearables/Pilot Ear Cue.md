---
title: Pilot Ear Cue
cost: ~$110-$180
tags:
- wearable
- physical-ai
- vectorshift
- ear-cue
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Ear Cue
cost_low: 110
division: VectorShift
cost_high: 180
data_class: standard internal
form_factor: ear cue
catalog_entry: 74
division_status: chartered
---
# Pilot Ear Cue

**Ear Cue** for [[VectorShift Division]] · budget **~$110-$180** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Private cue device for drone/rover operators receiving route, battery, and hazard alerts.

## Spec
| Field | Value |
|---|---|
| Form factor | ear cue |
| Catalog category | Ear Cue |
| Entity | VectorShift (Autonomous Logistics and Aerial Mobility) |
| Budget | ~$110-$180 |
| Industrial design | Silver ear pod with aerodynamic arc. |
| Data class | standard internal |

## Sensors, signals and outputs
- Audio/haptic route cue
- BLE receive

## Bill of materials
| # | Part |
|---|---|
| 1 | XIAO ESP32S3 Sense |
| 2 | DRV2605L |
| 3 | Micro audio output |
| 4 | LiPo |

The catalog prices the whole build at **~$110-$180**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Vector command console, Aether mesh.

Linked notes: [[Director_VectorShift]], [[Aether Link Division]]

## Safety gate and data handling
- **Safety gate:** Human-in-command only.
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
