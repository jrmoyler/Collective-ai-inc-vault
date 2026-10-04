---
title: Compass Smart Pendant
cost: ~$120-$190
tags:
- wearable
- physical-ai
- nomad-nexus
- pendant
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Pendant
cost_low: 120
division: Nomad Nexus
cost_high: 190
data_class: standard internal
form_factor: pendant
catalog_entry: 91
division_status: chartered
---
# Compass Smart Pendant

**Pendant** for [[Nomad Nexus Division]] · budget **~$120-$190** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Nomad pendant for travel check-ins, field notes, and route/status prompts.

## Spec
| Field | Value |
|---|---|
| Form factor | pendant |
| Catalog category | Pendant |
| Entity | Nomad Nexus (Global Mobility and Digital Nomad Infrastructure) |
| Budget | ~$120-$190 |
| Industrial design | Horizon-sand pendant with compass relief. |
| Data class | standard internal |

## Sensors, signals and outputs
- Voice note
- Trip marker
- Haptic itinerary cue
- BLE

## Bill of materials
| # | Part |
|---|---|
| 1 | XIAO ESP32S3 Sense |
| 2 | Circuit Playground Bluefruit |
| 3 | LiPo |
| 4 | Haptic |

The catalog prices the whole build at **~$120-$190**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Nomad Nexus travel workflow, Aether Link mesh.

Linked notes: [[Director_Nomad_Nexus]], [[Aether Link Division]]

## Safety gate and data handling
- **Safety gate:** Location sharing user-controlled.
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
- Division: [[Nomad Nexus Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
