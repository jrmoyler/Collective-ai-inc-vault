---
title: Deal Table Touch Token
cost: ~$75-$125
tags:
- wearable
- physical-ai
- the-collective
- pocket-token
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Pocket Token
cost_low: 75
division: The Collective
cost_high: 125
data_class: client
form_factor: pocket token
catalog_entry: 14
division_status: operating
---
# Deal Table Touch Token

**Pocket Token** for [[The Collective Division]] · budget **~$75-$125** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Small tactile token placed near a notebook to mark commitments and action items.

## Spec
| Field | Value |
|---|---|
| Form factor | pocket token |
| Catalog category | Pocket Token |
| Entity | The Collective (Expert AI Consulting) |
| Budget | ~$75-$125 |
| Industrial design | Low-profile gold-rimmed token, quiet enough for client settings. |
| Data class | client |

## Sensors, signals and outputs
- Commitment mark
- Objection mark
- Next-step trigger
- Haptic receipt

## Bill of materials
| # | Part |
|---|---|
| 1 | Circuit Playground Bluefruit |
| 2 | Haptic motor |
| 3 | LiPo |
| 4 | NFC tag |
| 5 | 3D printed puck |

The catalog prices the whole build at **~$75-$125**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
CRM, Airtable, Knowledge Keeper.

Linked notes: [[Director_The_Collective]], [[Knowledge_Keeper]], [[Airtable Operations Hub]]

## Safety gate and data handling
- **Safety gate:** Manual action logging only.
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
