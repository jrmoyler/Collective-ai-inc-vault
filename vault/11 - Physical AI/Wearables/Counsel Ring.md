---
title: Counsel Ring
cost: ~$95-$155
tags:
- wearable
- physical-ai
- juris-guard
- smart-ring
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Smart Ring
cost_low: 95
division: Juris Guard
cost_high: 155
data_class: legal
form_factor: smart ring
catalog_entry: 81
division_status: operating
---
# Counsel Ring

**Smart Ring** for [[Juris Guard Division]] · budget **~$95-$155** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Law review ring for marking clauses, risk flags, approvals, and privilege-sensitive moments.

## Spec
| Field | Value |
|---|---|
| Form factor | smart ring |
| Catalog category | Smart Ring |
| Entity | Juris Guard (LegalTech and AI Governance) |
| Budget | ~$95-$155 |
| Industrial design | Regulation-indigo ring with shield bevel. |
| Data class | legal |

## Sensors, signals and outputs
- Clause marker
- Haptic review cue
- BLE identity

## Bill of materials
| # | Part |
|---|---|
| 1 | Feather nRF52840 Sense |
| 2 | DRV2605L |
| 3 | Tap pad |
| 4 | LiPo |

The catalog prices the whole build at **~$95-$155**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Juris Scan workflow, legal review tracker.

Linked notes: [[Director_Juris_Guard]]

## Safety gate and data handling
- **Safety gate:** Does not provide legal advice without human review.
- **Data class:** legal — stays local/encrypted unless a reviewed workflow permits export.
- Physical autonomy stays staged under Aegis-Hold until testing, human review, logging and deployment safety checks are complete.

## Deployment gate
Steps from the catalog build governance rules ([[Wearable Catalog — Build Governance]]):
- [ ] Assign device ID, owner, division, firmware version, physical label and registry entry
- [ ] Start on VLAN 80 Quarantine
- [ ] Pass Binary Loom QA
- [ ] Pass Aegis review ([[Aegis Protocol]])
- [ ] LiPo: fire-safe charging, thermal monitoring where possible, labeled storage

## Related
- Division: [[Juris Guard Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
