---
title: Threat Ear Cue
cost: ~$110-$180
tags:
- wearable
- physical-ai
- obsidian-arc
- ear-cue
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Ear Cue
cost_low: 110
division: Obsidian Arc
cost_high: 180
data_class: standard internal
form_factor: ear cue
catalog_entry: 54
division_status: operating
---
# Threat Ear Cue

**Ear Cue** for [[Obsidian Arc Division]] · budget **~$110-$180** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Private security cue for patrol alerts, perimeter events, and escalation priority.

## Spec
| Field | Value |
|---|---|
| Form factor | ear cue |
| Catalog category | Ear Cue |
| Entity | Obsidian Arc (Unified Cyber and Physical Security) |
| Budget | ~$110-$180 |
| Industrial design | Sharp black ear hook with orange LED slit. |
| Data class | standard internal |

## Sensors, signals and outputs
- Haptic/audio threat cue
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
Perimeter sensor workflow, Obsidian dashboard.

Linked notes: [[Director_Obsidian_Arc]]

## Safety gate and data handling
- **Safety gate:** No autonomous enforcement.
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
- Division: [[Obsidian Arc Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
