---
title: Consultant Sleeve Module
cost: ~$105-$170
tags:
- wearable
- physical-ai
- the-collective
- garment-module
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Garment Module
cost_low: 105
division: The Collective
cost_high: 170
data_class: client
form_factor: garment module
catalog_entry: 15
division_status: operating
---
# Consultant Sleeve Module

**Garment Module** for [[The Collective Division]] · budget **~$105-$170** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Removable sleeve insert for consultants who need discreet haptic session cues.

## Spec
| Field | Value |
|---|---|
| Form factor | garment module |
| Catalog category | Garment Module |
| Entity | The Collective (Expert AI Consulting) |
| Budget | ~$105-$170 |
| Industrial design | Flat inner-sleeve pod with matte gold stitch line. |
| Data class | client |

## Sensors, signals and outputs
- Motion state
- Haptic alerts
- Workflow marker

## Bill of materials
| # | Part |
|---|---|
| 1 | Nano 33 BLE Sense |
| 2 | DRV2605L |
| 3 | PowerBoost 1000 |
| 4 | Flat LiPo |
| 5 | TPU sleeve tray |

The catalog prices the whole build at **~$105-$170**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Consulting session router, Slack follow-up automation.

Linked notes: [[Director_The_Collective]]

## Safety gate and data handling
- **Safety gate:** User-owned device; no passive client surveillance.
- **Data class:** client — stays local/encrypted unless a reviewed workflow permits export.
- Physical autonomy stays staged under Aegis-Hold until testing, human review, logging and deployment safety checks are complete.

## Deployment gate
Steps from the catalog build governance rules ([[Wearable Catalog — Build Governance]]):
- [ ] Assign device ID, owner, division, firmware version, physical label and registry entry
- [ ] Start on VLAN 80 Quarantine
- [ ] Pass Binary Loom QA
- [ ] Pass Aegis review ([[Aegis Protocol]])
- [ ] LiPo: fire-safe charging, thermal monitoring where possible, labeled storage

## Related
- Division: [[The Collective Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
