---
title: Blueprint Ring
cost: ~$90-$150
tags:
- wearable
- physical-ai
- terra-axis
- smart-ring
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Smart Ring
cost_low: 90
division: Terra Axis
cost_high: 150
data_class: standard internal
form_factor: smart ring
catalog_entry: 27
division_status: chartered
---
# Blueprint Ring

**Smart Ring** for [[Terra Axis Division]] · budget **~$90-$150** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Tap ring for marking repair risks, valuation notes, and site priorities during property tours.

## Spec
| Field | Value |
|---|---|
| Form factor | smart ring |
| Catalog category | Smart Ring |
| Entity | Terra Axis (Real Estate and Physical Infrastructure) |
| Budget | ~$90-$150 |
| Industrial design | Dark ring with blue blueprint line. |
| Data class | standard internal |

## Sensors, signals and outputs
- Issue marker
- Urgency marker
- Haptic confirm
- BLE

## Bill of materials
| # | Part |
|---|---|
| 1 | Feather nRF52840 Sense |
| 2 | DRV2605L |
| 3 | Tap pad |
| 4 | LiPo |
| 5 | PETG ring |

The catalog prices the whole build at **~$90-$150**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Terra Axis inspection workflow, Airtable/Mapbox.

Linked notes: [[Director_Terra_Axis]], [[Airtable Operations Hub]]

## Safety gate and data handling
- **Safety gate:** No financial decision automation; flags only.
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
- Division: [[Terra Axis Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
