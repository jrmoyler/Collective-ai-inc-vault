---
title: Scene Marker Ring
cost: ~$90-$150
tags:
- wearable
- physical-ai
- nexus-labs
- smart-ring
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Smart Ring
cost_low: 90
division: Nexus Labs
cost_high: 150
data_class: standard internal
form_factor: smart ring
catalog_entry: 23
division_status: operating
---
# Scene Marker Ring

**Smart Ring** for [[Nexus Labs Division]] · budget **~$90-$150** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Director ring for tagging takes, scene changes, b-roll moments, and quote-worthy lines.

## Spec
| Field | Value |
|---|---|
| Form factor | smart ring |
| Catalog category | Smart Ring |
| Entity | Nexus Labs (Media, Entertainment, and Creative) |
| Budget | ~$90-$150 |
| Industrial design | Black ring with crimson timecode notch. |
| Data class | standard internal |

## Sensors, signals and outputs
- Tap codes
- Haptic receipt
- BLE timecode marker

## Bill of materials
| # | Part |
|---|---|
| 1 | Feather nRF52840 Sense |
| 2 | DRV2605L |
| 3 | Capacitive touch |
| 4 | LiPo |

The catalog prices the whole build at **~$90-$150**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Vision Director workflow, NAS media index, Knowledge Keeper.

Linked notes: [[Director_Nexus_Labs]], [[Knowledge_Keeper]]

## Safety gate and data handling
- **Safety gate:** Markers only; media capture handled by camera rigs.
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
