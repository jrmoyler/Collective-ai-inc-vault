---
title: Studio Shoulder Pod
cost: ~$130-$210
tags:
- wearable
- physical-ai
- nexus-labs
- shoulder-clip
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Shoulder Clip
cost_low: 130
division: Nexus Labs
cost_high: 210
data_class: standard internal
form_factor: shoulder clip
catalog_entry: 24
division_status: operating
---
# Studio Shoulder Pod

**Shoulder Clip** for [[Nexus Labs Division]] · budget **~$130-$210** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Camera/mic-capable shoulder pod for POV creator context and ambient session tagging.

## Spec
| Field | Value |
|---|---|
| Form factor | shoulder clip |
| Catalog category | Shoulder Clip |
| Entity | Nexus Labs (Media, Entertainment, and Creative) |
| Budget | ~$130-$210 |
| Industrial design | Crimson shoulder clip, lens shroud, visible status LED. |
| Data class | standard internal |

## Sensors, signals and outputs
- POV stills
- Short audio
- Motion state
- BLE upload

## Bill of materials
| # | Part |
|---|---|
| 1 | XIAO ESP32S3 Sense camera/mic |
| 2 | LiPo |
| 3 | Haptic |
| 4 | TPU shoulder/backpack clip |

The catalog prices the whole build at **~$130-$210**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Nexus vault, content tagging agent, NAS.

Linked notes: [[Director_Nexus_Labs]]

## Safety gate and data handling
- **Safety gate:** No covert capture; lens cover included.
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
- Division: [[Nexus Labs Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
