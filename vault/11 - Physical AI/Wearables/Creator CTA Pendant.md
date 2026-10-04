---
title: Creator CTA Pendant
cost: ~$120-$190
tags:
- wearable
- physical-ai
- signal-velocity
- pendant
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Pendant
cost_low: 120
division: Signal Velocity
cost_high: 190
data_class: standard internal
form_factor: pendant
catalog_entry: 87
division_status: operating
---
# Creator CTA Pendant

**Pendant** for [[Signal Velocity Division]] · budget **~$120-$190** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
On-camera pendant that captures CTA ideas, audience hooks, and content angle notes.

## Spec
| Field | Value |
|---|---|
| Form factor | pendant |
| Catalog category | Pendant |
| Entity | Signal Velocity (Growth Intelligence and Performance Marketing) |
| Budget | ~$120-$190 |
| Industrial design | Coral pendant with kinetic arrow relief. |
| Data class | standard internal |

## Sensors, signals and outputs
- Voice idea
- Button tag
- RGB recording state
- BLE

## Bill of materials
| # | Part |
|---|---|
| 1 | XIAO ESP32S3 Sense |
| 2 | Circuit Playground Bluefruit |
| 3 | LiPo |
| 4 | Haptic |

The catalog prices the whole build at **~$120-$190**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Narrative Storm workflow, Notion, Slack.

Linked notes: [[Director_Signal_Velocity]]

## Safety gate and data handling
- **Safety gate:** Visible capture light.
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
