---
title: Posture Spine Strip
cost: ~$125-$215
tags:
- wearable
- physical-ai
- vital-helix
- garment-strip
- health-related
- clinical-oversight
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Garment Strip
cost_low: 125
division: Vital Helix
cost_high: 215
data_class: health
form_factor: garment strip
catalog_entry: 34
division_status: chartered
---
# Posture Spine Strip

> [!warning] Clinical oversight and Aegis-Review
> Catalog safety gate: **Ergonomic cueing only.**
> Health, clinical and behavioral wearables are scoped as prototype/research/control devices unless explicitly cleared by the relevant review workflow. Health data stays local/encrypted unless a reviewed workflow permits export. No move to production before Binary Loom QA and Aegis review.

**Garment Strip** for [[Vital Helix Division]] · budget **~$125-$215** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Back-mounted strip that detects posture/motion patterns and provides haptic correction cues.

## Spec
| Field | Value |
|---|---|
| Form factor | garment strip |
| Catalog category | Garment Strip |
| Entity | Vital Helix (Health, Synthetic Biology, and Neuro-Wellness) |
| Budget | ~$125-$215 |
| Industrial design | Flexible teal spine strip under clothing. |
| Data class | health |

## Sensors, signals and outputs
- Orientation
- Movement variance
- Haptic nudges
- BLE

## Bill of materials
| # | Part |
|---|---|
| 1 | Nano 33 BLE Sense |
| 2 | IMU BNO085 |
| 3 | DRV2605L |
| 4 | Slim LiPo |
| 5 | TPU spine rail |

The catalog prices the whole build at **~$125-$215**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Vital posture workflow, Knowledge Keeper.

Linked notes: [[Director_Vital_Helix]], [[Knowledge_Keeper]]

## Safety gate and data handling
- **Safety gate:** Ergonomic cueing only.
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
- Division: [[Vital Helix Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
