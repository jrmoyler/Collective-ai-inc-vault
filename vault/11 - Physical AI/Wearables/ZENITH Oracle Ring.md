---
title: ZENITH Oracle Ring
cost: ~$95-$155
tags:
- wearable
- physical-ai
- zenflow
- smart-ring
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Smart Ring
cost_low: 95
division: ZenFlow
cost_high: 155
data_class: standard internal
form_factor: smart ring
catalog_entry: 6
division_status: operating
---
# ZENITH Oracle Ring

**Smart Ring** for [[ZenFlow Division]] · budget **~$95-$155** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Agent-routing ring for selecting agents, approving routed prompts, and receiving silent queue alerts.

## Spec
| Field | Value |
|---|---|
| Form factor | smart ring |
| Catalog category | Smart Ring |
| Entity | ZenFlow (AI R&D and Central Nervous System) |
| Budget | ~$95-$155 |
| Industrial design | Neural violet shell with electric-blue pulse slit. |
| Data class | standard internal |

## Sensors, signals and outputs
- Agent queue alert
- Tap route
- Hold-to-escalate
- BLE identity

## Bill of materials
| # | Part |
|---|---|
| 1 | Feather nRF52840 Sense |
| 2 | DRV2605L |
| 3 | Touch pad |
| 4 | LiPo |
| 5 | Magnetic charger |
| 6 | TPU liner |

The catalog prices the whole build at **~$95-$155**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
ZENITH router, Knowledge Keeper, agent queue Redis channel.

Linked notes: [[Director_ZenFlow]], [[Knowledge_Keeper]], [[ZENITH]]

## Safety gate and data handling
- **Safety gate:** Escalations require hold gesture and log ID.
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
- Division: [[ZenFlow Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
