---
title: Proposal Approval Console
cost: ~$180-$420
tags:
- hardware
- foundry
- physical-ai
- the-collective
- control-panel
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Control Panel
cost_low: 180
division: The Collective
cost_high: 420
form_factor: control panel
division_status: operating
---
# Proposal Approval Console

**Control Panel** in the The Collective set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[The Collective Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Control Panel |
| Form factor | control panel |
| Budget | ~$180-$420 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Physical approve/revise/escalate console for proposals, scopes, and client deliverables.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| keyed buttons | — |
| small display | — |
| NFC staff login | — |
| haptic click module | — |

Budget for the full item: **~$180-$420**.

## Specs

- Form factor: control panel
- Placement: Consulting operations desk.
- Industrial design: Gold button caps with dark card body.

## Software stack and signals

Signals / outputs: CRM, Google Drive, Juris Guard review, Knowledge Keeper.

Related systems: [[Knowledge Keeper]]

Cross-division handoffs: [[Juris Guard Division]]

## Placement and agents

Placement: Consulting operations desk.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_The_Collective]].

## Governance

> [!warning] Safety gate
> Final sends require software confirmation.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Data: client data stays local/encrypted unless a reviewed workflow permits export.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
