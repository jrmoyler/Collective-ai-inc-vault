---
title: Live Room Ear Cue
cost: ~$110-$180
tags:
- wearable
- physical-ai
- signal-velocity
- ear-cue
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Ear Cue
cost_low: 110
division: Signal Velocity
cost_high: 180
data_class: standard internal
form_factor: ear cue
catalog_entry: 88
division_status: operating
---
# Live Room Ear Cue

**Ear Cue** for [[Signal Velocity Division]] · budget **~$110-$180** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Private performance cue for livestream pacing, CTA timing, and retention drop alerts.

## Spec
| Field | Value |
|---|---|
| Form factor | ear cue |
| Catalog category | Ear Cue |
| Entity | Signal Velocity (Growth Intelligence and Performance Marketing) |
| Budget | ~$110-$180 |
| Industrial design | Coral ear hook with minimal profile. |
| Data class | standard internal |

## Sensors, signals and outputs
- Audio/haptic cue
- BLE receive
- Timer

## Bill of materials
| # | Part |
|---|---|
| 1 | XIAO ESP32S3 Sense |
| 2 | DRV2605L |
| 3 | Micro audio output |
| 4 | LiPo |

The catalog prices the whole build at **~$110-$180**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Livestream analytics, campaign director.

Linked notes: [[Director_Signal_Velocity]]

## Safety gate and data handling
- **Safety gate:** Cue-only device; no hidden audience capture.
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
