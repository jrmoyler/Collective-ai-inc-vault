---
title: Sovereign Command Ring
cost: ~$95-$160
tags:
- wearable
- physical-ai
- collective-ai-inc
- smart-ring
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Smart Ring
cost_low: 95
division: Collective AI Inc (Parent)
cost_high: 160
data_class: standard internal
form_factor: smart ring
catalog_entry: 1
---
# Sovereign Command Ring

**Smart Ring** for [[Collective AI — Company Charter]] · budget **~$95-$160** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Founder-grade haptic approval ring for Aegis clear/review/hold actions and executive workflow confirmations.

## Spec
| Field | Value |
|---|---|
| Form factor | smart ring |
| Catalog category | Smart Ring |
| Entity | Collective AI Inc (Parent Company) |
| Budget | ~$95-$160 |
| Industrial design | Ring shell with matte obsidian body, single amber gold authority stripe, serviceable insert. |
| Data class | standard internal |

## Sensors, signals and outputs
- BLE identity handshake
- Tap-confirm
- Haptic patterns
- Proximity unlock
- Workflow marker

## Bill of materials
| # | Part |
|---|---|
| 1 | Feather nRF52840 Sense |
| 2 | DRV2605L haptic driver |
| 3 | Micro LiPo |
| 4 | Magnetic pogo charging pads |
| 5 | TPU inner sleeve |
| 6 | PETG/PLA-CF outer ring shell |

The catalog prices the whole build at **~$95-$160**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
ZenFlow identity registry, Knowledge Keeper event log, Aegis status API, parent Mac mini dashboard.

Linked notes: [[Knowledge_Keeper]], [[Aegis Protocol]], [[ZenFlow Division]]

## Safety gate and data handling
- **Safety gate:** Aegis-Review for approvals; requires deliberate double-tap and audit log.
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
- Division: [[Collective AI — Company Charter]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
