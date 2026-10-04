---
title: Eon Memory Pendant
cost: ~$120-$190
tags:
- wearable
- physical-ai
- eon-core
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
cost_low: 120
division: Eon Core
cost_high: 190
data_class: health
form_factor: pendant
catalog_entry: 97
division_status: chartered
---
# Eon Memory Pendant

> [!warning] Clinical oversight and Aegis-Review
> Catalog safety gate: **Consent required for others in recordings.**
> Health, clinical and behavioral wearables are scoped as prototype/research/control devices unless explicitly cleared by the relevant review workflow. Health data stays local/encrypted unless a reviewed workflow permits export. No move to production before Binary Loom QA and Aegis review.

**Pendant** for [[Eon Core Division]] · budget **~$120-$190** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Legacy-capture pendant for recording life stories, family wisdom, and reflection prompts.

## Spec
| Field | Value |
|---|---|
| Form factor | pendant |
| Catalog category | Pendant |
| Entity | Eon Core (Longevity Science and Life Extension Research) |
| Budget | ~$120-$190 |
| Industrial design | Aqua pendant with hourglass motif. |
| Data class | health |

## Sensors, signals and outputs
- Voice story
- Reflection marker
- RGB save
- BLE

## Bill of materials
| # | Part |
|---|---|
| 1 | XIAO ESP32S3 Sense |
| 2 | Circuit Playground Bluefruit |
| 3 | LiPo |
| 4 | Haptic |

The catalog prices the whole build at **~$120-$190**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Eon Core Wisdom Vault, Knowledge Keeper.

Linked notes: [[Director_Eon_Core]], [[Knowledge_Keeper]]

## Safety gate and data handling
- **Safety gate:** Consent required for others in recordings.
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
