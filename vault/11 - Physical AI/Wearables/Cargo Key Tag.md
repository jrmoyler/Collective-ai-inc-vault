---
title: Cargo Key Tag
cost: ~$75-$130
tags:
- wearable
- physical-ai
- vectorshift
- key-fob
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Key Fob
cost_low: 75
division: VectorShift
cost_high: 130
data_class: standard internal
form_factor: key fob
catalog_entry: 73
division_status: chartered
---
# Cargo Key Tag

**Key Fob** for [[VectorShift Division]] · budget **~$75-$130** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Physical cargo token used to bind packages, carts, drones, and route status.

## Spec
| Field | Value |
|---|---|
| Form factor | key fob |
| Catalog category | Key Fob |
| Entity | VectorShift (Autonomous Logistics and Aerial Mobility) |
| Budget | ~$75-$130 |
| Industrial design | Silver key tag with route arrow texture. |
| Data class | standard internal |

## Sensors, signals and outputs
- NFC cargo bind
- Haptic status
- BLE

## Bill of materials
| # | Part |
|---|---|
| 1 | Circuit Playground Bluefruit |
| 2 | NFC tag |
| 3 | Haptic |
| 4 | LiPo |
| 5 | ASA shell |

The catalog prices the whole build at **~$75-$130**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Inventory, dispatch, delivery proof workflow.

Linked notes: [[Director_VectorShift]]

## Safety gate and data handling
- **Safety gate:** Chain-of-custody log required.
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
- Division: [[VectorShift Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
