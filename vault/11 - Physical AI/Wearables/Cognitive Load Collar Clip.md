---
title: Cognitive Load Collar Clip
cost: ~$100-$165
tags:
- wearable
- physical-ai
- cognara-mind
- collar-clip
- health-related
- clinical-oversight
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Collar Clip
cost_low: 100
division: Cognara Mind
cost_high: 165
data_class: behavioral
form_factor: collar clip
catalog_entry: 105
division_status: chartered
---
# Cognitive Load Collar Clip

> [!warning] Clinical oversight and Aegis-Review
> Catalog safety gate: **No diagnostic mental-health claims.**
> Health, clinical and behavioral wearables are scoped as prototype/research/control devices unless explicitly cleared by the relevant review workflow. Health data stays local/encrypted unless a reviewed workflow permits export. No move to production before Binary Loom QA and Aegis review.

**Collar Clip** for [[Cognara Mind Division]] · budget **~$100-$165** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Collar clip that uses motion/context proxies to prompt breaks and focus resets.

## Spec
| Field | Value |
|---|---|
| Form factor | collar clip |
| Catalog category | Collar Clip |
| Entity | Cognara Mind (Behavioral Science and Cognitive Intelligence) |
| Budget | ~$100-$165 |
| Industrial design | Rose collar clip with matte-soft finish. |
| Data class | behavioral |

## Sensors, signals and outputs
- Motion variance proxy
- Haptic break cue
- BLE

## Bill of materials
| # | Part |
|---|---|
| 1 | Nano 33 BLE Sense |
| 2 | DRV2605L |
| 3 | LiPo |
| 4 | TPU collar clip |

The catalog prices the whole build at **~$100-$165**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Cognara workload workflow, Knowledge Keeper.

Linked notes: [[Director_Cognara_Mind]], [[Knowledge_Keeper]]

## Safety gate and data handling
- **Safety gate:** No diagnostic mental-health claims.
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
