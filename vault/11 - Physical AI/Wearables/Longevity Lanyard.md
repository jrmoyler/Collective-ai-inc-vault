---
title: Longevity Lanyard
cost: ~$90-$150
tags:
- wearable
- physical-ai
- eon-core
- lanyard
- health-related
- clinical-oversight
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Lanyard
cost_low: 90
division: Eon Core
cost_high: 150
data_class: health
form_factor: lanyard
catalog_entry: 100
division_status: chartered
---
# Longevity Lanyard

> [!warning] Clinical oversight and Aegis-Review
> Catalog safety gate: **Do not store clinical data on device.**
> Health, clinical and behavioral wearables are scoped as prototype/research/control devices unless explicitly cleared by the relevant review workflow. Health data stays local/encrypted unless a reviewed workflow permits export. No move to production before Binary Loom QA and Aegis review.

**Lanyard** for [[Eon Core Division]] · budget **~$90-$150** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Research-session lanyard for participant state, consent, device pairing, and clinic workflow.

## Spec
| Field | Value |
|---|---|
| Form factor | lanyard |
| Catalog category | Lanyard |
| Entity | Eon Core (Longevity Science and Life Extension Research) |
| Budget | ~$90-$150 |
| Industrial design | Aqua lanyard module with clear consent indicator. |
| Data class | health |

## Sensors, signals and outputs
- Consent state
- Session check-in
- Haptic cues

## Bill of materials
| # | Part |
|---|---|
| 1 | Circuit Playground Bluefruit |
| 2 | NFC |
| 3 | RGB |
| 4 | LiPo |
| 5 | Haptic |

The catalog prices the whole build at **~$90-$150**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Eon research workflow, encrypted NAS.

Linked notes: [[Director_Eon_Core]]

## Safety gate and data handling
- **Safety gate:** Do not store clinical data on device.
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
