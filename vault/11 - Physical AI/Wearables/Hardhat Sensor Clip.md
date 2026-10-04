---
title: Hardhat Sensor Clip
cost: ~$115-$190
tags:
- wearable
- physical-ai
- terra-axis
- helmet-clip
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Helmet Clip
cost_low: 115
division: Terra Axis
cost_high: 190
data_class: standard internal
form_factor: helmet clip
catalog_entry: 28
division_status: chartered
---
# Hardhat Sensor Clip

**Helmet Clip** for [[Terra Axis Division]] · budget **~$115-$190** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Hardhat/hat clip for construction-site motion, vibration, and safety check-ins.

## Spec
| Field | Value |
|---|---|
| Form factor | helmet clip |
| Catalog category | Helmet Clip |
| Entity | Terra Axis (Real Estate and Physical Infrastructure) |
| Budget | ~$115-$190 |
| Industrial design | Blue ASA clip with high-visibility accent. |
| Data class | standard internal |

## Sensors, signals and outputs
- Vibration
- Orientation
- Check-in
- Safety haptic

## Bill of materials
| # | Part |
|---|---|
| 1 | Nano 33 BLE Sense |
| 2 | BNO085 |
| 3 | DRV2605L |
| 4 | LiPo |
| 5 | ASA helmet clip |

The catalog prices the whole build at **~$115-$190**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Site safety log, Terra project board, Obsidian Arc alerts.

Linked notes: [[Director_Terra_Axis]], [[Obsidian Arc Division]]

## Safety gate and data handling
- **Safety gate:** Requires site PPE compatibility test.
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
