---
title: Habit Drift Ring
cost: ~$95-$150
tags:
- wearable
- physical-ai
- cognara-mind
- smart-ring
- health-related
- clinical-oversight
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Smart Ring
cost_low: 95
division: Cognara Mind
cost_high: 150
data_class: behavioral
form_factor: smart ring
catalog_entry: 101
division_status: chartered
---
# Habit Drift Ring

> [!warning] Clinical oversight and Aegis-Review
> Catalog safety gate: **Behavioral assistance only; no mental health diagnosis.**
> Health, clinical and behavioral wearables are scoped as prototype/research/control devices unless explicitly cleared by the relevant review workflow. Health data stays local/encrypted unless a reviewed workflow permits export. No move to production before Binary Loom QA and Aegis review.

**Smart Ring** for [[Cognara Mind Division]] · budget **~$95-$150** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Behavioral cue ring for habit loops, drift alerts, focus transitions, and self-check markers.

## Spec
| Field | Value |
|---|---|
| Form factor | smart ring |
| Catalog category | Smart Ring |
| Entity | Cognara Mind (Behavioral Science and Cognitive Intelligence) |
| Budget | ~$95-$150 |
| Industrial design | Rose-on-black ring with cognitive loop groove. |
| Data class | behavioral |

## Sensors, signals and outputs
- Habit tap
- Haptic nudge
- BLE identity

## Bill of materials
| # | Part |
|---|---|
| 1 | Feather nRF52840 Sense |
| 2 | DRV2605L |
| 3 | Tap pad |
| 4 | LiPo |

The catalog prices the whole build at **~$95-$150**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Cognara Mind habit model, Knowledge Keeper.

Linked notes: [[Director_Cognara_Mind]], [[Knowledge_Keeper]]

## Safety gate and data handling
- **Safety gate:** Behavioral assistance only; no mental health diagnosis.
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
