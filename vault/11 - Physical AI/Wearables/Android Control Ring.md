---
title: Android Control Ring
cost: ~$95-$155
tags:
- wearable
- physical-ai
- animus-prime
- smart-ring
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Smart Ring
cost_low: 95
division: Animus Prime
cost_high: 155
data_class: standard internal
form_factor: smart ring
catalog_entry: 77
division_status: chartered
---
# Android Control Ring

**Smart Ring** for [[Animus Prime Division]] · budget **~$95-$155** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Ring for selecting robot modes, acknowledging e-stop recovery, and marking demos.

## Spec
| Field | Value |
|---|---|
| Form factor | smart ring |
| Catalog category | Smart Ring |
| Entity | Animus Prime (Robotics and Embodied AI) |
| Budget | ~$95-$155 |
| Industrial design | Cyan ring with machined robot-glyph line. |
| Data class | standard internal |

## Sensors, signals and outputs
- Mode tap
- Haptic robot state
- BLE identity

## Bill of materials
| # | Part |
|---|---|
| 1 | Feather nRF52840 Sense |
| 2 | DRV2605L |
| 3 | Tap pad |
| 4 | LiPo |

The catalog prices the whole build at **~$95-$155**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Animus Prime robot console, Aegis safety log.

Linked notes: [[Director_Animus_Prime]], [[Aegis Protocol]]

## Safety gate and data handling
- **Safety gate:** Cannot bypass e-stop or safety gate.
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
