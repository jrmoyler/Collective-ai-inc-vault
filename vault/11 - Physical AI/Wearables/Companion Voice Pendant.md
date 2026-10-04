---
title: Companion Voice Pendant
cost: ~$115-$185
tags:
- wearable
- physical-ai
- animus-prime
- pendant
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Pendant
cost_low: 115
division: Animus Prime
cost_high: 185
data_class: standard internal
form_factor: pendant
catalog_entry: 80
division_status: chartered
---
# Companion Voice Pendant

**Pendant** for [[Animus Prime Division]] · budget **~$115-$185** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Operator pendant for triggering robot voice intents and social interaction demos.

## Spec
| Field | Value |
|---|---|
| Form factor | pendant |
| Catalog category | Pendant |
| Entity | Animus Prime (Robotics and Embodied AI) |
| Budget | ~$115-$185 |
| Industrial design | Arc-cyan pendant with friendly robotic face line. |
| Data class | standard internal |

## Sensors, signals and outputs
- Voice intent
- Button command
- RGB state
- BLE

## Bill of materials
| # | Part |
|---|---|
| 1 | XIAO ESP32S3 Sense |
| 2 | Circuit Playground Bluefruit |
| 3 | LiPo |
| 4 | Haptic |

The catalog prices the whole build at **~$115-$185**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Animus social agent, Knowledge Keeper.

Linked notes: [[Director_Animus_Prime]], [[Knowledge_Keeper]]

## Safety gate and data handling
- **Safety gate:** Demo mode only; no unsupervised robot action.
- **Data class:** standard internal
- Physical autonomy stays staged under Aegis-Hold until testing, human review, logging and deployment safety checks are complete.
- Robots and actuation benches remain human-supervised and e-stop protected.

## Deployment gate
Steps from the catalog build governance rules ([[Wearable Catalog — Build Governance]]):
- [ ] Assign device ID, owner, division, firmware version, physical label and registry entry
- [ ] Start on VLAN 80 Quarantine
- [ ] Pass Binary Loom QA
- [ ] Pass Aegis review ([[Aegis Protocol]])
- [ ] LiPo: fire-safe charging, thermal monitoring where possible, labeled storage

## Related
- Division: [[Animus Prime Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
