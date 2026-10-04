---
title: Blackbox Body Clip
cost: ~$120-$190
tags:
- wearable
- physical-ai
- obsidian-arc
- garment-clip
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Garment Clip
cost_low: 120
division: Obsidian Arc
cost_high: 190
data_class: standard internal
form_factor: garment clip
catalog_entry: 52
division_status: operating
---
# Blackbox Body Clip

**Garment Clip** for [[Obsidian Arc Division]] · budget **~$120-$190** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Security operations clip that records operator event markers and patrol check-ins.

## Spec
| Field | Value |
|---|---|
| Form factor | garment clip |
| Catalog category | Garment Clip |
| Entity | Obsidian Arc (Unified Cyber and Physical Security) |
| Budget | ~$120-$190 |
| Industrial design | Black/orange clip with privacy shutter. |
| Data class | standard internal |

## Sensors, signals and outputs
- Check-in
- Marker press
- Optional short audio
- BLE

## Bill of materials
| # | Part |
|---|---|
| 1 | XIAO ESP32S3 Sense |
| 2 | Circuit Playground Bluefruit |
| 3 | LiPo |
| 4 | Haptic |
| 5 | Rugged TPU clip |

The catalog prices the whole build at **~$120-$190**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Security incident log, Knowledge Keeper.

Linked notes: [[Director_Obsidian_Arc]], [[Knowledge_Keeper]]

## Safety gate and data handling
- **Safety gate:** Visible indicator for capture.
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
