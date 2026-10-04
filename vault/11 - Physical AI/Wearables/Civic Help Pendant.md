---
title: Civic Help Pendant
cost: ~$95-$155
tags:
- wearable
- physical-ai
- civic-core
- pendant
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Pendant
cost_low: 95
division: Civic Core
cost_high: 155
data_class: civic
form_factor: pendant
catalog_entry: 56
division_status: chartered
---
# Civic Help Pendant

**Pendant** for [[Civic Core Division]] · budget **~$95-$155** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Community-services pendant for volunteer check-ins, help requests, and field-service notes.

## Spec
| Field | Value |
|---|---|
| Form factor | pendant |
| Catalog category | Pendant |
| Entity | Civic Core (Non-Profit Civic Infrastructure) |
| Budget | ~$95-$155 |
| Industrial design | Hope-blue rounded pendant with dove motif. |
| Data class | civic |

## Sensors, signals and outputs
- Help button
- Short note
- Haptic confirmation
- BLE

## Bill of materials
| # | Part |
|---|---|
| 1 | XIAO ESP32S3 Sense |
| 2 | Circuit Playground Bluefruit |
| 3 | LiPo |
| 4 | Haptic |

The catalog prices the whole build at **~$95-$155**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Civic Core intake workflow, community service logs.

Linked notes: [[Director_Civic_Core]]

## Safety gate and data handling
- **Safety gate:** Non-commercial, consent-first community use.
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
