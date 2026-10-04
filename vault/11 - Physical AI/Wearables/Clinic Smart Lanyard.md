---
title: Clinic Smart Lanyard
cost: ~$90-$145
tags:
- wearable
- physical-ai
- vital-helix
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
division: Vital Helix
cost_high: 145
data_class: health
form_factor: lanyard
catalog_entry: 35
division_status: chartered
---
# Clinic Smart Lanyard

> [!warning] Clinical oversight and Aegis-Review
> Catalog safety gate: **Do not store protected health info on-device.**
> Health, clinical and behavioral wearables are scoped as prototype/research/control devices unless explicitly cleared by the relevant review workflow. Health data stays local/encrypted unless a reviewed workflow permits export. No move to production before Binary Loom QA and Aegis review.

**Lanyard** for [[Vital Helix Division]] · budget **~$90-$145** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Clinical research lanyard for participant session ID, consent state, and device pairing.

## Spec
| Field | Value |
|---|---|
| Form factor | lanyard |
| Catalog category | Lanyard |
| Entity | Vital Helix (Health, Synthetic Biology, and Neuro-Wellness) |
| Budget | ~$90-$145 |
| Industrial design | Teal lanyard module with visible consent color. |
| Data class | health |

## Sensors, signals and outputs
- Consent status
- Device pair
- Button check-in
- Haptic cue

## Bill of materials
| # | Part |
|---|---|
| 1 | Circuit Playground Bluefruit |
| 2 | NFC tag |
| 3 | LiPo |
| 4 | Haptic |
| 5 | Display sticker window |

The catalog prices the whole build at **~$90-$145**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Vital Helix intake workflow, Eon data sink.

Linked notes: [[Director_Vital_Helix]], [[Eon Core Division]]

## Safety gate and data handling
- **Safety gate:** Do not store protected health info on-device.
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
