---
title: Mesh Ear Cue
cost: ~$110-$180
tags:
- wearable
- physical-ai
- aether-link
- ear-cue
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Ear Cue
cost_low: 110
division: Aether Link
cost_high: 180
data_class: standard internal
form_factor: ear cue
catalog_entry: 62
division_status: chartered
---
# Mesh Ear Cue

**Ear Cue** for [[Aether Link Division]] · budget **~$110-$180** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Ear-worn field cue device for comms status, translation prompts, and network fallback.

## Spec
| Field | Value |
|---|---|
| Form factor | ear cue |
| Catalog category | Ear Cue |
| Entity | Aether Link (Connectivity and Communications) |
| Budget | ~$110-$180 |
| Industrial design | Mint ear pod with friendly rounded body. |
| Data class | standard internal |

## Sensors, signals and outputs
- Audio/haptic cues
- BLE receive
- Field state

## Bill of materials
| # | Part |
|---|---|
| 1 | XIAO ESP32S3 Sense |
| 2 | DRV2605L |
| 3 | Micro audio output |
| 4 | LiPo |

The catalog prices the whole build at **~$110-$180**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Aether Link comms agent, Babel AI.

Linked notes: [[Director_Aether_Link]], [[Babel AI]]

## Safety gate and data handling
- **Safety gate:** Translation prompts require consent.
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
- Division: [[Aether Link Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
