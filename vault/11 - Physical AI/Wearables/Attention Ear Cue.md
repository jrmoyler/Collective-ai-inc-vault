---
title: Attention Ear Cue
cost: ~$110-$180
tags:
- wearable
- physical-ai
- cognara-mind
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
division: Cognara Mind
cost_high: 180
data_class: behavioral
form_factor: ear cue
catalog_entry: 103
division_status: chartered
---
# Attention Ear Cue

> [!warning] Clinical oversight and Aegis-Review
> Catalog safety gate: **Non-clinical productivity support.**
> Health, clinical and behavioral wearables are scoped as prototype/research/control devices unless explicitly cleared by the relevant review workflow. Health data stays local/encrypted unless a reviewed workflow permits export. No move to production before Binary Loom QA and Aegis review.

**Ear Cue** for [[Cognara Mind Division]] · budget **~$110-$180** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Ear-worn focus cue device for task switching, deep-work reminders, and drift recovery.

## Spec
| Field | Value |
|---|---|
| Form factor | ear cue |
| Catalog category | Ear Cue |
| Entity | Cognara Mind (Behavioral Science and Cognitive Intelligence) |
| Budget | ~$110-$180 |
| Industrial design | Rose ear hook with soft neural line. |
| Data class | behavioral |

## Sensors, signals and outputs
- Haptic/audio cue
- Timer state
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
Cognara focus agent, calendar, ZenFlow.

Linked notes: [[Director_Cognara_Mind]], [[ZenFlow Division]]

## Safety gate and data handling
- **Safety gate:** Non-clinical productivity support.
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
