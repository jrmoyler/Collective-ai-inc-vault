---
title: Climate Hat Clip
cost: ~$105-$175
tags:
- wearable
- physical-ai
- gaia-synthesis
- hat-clip
- health-related
- clinical-oversight
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Hat Clip
cost_low: 105
division: Gaia Synthesis
cost_high: 175
data_class: health-adjacent (wellness proxy)
form_factor: hat clip
catalog_entry: 69
division_status: chartered
---
# Climate Hat Clip

> [!warning] Clinical oversight and Aegis-Review
> Catalog safety gate: **Wellness cue only; not occupational medical device.**
> Health, clinical and behavioral wearables are scoped as prototype/research/control devices unless explicitly cleared by the relevant review workflow. Health data stays local/encrypted unless a reviewed workflow permits export. No move to production before Binary Loom QA and Aegis review.

**Hat Clip** for [[Gaia Synthesis Division]] · budget **~$105-$175** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Hat-mounted field clip that logs heat exposure context and crop-walk progress.

## Spec
| Field | Value |
|---|---|
| Form factor | hat clip |
| Catalog category | Hat Clip |
| Entity | Gaia Synthesis (AgriTech and Environmental Engineering) |
| Budget | ~$105-$175 |
| Industrial design | Green/circuit-blue hat clip. |
| Data class | health-adjacent (wellness proxy) |

## Sensors, signals and outputs
- Temperature proxy
- Motion
- Haptic hydration cue
- BLE

## Bill of materials
| # | Part |
|---|---|
| 1 | Nano 33 BLE Sense |
| 2 | Ambient sensor |
| 3 | DRV2605L |
| 4 | LiPo |
| 5 | ASA/TPU clip |

The catalog prices the whole build at **~$105-$175**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Gaia field dashboard, Vital Helix safety feed.

Linked notes: [[Director_Gaia_Synthesis]], [[Vital Helix Division]]

## Safety gate and data handling
- **Safety gate:** Wellness cue only; not occupational medical device.
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
- Division: [[Gaia Synthesis Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
