---
title: Router Palm Band
cost: ~$115-$185
tags:
- wearable
- physical-ai
- zenflow
- hand-strap-controller
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Hand Strap Controller
cost_low: 115
division: ZenFlow
cost_high: 185
data_class: standard internal
form_factor: hand strap controller
catalog_entry: 10
division_status: operating
---
# Router Palm Band

**Hand Strap Controller** for [[ZenFlow Division]] · budget **~$115-$185** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Palm-side control strap for selecting active agents by thumb gestures during demos.

## Spec
| Field | Value |
|---|---|
| Form factor | hand strap controller |
| Catalog category | Hand Strap Controller |
| Entity | ZenFlow (AI R&D and Central Nervous System) |
| Budget | ~$115-$185 |
| Industrial design | Flexible black hand strap with violet numbered glyphs. |
| Data class | standard internal |

## Sensors, signals and outputs
- Gesture selection
- Agent shortcut
- Haptic confirm
- BLE command

## Bill of materials
| # | Part |
|---|---|
| 1 | Nano 33 BLE Sense |
| 2 | Small tactile switches |
| 3 | DRV2605L |
| 4 | LiPo |
| 5 | Flexible TPU hand strap |

The catalog prices the whole build at **~$115-$185**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
ZENITH, division director agents, demo controller.

Linked notes: [[Director_ZenFlow]], [[ZENITH]], [[Agent Tier Registry]]

## Safety gate and data handling
- **Safety gate:** Requires manual pairing and session timeout.
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
