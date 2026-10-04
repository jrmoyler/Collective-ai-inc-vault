---
title: Prompt Stone Pocket Puck
cost: ~$90-$150
tags:
- wearable
- physical-ai
- zenflow
- pocket-talisman
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Pocket Talisman
cost_low: 90
division: ZenFlow
cost_high: 150
data_class: standard internal
form_factor: pocket talisman
catalog_entry: 8
division_status: operating
---
# Prompt Stone Pocket Puck

**Pocket Talisman** for [[ZenFlow Division]] · budget **~$90-$150** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Tactile pocket puck for one-press prompt capture and workflow branching without screen use.

## Spec
| Field | Value |
|---|---|
| Form factor | pocket talisman |
| Catalog category | Pocket Talisman |
| Entity | ZenFlow (AI R&D and Central Nervous System) |
| Budget | ~$90-$150 |
| Industrial design | Palm-sized rounded puck with diamond star and blue-violet glow. |
| Data class | standard internal |

## Sensors, signals and outputs
- Press patterns
- Voice snippet
- RGB state
- BLE upload

## Bill of materials
| # | Part |
|---|---|
| 1 | Circuit Playground Bluefruit |
| 2 | XIAO ESP32S3 Sense |
| 3 | LiPo |
| 4 | RGB diffuser |
| 5 | Haptic motor |

The catalog prices the whole build at **~$90-$150**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
ZenFlow prompt router, local transcription, vector memory.

Linked notes: [[Director_ZenFlow]]

## Safety gate and data handling
- **Safety gate:** Button-gated capture; no passive mic mode.
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
- Division: [[ZenFlow Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
