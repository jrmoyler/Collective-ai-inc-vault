---
title: Mood Context Pendant
cost: ~$120-$190
tags:
- wearable
- physical-ai
- cognara-mind
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
division: Cognara Mind
cost_high: 190
data_class: behavioral
form_factor: pendant
catalog_entry: 102
division_status: chartered
---
# Mood Context Pendant

> [!warning] Clinical oversight and Aegis-Review
> Catalog safety gate: **Sensitive data encrypted; user-controlled export.**
> Health, clinical and behavioral wearables are scoped as prototype/research/control devices unless explicitly cleared by the relevant review workflow. Health data stays local/encrypted unless a reviewed workflow permits export. No move to production before Binary Loom QA and Aegis review.

**Pendant** for [[Cognara Mind Division]] · budget **~$120-$190** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Private self-reflection pendant for brief voice check-ins and cognitive-context labels.

## Spec
| Field | Value |
|---|---|
| Form factor | pendant |
| Catalog category | Pendant |
| Entity | Cognara Mind (Behavioral Science and Cognitive Intelligence) |
| Budget | ~$120-$190 |
| Industrial design | Cognara rose pendant with shield/brain motif. |
| Data class | behavioral |

## Sensors, signals and outputs
- Voice check-in
- Mood label button
- RGB state

## Bill of materials
| # | Part |
|---|---|
| 1 | XIAO ESP32S3 Sense |
| 2 | Circuit Playground Bluefruit |
| 3 | LiPo |
| 4 | Haptic |

The catalog prices the whole build at **~$120-$190**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Cognara journal workflow, encrypted storage.

Linked notes: [[Director_Cognara_Mind]]

## Safety gate and data handling
- **Safety gate:** Sensitive data encrypted; user-controlled export.
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
