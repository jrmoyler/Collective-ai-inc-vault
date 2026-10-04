---
title: Helix Recovery Patch
cost: ~$120-$210
tags:
- wearable
- physical-ai
- vital-helix
- body-patch
- health-related
- clinical-oversight
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Body Patch
cost_low: 120
division: Vital Helix
cost_high: 210
data_class: health
form_factor: body patch
catalog_entry: 31
division_status: chartered
---
# Helix Recovery Patch

> [!warning] Clinical oversight and Aegis-Review
> Catalog safety gate: **Research device; not diagnosis or treatment.**
> Health, clinical and behavioral wearables are scoped as prototype/research/control devices unless explicitly cleared by the relevant review workflow. Health data stays local/encrypted unless a reviewed workflow permits export. No move to production before Binary Loom QA and Aegis review.

**Body Patch** for [[Vital Helix Division]] · budget **~$120-$210** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Chest/torso patch shell for recovery session context, motion proxy, and guided haptics.

## Spec
| Field | Value |
|---|---|
| Form factor | body patch |
| Catalog category | Body Patch |
| Entity | Vital Helix (Health, Synthetic Biology, and Neuro-Wellness) |
| Budget | ~$120-$210 |
| Industrial design | Bio-teal soft patch with orange clinical indicator. |
| Data class | health |

## Sensors, signals and outputs
- Motion/orientation
- Haptic breath cue
- BLE sync

## Bill of materials
| # | Part |
|---|---|
| 1 | Nano 33 BLE Sense |
| 2 | BNO085 |
| 3 | DRV2605L |
| 4 | Flat LiPo |
| 5 | Soft TPU magnetic patch shell |

The catalog prices the whole build at **~$120-$210**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Vital Helix Bio-Data workflow, Knowledge Keeper.

Linked notes: [[Director_Vital_Helix]], [[Knowledge_Keeper]]

## Safety gate and data handling
- **Safety gate:** Research device; not diagnosis or treatment.
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
