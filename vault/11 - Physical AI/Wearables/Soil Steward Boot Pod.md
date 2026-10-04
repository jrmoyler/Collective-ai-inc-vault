---
title: Soil Steward Boot Pod
cost: ~$110-$185
tags:
- wearable
- physical-ai
- gaia-synthesis
- boot-pod
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Boot Pod
cost_low: 110
division: Gaia Synthesis
cost_high: 185
data_class: standard internal
form_factor: boot pod
catalog_entry: 66
division_status: chartered
---
# Soil Steward Boot Pod

**Boot Pod** for [[Gaia Synthesis Division]] · budget **~$110-$185** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Boot-mounted environmental field sensor for farm walks and soil-zone markers.

## Spec
| Field | Value |
|---|---|
| Form factor | boot pod |
| Catalog category | Boot Pod |
| Entity | Gaia Synthesis (AgriTech and Environmental Engineering) |
| Budget | ~$110-$185 |
| Industrial design | Synthesis-green boot clip with mud-shed geometry. |
| Data class | standard internal |

## Sensors, signals and outputs
- Motion
- Zone marker
- Ambient proxy
- BLE upload

## Bill of materials
| # | Part |
|---|---|
| 1 | Nano 33 BLE Sense |
| 2 | Environmental sensor input |
| 3 | LiPo |
| 4 | TPU boot clip |

The catalog prices the whole build at **~$110-$185**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Gaia field log, soil map workflow.

Linked notes: [[Director_Gaia_Synthesis]]

## Safety gate and data handling
- **Safety gate:** Field research only; lab confirmation for claims.
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
