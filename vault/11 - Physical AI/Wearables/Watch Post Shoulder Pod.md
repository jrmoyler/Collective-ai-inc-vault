---
title: Watch Post Shoulder Pod
cost: ~$135-$220
tags:
- wearable
- physical-ai
- obsidian-arc
- shoulder-clip
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Shoulder Clip
cost_low: 135
division: Obsidian Arc
cost_high: 220
data_class: standard internal
form_factor: shoulder clip
catalog_entry: 55
division_status: operating
---
# Watch Post Shoulder Pod

**Shoulder Clip** for [[Obsidian Arc Division]] · budget **~$135-$220** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Shoulder-mounted patrol clip for incident markers, location handoff, and body-angle context.

## Spec
| Field | Value |
|---|---|
| Form factor | shoulder clip |
| Catalog category | Shoulder Clip |
| Entity | Obsidian Arc (Unified Cyber and Physical Security) |
| Budget | ~$135-$220 |
| Industrial design | Orange rugged shoulder pod. |
| Data class | standard internal |

## Sensors, signals and outputs
- Motion state
- Marker press
- Optional image note
- BLE

## Bill of materials
| # | Part |
|---|---|
| 1 | Nano 33 BLE Sense |
| 2 | XIAO ESP32S3 Sense |
| 3 | LiPo |
| 4 | Haptic |
| 5 | TPU clip |

The catalog prices the whole build at **~$135-$220**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Security patrol log, Aether mesh relay.

Linked notes: [[Director_Obsidian_Arc]], [[Aether Link Division]]

## Safety gate and data handling
- **Safety gate:** Privacy zones must disable capture.
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
