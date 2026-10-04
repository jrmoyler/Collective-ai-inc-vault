---
title: Synapse Temple Clip
cost: ~$120-$200
tags:
- wearable
- physical-ai
- zenflow
- head-temple-clip
- health-related
- clinical-oversight
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Head/Temple Clip
cost_low: 120
division: ZenFlow
cost_high: 200
data_class: health-adjacent (wellness proxy)
form_factor: head/temple clip
catalog_entry: 7
division_status: operating
---
# Synapse Temple Clip

> [!warning] Clinical oversight and Aegis-Review
> Catalog safety gate: **Not a medical device; cognitive states are workflow proxies.**
> Health, clinical and behavioral wearables are scoped as prototype/research/control devices unless explicitly cleared by the relevant review workflow. Health data stays local/encrypted unless a reviewed workflow permits export. No move to production before Binary Loom QA and Aegis review.

**Head/Temple Clip** for [[ZenFlow Division]] · budget **~$120-$200** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Temple-worn cue clip for focus sessions, prompting cadence, and agent response confirmation.

## Spec
| Field | Value |
|---|---|
| Form factor | head/temple clip |
| Catalog category | Head/Temple Clip |
| Entity | ZenFlow (AI R&D and Central Nervous System) |
| Budget | ~$120-$200 |
| Industrial design | Soft TPU temple/hat clip with violet geometry. |
| Data class | health-adjacent (wellness proxy) |

## Sensors, signals and outputs
- Head orientation
- Focus timer state
- Haptic cue
- Motion marker

## Bill of materials
| # | Part |
|---|---|
| 1 | Arduino Nano 33 BLE Sense Rev2 |
| 2 | BNO085 IMU |
| 3 | DRV2605L |
| 4 | LiPo |
| 5 | TPU clip |

The catalog prices the whole build at **~$120-$200**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
ZenFlow focus workflows, Knowledge Keeper session logs.

Linked notes: [[Director_ZenFlow]], [[Knowledge_Keeper]]

## Safety gate and data handling
- **Safety gate:** Not a medical device; cognitive states are workflow proxies.
- **Data class:** health-adjacent (wellness proxy) — stays local/encrypted unless a reviewed workflow permits export.
- Physical autonomy stays staged under Aegis-Hold until testing, human review, logging and deployment safety checks are complete.

## Deployment gate
Steps from the catalog build governance rules ([[Wearable Catalog — Build Governance]]):
- [ ] Assign device ID, owner, division, firmware version, physical label and registry entry
- [ ] Start on VLAN 80 Quarantine
- [ ] Pass Binary Loom QA
- [ ] Pass Aegis review ([[Aegis Protocol]]) with clinical review of any health claim
- [ ] LiPo: fire-safe charging, thermal monitoring where possible, labeled storage

## Related
- Division: [[ZenFlow Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
