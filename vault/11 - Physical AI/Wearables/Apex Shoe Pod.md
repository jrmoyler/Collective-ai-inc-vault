---
title: Apex Shoe Pod
cost: ~$110-$185
tags:
- wearable
- physical-ai
- kinetic-edge
- shoe-lace-pod
- health-related
- clinical-oversight
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Shoe/Lace Pod
cost_low: 110
division: Kinetic Edge
cost_high: 185
data_class: health-adjacent (wellness proxy)
form_factor: shoe/lace pod
catalog_entry: 46
division_status: chartered
---
# Apex Shoe Pod

> [!warning] Clinical oversight and Aegis-Review
> Catalog safety gate: **Athletic testing only; not medical rehab claim.**
> Health, clinical and behavioral wearables are scoped as prototype/research/control devices unless explicitly cleared by the relevant review workflow. Health data stays local/encrypted unless a reviewed workflow permits export. No move to production before Binary Loom QA and Aegis review.

**Shoe/Lace Pod** for [[Kinetic Edge Division]] · budget **~$110-$185** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Lace-mounted pod for gait, cadence, jump prep, and lower-body motion capture.

## Spec
| Field | Value |
|---|---|
| Form factor | shoe/lace pod |
| Catalog category | Shoe/Lace Pod |
| Entity | Kinetic Edge (Sports Technology and Human Performance) |
| Budget | ~$110-$185 |
| Industrial design | Performance-green TPU shoe pod with impact bumper. |
| Data class | health-adjacent (wellness proxy) |

## Sensors, signals and outputs
- Foot acceleration
- Orientation
- Cadence
- BLE sync

## Bill of materials
| # | Part |
|---|---|
| 1 | Nano 33 BLE Sense |
| 2 | BNO085 |
| 3 | Feather nRF52840 Sense |
| 4 | LiPo |
| 5 | TPU lace cage |

The catalog prices the whole build at **~$110-$185**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Apex System, recovery alert workflow, Knowledge Keeper.

Linked notes: [[Director_Kinetic_Edge]], [[Knowledge_Keeper]], [[Apex System]]

## Safety gate and data handling
- **Safety gate:** Athletic testing only; not medical rehab claim.
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
