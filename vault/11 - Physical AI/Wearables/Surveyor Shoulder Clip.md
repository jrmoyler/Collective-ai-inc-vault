---
title: Surveyor Shoulder Clip
cost: ~$140-$230
tags:
- wearable
- physical-ai
- terra-axis
- shoulder-clip
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Shoulder Clip
cost_low: 140
division: Terra Axis
cost_high: 230
data_class: standard internal
form_factor: shoulder clip
catalog_entry: 26
division_status: chartered
---
# Surveyor Shoulder Clip

**Shoulder Clip** for [[Terra Axis Division]] · budget **~$140-$230** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Property inspection shoulder clip for capturing walkthrough context and GPS-linked notes.

## Spec
| Field | Value |
|---|---|
| Form factor | shoulder clip |
| Catalog category | Shoulder Clip |
| Entity | Terra Axis (Real Estate and Physical Infrastructure) |
| Budget | ~$140-$230 |
| Industrial design | Infrastructure blue rugged shoulder mount. |
| Data class | standard internal |

## Sensors, signals and outputs
- Short visual/audio note
- Motion context
- GPS via paired mesh

## Bill of materials
| # | Part |
|---|---|
| 1 | XIAO ESP32S3 Sense |
| 2 | LILYGO T-Beam companion option |
| 3 | LiPo |
| 4 | Haptic |
| 5 | Rugged TPU clip |

The catalog prices the whole build at **~$140-$230**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Terra Vision, property registry, Knowledge Keeper.

Linked notes: [[Director_Terra_Axis]], [[Knowledge_Keeper]], [[Terra Vision]]

## Safety gate and data handling
- **Safety gate:** Consent and property access workflow required.
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
- Division: [[Terra Axis Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
