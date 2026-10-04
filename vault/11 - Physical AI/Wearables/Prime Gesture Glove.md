---
title: Prime Gesture Glove
cost: ~$150-$280
tags:
- wearable
- physical-ai
- animus-prime
- smart-glove
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Smart Glove
cost_low: 150
division: Animus Prime
cost_high: 280
data_class: standard internal
form_factor: smart glove
catalog_entry: 76
division_status: chartered
---
# Prime Gesture Glove

**Smart Glove** for [[Animus Prime Division]] · budget **~$150-$280** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Teleoperation glove for robot-hand gestures, arm commands, and manipulation demos.

## Spec
| Field | Value |
|---|---|
| Form factor | smart glove |
| Catalog category | Smart Glove |
| Entity | Animus Prime (Robotics and Embodied AI) |
| Budget | ~$150-$280 |
| Industrial design | Arc-cyan glove pod with serviceable wiring channel. |
| Data class | standard internal |

## Sensors, signals and outputs
- Gesture state
- Grip marker
- Haptic feedback
- BLE

## Bill of materials
| # | Part |
|---|---|
| 1 | Nano 33 BLE Sense |
| 2 | Optional flex sensors |
| 3 | DRV2605L |
| 4 | LiPo |
| 5 | TPU glove pod |

The catalog prices the whole build at **~$150-$280**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Animus control stack, ROS2 bridge, Knowledge Keeper.

Linked notes: [[Director_Animus_Prime]], [[Knowledge_Keeper]]

## Safety gate and data handling
- **Safety gate:** Robot actions remain sandboxed and e-stop protected.
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
