---
title: Roam Key Beacon
cost: ~$75-$130
tags:
- wearable
- physical-ai
- nomad-nexus
- key-fob
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Key Fob
cost_low: 75
division: Nomad Nexus
cost_high: 130
data_class: standard internal
form_factor: key fob
catalog_entry: 92
division_status: chartered
---
# Roam Key Beacon

**Key Fob** for [[Nomad Nexus Division]] · budget **~$75-$130** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Travel key beacon for hotel/worksite access state, emergency check-in, and equipment custody.

## Spec
| Field | Value |
|---|---|
| Form factor | key fob |
| Catalog category | Key Fob |
| Entity | Nomad Nexus (Global Mobility and Digital Nomad Infrastructure) |
| Budget | ~$75-$130 |
| Industrial design | Sand-gold rugged key with globe grid. |
| Data class | standard internal |

## Sensors, signals and outputs
- NFC check-in
- Haptic cue
- BLE

## Bill of materials
| # | Part |
|---|---|
| 1 | Circuit Playground Bluefruit |
| 2 | NFC |
| 3 | Haptic |
| 4 | LiPo |
| 5 | Rugged shell |

The catalog prices the whole build at **~$75-$130**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Nomad registry, Obsidian Arc, Aether mesh.

Linked notes: [[Director_Nomad_Nexus]], [[Obsidian Arc Division]], [[Aether Link Division]]

## Safety gate and data handling
- **Safety gate:** Emergency mode explicit and logged.
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
