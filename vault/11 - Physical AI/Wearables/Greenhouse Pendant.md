---
title: Greenhouse Pendant
cost: ~$120-$190
tags:
- wearable
- physical-ai
- gaia-synthesis
- pendant
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Pendant
cost_low: 120
division: Gaia Synthesis
cost_high: 190
data_class: standard internal
form_factor: pendant
catalog_entry: 67
division_status: chartered
---
# Greenhouse Pendant

**Pendant** for [[Gaia Synthesis Division]] · budget **~$120-$190** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Pendant for greenhouse operators to mark plant anomalies and irrigation observations.

## Spec
| Field | Value |
|---|---|
| Form factor | pendant |
| Catalog category | Pendant |
| Entity | Gaia Synthesis (AgriTech and Environmental Engineering) |
| Budget | ~$120-$190 |
| Industrial design | Green medallion with circuit-blue vein. |
| Data class | standard internal |

## Sensors, signals and outputs
- Voice/image note
- Plant marker
- BLE

## Bill of materials
| # | Part |
|---|---|
| 1 | XIAO ESP32S3 Sense |
| 2 | Circuit Playground Bluefruit |
| 3 | LiPo |
| 4 | Haptic |

The catalog prices the whole build at **~$120-$190**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Gaia Knowledge Keeper, Airtable crop log.

Linked notes: [[Director_Gaia_Synthesis]], [[Knowledge_Keeper]], [[Airtable Operations Hub]]

## Safety gate and data handling
- **Safety gate:** No pesticide/chemical dosing automation.
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
- Division: [[Gaia Synthesis Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
