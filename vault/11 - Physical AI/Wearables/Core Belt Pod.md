---
title: Core Belt Pod
cost: ~$115-$185
tags:
- wearable
- physical-ai
- kinetic-edge
- belt-pod
- health-related
- clinical-oversight
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Belt Pod
cost_low: 115
division: Kinetic Edge
cost_high: 185
data_class: health-adjacent (wellness proxy)
form_factor: belt pod
catalog_entry: 48
division_status: chartered
---
# Core Belt Pod

> [!warning] Clinical oversight and Aegis-Review
> Catalog safety gate: **Does not diagnose injury.**
> Health, clinical and behavioral wearables are scoped as prototype/research/control devices unless explicitly cleared by the relevant review workflow. Health data stays local/encrypted unless a reviewed workflow permits export. No move to production before Binary Loom QA and Aegis review.

**Belt Pod** for [[Kinetic Edge Division]] · budget **~$115-$185** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Waist-mounted pod that captures trunk motion for gait, balance, and deceleration mechanics.

## Spec
| Field | Value |
|---|---|
| Form factor | belt pod |
| Catalog category | Belt Pod |
| Entity | Kinetic Edge (Sports Technology and Human Performance) |
| Budget | ~$115-$185 |
| Industrial design | Green rugged belt pod with quick-release rail. |
| Data class | health-adjacent (wellness proxy) |

## Sensors, signals and outputs
- Pelvis/trunk orientation
- Haptic cue
- BLE sync

## Bill of materials
| # | Part |
|---|---|
| 1 | Nano 33 BLE Sense |
| 2 | BNO085 |
| 3 | DRV2605L |
| 4 | LiPo |
| 5 | TPU belt mount |

The catalog prices the whole build at **~$115-$185**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Kinetic IQ, athlete baseline comparison.

Linked notes: [[Director_Kinetic_Edge]], [[Kinetic IQ]]

## Safety gate and data handling
- **Safety gate:** Does not diagnose injury.
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
- Division: [[Kinetic Edge Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
