---
title: Neuro Calm Ear Cue
cost: ~$110-$180
tags:
- wearable
- physical-ai
- vital-helix
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
division: Vital Helix
cost_high: 180
data_class: health
form_factor: ear cue
catalog_entry: 32
division_status: chartered
---
# Neuro Calm Ear Cue

> [!warning] Clinical oversight and Aegis-Review
> Catalog safety gate: **Wellness guidance only; clinical review for health claims.**
> Health, clinical and behavioral wearables are scoped as prototype/research/control devices unless explicitly cleared by the relevant review workflow. Health data stays local/encrypted unless a reviewed workflow permits export. No move to production before Binary Loom QA and Aegis review.

**Ear Cue** for [[Vital Helix Division]] · budget **~$110-$180** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Ear-worn device for focus/breathing cadence, stress-nudge cues, and private wellness alerts.

## Spec
| Field | Value |
|---|---|
| Form factor | ear cue |
| Catalog category | Ear Cue |
| Entity | Vital Helix (Health, Synthetic Biology, and Neuro-Wellness) |
| Budget | ~$110-$180 |
| Industrial design | Teal ear hook with orange micro-dot. |
| Data class | health |

## Sensors, signals and outputs
- Haptic breath cue
- Audio guide
- Session marker

## Bill of materials
| # | Part |
|---|---|
| 1 | XIAO ESP32S3 Sense |
| 2 | DRV2605L |
| 3 | Micro audio output |
| 4 | LiPo |
| 5 | TPU ear hook |

The catalog prices the whole build at **~$110-$180**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Vital Helix session agent, local health log.

Linked notes: [[Director_Vital_Helix]]

## Safety gate and data handling
- **Safety gate:** Wellness guidance only; clinical review for health claims.
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
