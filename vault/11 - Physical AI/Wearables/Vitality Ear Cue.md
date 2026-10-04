---
title: Vitality Ear Cue
cost: ~$110-$180
tags:
- wearable
- physical-ai
- eon-core
- ear-cue
- health-related
- clinical-oversight
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Ear Cue
cost_low: 110
division: Eon Core
cost_high: 180
data_class: health
form_factor: ear cue
catalog_entry: 98
division_status: chartered
---
# Vitality Ear Cue

> [!warning] Clinical oversight and Aegis-Review
> Catalog safety gate: **Medical reminders require review and user confirmation.**
> Health, clinical and behavioral wearables are scoped as prototype/research/control devices unless explicitly cleared by the relevant review workflow. Health data stays local/encrypted unless a reviewed workflow permits export. No move to production before Binary Loom QA and Aegis review.

**Ear Cue** for [[Eon Core Division]] · budget **~$110-$180** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Private longevity routine cue for hydration, breathwork, medication-reminder workflows, and reflection.

## Spec
| Field | Value |
|---|---|
| Form factor | ear cue |
| Catalog category | Ear Cue |
| Entity | Eon Core (Longevity Science and Life Extension Research) |
| Budget | ~$110-$180 |
| Industrial design | Aqua ear pod with soft clinical contour. |
| Data class | health |

## Sensors, signals and outputs
- Haptic/audio cue
- Routine status
- BLE

## Bill of materials
| # | Part |
|---|---|
| 1 | XIAO ESP32S3 Sense |
| 2 | DRV2605L |
| 3 | Micro audio |
| 4 | LiPo |

The catalog prices the whole build at **~$110-$180**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Eon routine agent, calendar, Vital Helix.

Linked notes: [[Director_Eon_Core]], [[Vital Helix Division]]

## Safety gate and data handling
- **Safety gate:** Medical reminders require review and user confirmation.
- **Data class:** health — stays local/encrypted unless a reviewed workflow permits export.
- Physical autonomy stays staged under Aegis-Hold until testing, human review, logging and deployment safety checks are complete.

## Deployment gate
Steps from the catalog build governance rules ([[Wearable Catalog — Build Governance]]):
- [ ] Assign device ID, owner, division, firmware version, physical label and registry entry
- [ ] Start on VLAN 80 Quarantine
- [ ] Pass Binary Loom QA
- [ ] Pass Aegis review ([[Aegis Protocol]]) with clinical review of any health claim
- [ ] LiPo: fire-safe charging, thermal monitoring where possible, labeled storage

## Related
- Division: [[Eon Core Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
