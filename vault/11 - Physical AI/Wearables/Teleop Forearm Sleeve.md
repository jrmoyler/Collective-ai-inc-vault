---
title: Teleop Forearm Sleeve
cost: ~$130-$230
tags:
- wearable
- physical-ai
- animus-prime
- forearm-sleeve
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Forearm Sleeve
cost_low: 130
division: Animus Prime
cost_high: 230
data_class: standard internal
form_factor: forearm sleeve
catalog_entry: 78
division_status: chartered
---
# Teleop Forearm Sleeve

**Forearm Sleeve** for [[Animus Prime Division]] · budget **~$130-$230** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Forearm module for robot teleoperation, operator motion context, and command haptics.

## Spec
| Field | Value |
|---|---|
| Form factor | forearm sleeve |
| Catalog category | Forearm Sleeve |
| Entity | Animus Prime (Robotics and Embodied AI) |
| Budget | ~$130-$230 |
| Industrial design | Cyan forearm rail with screw-mounted electronics. |
| Data class | standard internal |

## Sensors, signals and outputs
- Forearm orientation
- Haptic force cue
- BLE

## Bill of materials
| # | Part |
|---|---|
| 1 | Nano 33 BLE Sense |
| 2 | BNO085 |
| 3 | DRV2605L |
| 4 | LiPo |
| 5 | TPU sleeve rail |

The catalog prices the whole build at **~$130-$230**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
ROS2/LeRobot bridge, Animus eval bench.

Linked notes: [[Director_Animus_Prime]]

## Safety gate and data handling
- **Safety gate:** Bench-only during early phases.
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
