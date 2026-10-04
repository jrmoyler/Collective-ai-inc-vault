---
title: Sentinel Panic Ring
cost: ~$95-$160
tags:
- wearable
- physical-ai
- obsidian-arc
- smart-ring
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Smart Ring
cost_low: 95
division: Obsidian Arc
cost_high: 160
data_class: standard internal
form_factor: smart ring
catalog_entry: 51
division_status: operating
---
# Sentinel Panic Ring

**Smart Ring** for [[Obsidian Arc Division]] · budget **~$95-$160** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Security ring for discreet panic trigger, duress patterns, and Aegis escalation.

## Spec
| Field | Value |
|---|---|
| Form factor | smart ring |
| Catalog category | Smart Ring |
| Entity | Obsidian Arc (Unified Cyber and Physical Security) |
| Budget | ~$95-$160 |
| Industrial design | Threat-orange ring with concealed texture key. |
| Data class | standard internal |

## Sensors, signals and outputs
- Duress gesture
- Haptic receipt
- BLE identity

## Bill of materials
| # | Part |
|---|---|
| 1 | Feather nRF52840 Sense |
| 2 | DRV2605L |
| 3 | Tap/hold sensor |
| 4 | LiPo |
| 5 | Rugged shell |

The catalog prices the whole build at **~$95-$160**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Obsidian Arc alert workflow, Aegis Command.

Linked notes: [[Director_Obsidian_Arc]], [[Aegis Protocol]]

## Safety gate and data handling
- **Safety gate:** False-positive confirmation path required.
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
