---
title: Volunteer Key Token
cost: ~$65-$115
tags:
- wearable
- physical-ai
- civic-core
- key-fob
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Key Fob
cost_low: 65
division: Civic Core
cost_high: 115
data_class: civic
form_factor: key fob
catalog_entry: 57
division_status: chartered
---
# Volunteer Key Token

**Key Fob** for [[Civic Core Division]] · budget **~$65-$115** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Volunteer ID token for event attendance, supply pickup, and service hour markers.

## Spec
| Field | Value |
|---|---|
| Form factor | key fob |
| Catalog category | Key Fob |
| Entity | Civic Core (Non-Profit Civic Infrastructure) |
| Budget | ~$65-$115 |
| Industrial design | Soft blue key token with accessible texture. |
| Data class | civic |

## Sensors, signals and outputs
- NFC check-in
- Haptic receipt
- BLE upload

## Bill of materials
| # | Part |
|---|---|
| 1 | Circuit Playground Bluefruit |
| 2 | NFC tag |
| 3 | Haptic motor |
| 4 | LiPo |
| 5 | PETG shell |

The catalog prices the whole build at **~$65-$115**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Volunteer registry, event workflow.

Linked notes: [[Director_Civic_Core]]

## Safety gate and data handling
- **Safety gate:** No location tracking by default.
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
