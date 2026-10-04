---
title: Eco Survey Ring
cost: ~$90-$145
tags:
- wearable
- physical-ai
- gaia-synthesis
- smart-ring
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Smart Ring
cost_low: 90
division: Gaia Synthesis
cost_high: 145
data_class: standard internal
form_factor: smart ring
catalog_entry: 70
division_status: chartered
---
# Eco Survey Ring

**Smart Ring** for [[Gaia Synthesis Division]] · budget **~$90-$145** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Field ring for marking ecological observations without pulling out a phone.

## Spec
| Field | Value |
|---|---|
| Form factor | smart ring |
| Catalog category | Smart Ring |
| Entity | Gaia Synthesis (AgriTech and Environmental Engineering) |
| Budget | ~$90-$145 |
| Industrial design | Green ring with circuit-blue notch. |
| Data class | standard internal |

## Sensors, signals and outputs
- Observation code
- Haptic receipt
- BLE

## Bill of materials
| # | Part |
|---|---|
| 1 | Feather nRF52840 Sense |
| 2 | DRV2605L |
| 3 | Tap pad |
| 4 | LiPo |

The catalog prices the whole build at **~$90-$145**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Gaia Synthesis survey log.

Linked notes: [[Director_Gaia_Synthesis]]

## Safety gate and data handling
- **Safety gate:** Observation-only data capture.
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
