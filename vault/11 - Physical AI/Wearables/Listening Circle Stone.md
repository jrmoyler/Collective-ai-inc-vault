---
title: Listening Circle Stone
cost: ~$70-$120
tags:
- wearable
- physical-ai
- civic-core
- pocket-token
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Pocket Token
cost_low: 70
division: Civic Core
cost_high: 120
data_class: civic
form_factor: pocket token
catalog_entry: 59
division_status: chartered
---
# Listening Circle Stone

**Pocket Token** for [[Civic Core Division]] · budget **~$70-$120** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Tactile token for marking community concerns, quotes, and follow-up commitments in listening sessions.

## Spec
| Field | Value |
|---|---|
| Form factor | pocket token |
| Catalog category | Pocket Token |
| Entity | Civic Core (Non-Profit Civic Infrastructure) |
| Budget | ~$70-$120 |
| Industrial design | Smooth blue pocket stone. |
| Data class | civic |

## Sensors, signals and outputs
- Concern marker
- Quote marker
- Follow-up cue

## Bill of materials
| # | Part |
|---|---|
| 1 | Circuit Playground Bluefruit |
| 2 | Haptic |
| 3 | LiPo |
| 4 | NFC |
| 5 | Rounded shell |

The catalog prices the whole build at **~$70-$120**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Civic notes vault, Knowledge Keeper.

Linked notes: [[Director_Civic_Core]], [[Knowledge_Keeper]]

## Safety gate and data handling
- **Safety gate:** Anonymization workflow before reports.
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
