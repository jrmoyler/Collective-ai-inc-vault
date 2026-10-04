---
title: Clause Annotation Pad
cost: ~$180-$450
tags:
- hardware
- foundry
- physical-ai
- juris-guard
- control-surface
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Control Surface
cost_low: 180
division: Juris Guard
cost_high: 450
form_factor: control surface
division_status: operating
---
# Clause Annotation Pad

**Control Surface** in the Juris Guard set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Juris Guard Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Control Surface |
| Form factor | control surface |
| Budget | ~$180-$450 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Desk pad with buttons/knobs for clause severity, jurisdiction, redline, and escalation tags.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| macro buttons | — |
| rotary selector | — |
| haptic | — |
| small display | — |

Budget for the full item: **~$180-$450**.

## Specs

- Form factor: control surface
- Placement: Legal review desk.
- Industrial design: Indigo pad with legal-column texture.

## Software stack and signals

Signals / outputs: Contract review workflow, Drive/Notion.

## Placement and agents

Placement: Legal review desk.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Juris_Guard]].

## Governance

> [!warning] Safety gate
> Attorney/reviewer confirmation required.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Data: legal data stays local/encrypted unless a reviewed workflow permits export.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
