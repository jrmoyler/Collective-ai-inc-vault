---
title: Civic Access Ring
cost: ~$90-$145
tags:
- wearable
- physical-ai
- civic-core
- smart-ring
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Smart Ring
cost_low: 90
division: Civic Core
cost_high: 145
data_class: civic
form_factor: smart ring
catalog_entry: 60
division_status: chartered
---
# Civic Access Ring

**Smart Ring** for [[Civic Core Division]] · budget **~$90-$145** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Optional ring credential for program leaders to unlock civic kits and mark session starts.

## Spec
| Field | Value |
|---|---|
| Form factor | smart ring |
| Catalog category | Smart Ring |
| Entity | Civic Core (Non-Profit Civic Infrastructure) |
| Budget | ~$90-$145 |
| Industrial design | Blue ring with soft-radius edges. |
| Data class | civic |

## Sensors, signals and outputs
- Session start
- Access token
- Haptic reminder

## Bill of materials
| # | Part |
|---|---|
| 1 | Feather nRF52840 Sense |
| 2 | DRV2605L |
| 3 | Tap pad |
| 4 | LiPo |

The catalog prices the whole build at **~$90-$145**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Civic Core device registry.

Linked notes: [[Director_Civic_Core]]

## Safety gate and data handling
- **Safety gate:** Leader-only; not used for public scoring.
- **Data class:** civic — stays local/encrypted unless a reviewed workflow permits export.
- Physical autonomy stays staged under Aegis-Hold until testing, human review, logging and deployment safety checks are complete.

## Deployment gate
Steps from the catalog build governance rules ([[Wearable Catalog — Build Governance]]):
- [ ] Assign device ID, owner, division, firmware version, physical label and registry entry
- [ ] Start on VLAN 80 Quarantine
- [ ] Pass Binary Loom QA
- [ ] Pass Aegis review ([[Aegis Protocol]])
- [ ] LiPo: fire-safe charging, thermal monitoring where possible, labeled storage

## Related
- Division: [[Civic Core Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
