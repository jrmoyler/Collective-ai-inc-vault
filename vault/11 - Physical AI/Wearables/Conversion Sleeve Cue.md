---
title: Conversion Sleeve Cue
cost: ~$105-$170
tags:
- wearable
- physical-ai
- signal-velocity
- sleeve-module
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Sleeve Module
cost_low: 105
division: Signal Velocity
cost_high: 170
data_class: standard internal
form_factor: sleeve module
catalog_entry: 90
division_status: operating
---
# Conversion Sleeve Cue

**Sleeve Module** for [[Signal Velocity Division]] · budget **~$105-$170** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Wearable sleeve cue for sales floors, demos, and event teams to receive campaign alerts.

## Spec
| Field | Value |
|---|---|
| Form factor | sleeve module |
| Catalog category | Sleeve Module |
| Entity | Signal Velocity (Growth Intelligence and Performance Marketing) |
| Budget | ~$105-$170 |
| Industrial design | Coral sleeve pod with fast-release mount. |
| Data class | standard internal |

## Sensors, signals and outputs
- Haptic alert
- Motion state
- Response button

## Bill of materials
| # | Part |
|---|---|
| 1 | Nano 33 BLE Sense |
| 2 | DRV2605L |
| 3 | LiPo |
| 4 | TPU sleeve pod |

The catalog prices the whole build at **~$105-$170**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Signal Velocity field campaign workflow.

Linked notes: [[Director_Signal_Velocity]]

## Safety gate and data handling
- **Safety gate:** No manipulative covert prompts; internal staff only.
- **Data class:** standard internal
- Physical autonomy stays staged under Aegis-Hold until testing, human review, logging and deployment safety checks are complete.

## Deployment gate
Steps from the catalog build governance rules ([[Wearable Catalog — Build Governance]]):
- [ ] Assign device ID, owner, division, firmware version, physical label and registry entry
- [ ] Start on VLAN 80 Quarantine
- [ ] Pass Binary Loom QA
- [ ] Pass Aegis review ([[Aegis Protocol]])
- [ ] LiPo: fire-safe charging, thermal monitoring where possible, labeled storage

## Related
- Division: [[Signal Velocity Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
