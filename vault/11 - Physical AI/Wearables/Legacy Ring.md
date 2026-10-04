---
title: Legacy Ring
cost: ~$95-$150
tags:
- wearable
- physical-ai
- eon-core
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
division: Eon Core
cost_high: 150
data_class: health
form_factor: smart ring
catalog_entry: 99
division_status: chartered
---
# Legacy Ring

> [!warning] Clinical oversight and Aegis-Review
> Catalog safety gate: **No passive capture.**
> Health, clinical and behavioral wearables are scoped as prototype/research/control devices unless explicitly cleared by the relevant review workflow. Health data stays local/encrypted unless a reviewed workflow permits export. No move to production before Binary Loom QA and Aegis review.

**Smart Ring** for [[Eon Core Division]] · budget **~$95-$150** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Smart ring for marking memories, routines, and high-value life notes.

## Spec
| Field | Value |
|---|---|
| Form factor | smart ring |
| Catalog category | Smart Ring |
| Entity | Eon Core (Longevity Science and Life Extension Research) |
| Budget | ~$95-$150 |
| Industrial design | Aqua ring with hourglass-glyph notch. |
| Data class | health |

## Sensors, signals and outputs
- Tap memory marker
- Haptic cue
- BLE

## Bill of materials
| # | Part |
|---|---|
| 1 | Feather nRF52840 Sense |
| 2 | DRV2605L |
| 3 | Tap pad |
| 4 | LiPo |

The catalog prices the whole build at **~$95-$150**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Wisdom Vault, Knowledge Keeper.

Linked notes: [[Director_Eon_Core]], [[Knowledge_Keeper]]

## Safety gate and data handling
- **Safety gate:** No passive capture.
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
