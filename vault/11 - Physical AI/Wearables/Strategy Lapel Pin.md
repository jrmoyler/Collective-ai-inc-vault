---
title: Strategy Lapel Pin
cost: ~$120-$180
tags:
- wearable
- physical-ai
- the-collective
- smart-lapel-pin
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Smart Lapel Pin
cost_low: 120
division: The Collective
cost_high: 180
data_class: client
form_factor: smart lapel pin
catalog_entry: 12
division_status: operating
---
# Strategy Lapel Pin

**Smart Lapel Pin** for [[The Collective Division]] · budget **~$120-$180** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Premium lapel sensor for client rooms that triggers consulting mode and identity presence.

## Spec
| Field | Value |
|---|---|
| Form factor | smart lapel pin |
| Catalog category | Smart Lapel Pin |
| Entity | The Collective (Expert AI Consulting) |
| Budget | ~$120-$180 |
| Industrial design | Small gold-on-navy pin, non-badge silhouette. |
| Data class | client |

## Sensors, signals and outputs
- Presence
- Button marker
- Audio snippet
- LED status

## Bill of materials
| # | Part |
|---|---|
| 1 | XIAO ESP32S3 Sense |
| 2 | Circuit Playground Bluefruit |
| 3 | LiPo |
| 4 | Haptic |
| 5 | Magnetic backer |

The catalog prices the whole build at **~$120-$180**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Client Presentation workflow, CRM notes, ZenFlow relay.

Linked notes: [[Director_The_Collective]], [[ZenFlow Division]]

## Safety gate and data handling
- **Safety gate:** Visible status LED when recording.
- **Data class:** client — stays local/encrypted unless a reviewed workflow permits export.
- Physical autonomy stays staged under Aegis-Hold until testing, human review, logging and deployment safety checks are complete.

## Deployment gate
Steps from the catalog build governance rules ([[Wearable Catalog — Build Governance]]):
- [ ] Assign device ID, owner, division, firmware version, physical label and registry entry
- [ ] Start on VLAN 80 Quarantine
- [ ] Pass Binary Loom QA
- [ ] Pass Aegis review ([[Aegis Protocol]])
- [ ] LiPo: fire-safe charging, thermal monitoring where possible, labeled storage

## Related
- Division: [[The Collective Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
