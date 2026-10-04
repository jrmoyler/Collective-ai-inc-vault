---
title: Reflection Pocket Stone
cost: ~$70-$120
tags:
- wearable
- physical-ai
- cognara-mind
- pocket-token
- health-related
- clinical-oversight
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Pocket Token
cost_low: 70
division: Cognara Mind
cost_high: 120
data_class: behavioral
form_factor: pocket token
catalog_entry: 104
division_status: chartered
---
# Reflection Pocket Stone

> [!warning] Clinical oversight and Aegis-Review
> Catalog safety gate: **User-owned private logs.**
> Health, clinical and behavioral wearables are scoped as prototype/research/control devices unless explicitly cleared by the relevant review workflow. Health data stays local/encrypted unless a reviewed workflow permits export. No move to production before Binary Loom QA and Aegis review.

**Pocket Token** for [[Cognara Mind Division]] · budget **~$70-$120** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Tactile token used to mark urges, breakthroughs, distractions, and recovery moments.

## Spec
| Field | Value |
|---|---|
| Form factor | pocket token |
| Catalog category | Pocket Token |
| Entity | Cognara Mind (Behavioral Science and Cognitive Intelligence) |
| Budget | ~$70-$120 |
| Industrial design | Smooth rose-black pocket stone. |
| Data class | behavioral |

## Sensors, signals and outputs
- Tap category
- Haptic receipt
- BLE

## Bill of materials
| # | Part |
|---|---|
| 1 | Circuit Playground Bluefruit |
| 2 | Haptic |
| 3 | NFC |
| 4 | LiPo |
| 5 | Rounded shell |

The catalog prices the whole build at **~$70-$120**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Cognara self-observation workflow.

Linked notes: [[Director_Cognara_Mind]]

## Safety gate and data handling
- **Safety gate:** User-owned private logs.
- **Data class:** behavioral — stays local/encrypted unless a reviewed workflow permits export.
- Physical autonomy stays staged under Aegis-Hold until testing, human review, logging and deployment safety checks are complete.

## Deployment gate
Steps from the catalog build governance rules ([[Wearable Catalog — Build Governance]]):
- [ ] Assign device ID, owner, division, firmware version, physical label and registry entry
- [ ] Start on VLAN 80 Quarantine
- [ ] Pass Binary Loom QA
- [ ] Pass Aegis review ([[Aegis Protocol]]) with clinical review of any health claim
- [ ] LiPo: fire-safe charging, thermal monitoring where possible, labeled storage

## Related
- Division: [[Cognara Mind Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
