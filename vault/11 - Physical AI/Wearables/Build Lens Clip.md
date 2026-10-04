---
title: Build Lens Clip
cost: ~$130-$210
tags:
- wearable
- physical-ai
- binary-loom
- glasses-hat-clip
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Glasses/Hat Clip
cost_low: 130
division: Binary Loom
cost_high: 210
data_class: standard internal
form_factor: glasses/hat clip
catalog_entry: 40
division_status: operating
---
# Build Lens Clip

**Glasses/Hat Clip** for [[Binary Loom Division]] · budget **~$130-$210** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Clip-on mini camera for documenting assembly steps and automatically filing build evidence.

## Spec
| Field | Value |
|---|---|
| Form factor | glasses/hat clip |
| Catalog category | Glasses/Hat Clip |
| Entity | Binary Loom (Digital Infrastructure and Developer Tools) |
| Budget | ~$130-$210 |
| Industrial design | Teal clip with lens privacy slider. |
| Data class | standard internal |

## Sensors, signals and outputs
- POV still/video snippet
- Button marker
- BLE upload

## Bill of materials
| # | Part |
|---|---|
| 1 | XIAO ESP32S3 Sense camera/mic |
| 2 | LiPo |
| 3 | Haptic |
| 4 | Small clip shell |

The catalog prices the whole build at **~$130-$210**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Build doc agent, NAS, GitHub issue attachment.

Linked notes: [[Director_Binary_Loom]]

## Safety gate and data handling
- **Safety gate:** Visible capture indicator required.
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
- Division: [[Binary Loom Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
