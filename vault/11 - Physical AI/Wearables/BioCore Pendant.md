---
title: BioCore Pendant
cost: ~$115-$185
tags:
- wearable
- physical-ai
- vital-helix
- pendant
- health-related
- clinical-oversight
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Pendant
cost_low: 115
division: Vital Helix
cost_high: 185
data_class: health
form_factor: pendant
catalog_entry: 33
division_status: chartered
---
# BioCore Pendant

> [!warning] Clinical oversight and Aegis-Review
> Catalog safety gate: **Encrypted local storage; consent-first use.**
> Health, clinical and behavioral wearables are scoped as prototype/research/control devices unless explicitly cleared by the relevant review workflow. Health data stays local/encrypted unless a reviewed workflow permits export. No move to production before Binary Loom QA and Aegis review.

**Pendant** for [[Vital Helix Division]] · budget **~$115-$185** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Private biometric session pendant for check-ins, breathwork prompts, and wellness journaling.

## Spec
| Field | Value |
|---|---|
| Form factor | pendant |
| Catalog category | Pendant |
| Entity | Vital Helix (Health, Synthetic Biology, and Neuro-Wellness) |
| Budget | ~$115-$185 |
| Industrial design | Teal medallion with clean clinical geometry. |
| Data class | health |

## Sensors, signals and outputs
- Button journal
- Short audio
- Ambient context
- BLE

## Bill of materials
| # | Part |
|---|---|
| 1 | XIAO ESP32S3 Sense |
| 2 | Circuit Playground Bluefruit |
| 3 | LiPo |
| 4 | Haptic |

The catalog prices the whole build at **~$115-$185**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Vital Helix wellness agent, encrypted NAS partition.

Linked notes: [[Director_Vital_Helix]]

## Safety gate and data handling
- **Safety gate:** Encrypted local storage; consent-first use.
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
