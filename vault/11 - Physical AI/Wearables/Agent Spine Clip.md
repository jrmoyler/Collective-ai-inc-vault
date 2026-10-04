---
title: Agent Spine Clip
cost: ~$100-$170
tags:
- wearable
- physical-ai
- zenflow
- garment-spine-module
- health-related
- clinical-oversight
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Garment Spine Module
cost_low: 100
division: ZenFlow
cost_high: 170
data_class: health-adjacent (wellness proxy)
form_factor: garment spine module
catalog_entry: 9
division_status: operating
---
# Agent Spine Clip

> [!warning] Clinical oversight and Aegis-Review
> Catalog safety gate: **Ergonomics-only; no health claims.**
> Health, clinical and behavioral wearables are scoped as prototype/research/control devices unless explicitly cleared by the relevant review workflow. Health data stays local/encrypted unless a reviewed workflow permits export. No move to production before Binary Loom QA and Aegis review.

**Garment Spine Module** for [[ZenFlow Division]] · budget **~$100-$170** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Back-collar clip that marks deep-work state and produces haptic reminders during agent operations.

## Spec
| Field | Value |
|---|---|
| Form factor | garment spine module |
| Catalog category | Garment Spine Module |
| Entity | ZenFlow (AI R&D and Central Nervous System) |
| Budget | ~$100-$170 |
| Industrial design | Slim vertical clip with neural-violet inlay. |
| Data class | health-adjacent (wellness proxy) |

## Sensors, signals and outputs
- Posture/motion context
- Timer cues
- Workflow state
- BLE sync

## Bill of materials
| # | Part |
|---|---|
| 1 | Arduino Nano 33 BLE Sense |
| 2 | DRV2605L |
| 3 | PowerBoost |
| 4 | Small LiPo |
| 5 | TPU collar clip |

The catalog prices the whole build at **~$100-$170**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
ZenFlow sprint timers, Knowledge Keeper operational logs.

Linked notes: [[Director_ZenFlow]], [[Knowledge_Keeper]]

## Safety gate and data handling
- **Safety gate:** Ergonomics-only; no health claims.
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
