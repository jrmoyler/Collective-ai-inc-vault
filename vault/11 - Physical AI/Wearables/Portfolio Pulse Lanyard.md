---
title: Portfolio Pulse Lanyard
cost: ~$100-$165
tags:
- wearable
- physical-ai
- collective-ai-inc
- lanyard-controller
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Lanyard Controller
cost_low: 100
division: Collective AI Inc (Parent)
cost_high: 165
data_class: standard internal
form_factor: lanyard controller
catalog_entry: 5
---
# Portfolio Pulse Lanyard

**Lanyard Controller** for [[Collective AI — Company Charter]] · budget **~$100-$165** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Executive lanyard strip with programmable buttons for division status, demo flow, and emergency escalation.

## Spec
| Field | Value |
|---|---|
| Form factor | lanyard controller |
| Catalog category | Lanyard Controller |
| Entity | Collective AI Inc (Parent Company) |
| Budget | ~$100-$165 |
| Industrial design | Flat lanyard module with dark navy shell and gold control labels. |
| Data class | standard internal |

## Sensors, signals and outputs
- Launch workflow
- Switch dashboard
- Mark decision
- Haptic alert

## Bill of materials
| # | Part |
|---|---|
| 1 | Circuit Playground Bluefruit |
| 2 | XIAO ESP32S3 Sense |
| 3 | PowerBoost 1000 |
| 4 | 3-button silicone overlay |
| 5 | RGB edge light |

The catalog prices the whole build at **~$100-$165**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Parent dashboard, ZenFlow workflow router, Slack/Notion/Airtable.

Linked notes: [[ZenFlow Division]], [[Airtable Operations Hub]]

## Safety gate and data handling
- **Safety gate:** Role-based access; physical long-press for destructive triggers.
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
