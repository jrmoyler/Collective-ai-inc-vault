---
title: Agility Ankle Band
cost: ~$115-$190
tags:
- wearable
- physical-ai
- kinetic-edge
- ankle-band
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Ankle Band
cost_low: 115
division: Kinetic Edge
cost_high: 190
data_class: standard internal
form_factor: ankle band
catalog_entry: 50
division_status: chartered
---
# Agility Ankle Band

**Ankle Band** for [[Kinetic Edge Division]] · budget **~$115-$190** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Lower-leg band for ankle stability, gait symmetry, and directional-change metrics.

## Spec
| Field | Value |
|---|---|
| Form factor | ankle band |
| Catalog category | Ankle Band |
| Entity | Kinetic Edge (Sports Technology and Human Performance) |
| Budget | ~$115-$190 |
| Industrial design | Green ankle band with washable strap. |
| Data class | standard internal |

## Sensors, signals and outputs
- Acceleration
- Orientation
- Symmetry proxy
- BLE

## Bill of materials
| # | Part |
|---|---|
| 1 | Nano 33 BLE Sense |
| 2 | BNO085 |
| 3 | LiPo |
| 4 | Haptic motor |
| 5 | TPU ankle strap |

The catalog prices the whole build at **~$115-$190**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Kinetic Edge analytics, Vital Helix collaboration.

Linked notes: [[Director_Kinetic_Edge]], [[Vital Helix Division]]

## Safety gate and data handling
- **Safety gate:** Sport performance analytics only.
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
- Division: [[Kinetic Edge Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
