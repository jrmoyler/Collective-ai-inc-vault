---
title: Evidence Intake Tray
cost: ~$300-$850
tags:
- hardware
- foundry
- physical-ai
- juris-guard
- document-fixture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Document Fixture
cost_low: 300
division: Juris Guard
cost_high: 850
form_factor: document fixture
division_status: operating
---
# Evidence Intake Tray

**Document Fixture** in the Juris Guard set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Juris Guard Division]] |
| Division status | operating (Oct 2026 canon) |
| Category | Document Fixture |
| Form factor | document fixture |
| Budget | ~$300-$850 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Physical tray for scanning, labeling, and chain-of-custody intake of legal documents.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| Arducam 64MP | — |
| NFC/QR label printer | — |
| light hood | — |
| encrypted SSD | — |

Budget for the full item: **~$300-$850**.

## Specs

- Form factor: document fixture
- Placement: Legal operations desk.
- Industrial design: Regulation-indigo tray with gold custody strip.

## Software stack and signals

Signals / outputs: Juris Scan, evidence ledger, Knowledge Keeper.

Related systems: [[Knowledge Keeper]]

## Placement and agents

Placement: Legal operations desk.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Juris_Guard]].

## Governance

> [!warning] Safety gate
> No cloud upload by default.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Data: legal data stays local/encrypted unless a reviewed workflow permits export.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
