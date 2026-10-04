---
title: Client Signal Ring
cost: ~$90-$145
tags:
- wearable
- physical-ai
- the-collective
- smart-ring
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Smart Ring
cost_low: 90
division: The Collective
cost_high: 145
data_class: client
form_factor: smart ring
catalog_entry: 11
division_status: operating
---
# Client Signal Ring

**Smart Ring** for [[The Collective Division]] · budget **~$90-$145** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Consultant ring for silently marking client objections, wins, risks, and follow-up moments.

## Spec
| Field | Value |
|---|---|
| Form factor | smart ring |
| Catalog category | Smart Ring |
| Entity | The Collective (Expert AI Consulting) |
| Budget | ~$90-$145 |
| Industrial design | Matte black ring with one gold bevel. |
| Data class | client |

## Sensors, signals and outputs
- Tap codes
- Haptic reminders
- Proximity credential
- BLE upload

## Bill of materials
| # | Part |
|---|---|
| 1 | Feather nRF52840 Sense |
| 2 | DRV2605L |
| 3 | Capacitive tap pad |
| 4 | LiPo |
| 5 | PETG ring insert |

The catalog prices the whole build at **~$90-$145**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
The Collective meeting summary agent, CRM, Knowledge Keeper.

Linked notes: [[Director_The_Collective]], [[Knowledge_Keeper]]

## Safety gate and data handling
- **Safety gate:** User-initiated markers only; recording separate from ring.
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
