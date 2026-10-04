---
title: Reflection Booth Core
cost: ~$300-$850
tags:
- hardware
- foundry
- physical-ai
- cognara-mind
- audio-privacy-fixture
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Audio/Privacy Fixture
cost_low: 300
division: Cognara Mind
cost_high: 850
form_factor: audio/privacy fixture
division_status: chartered
---
# Reflection Booth Core

**Audio/Privacy Fixture** in the Cognara Mind set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Cognara Mind Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Audio/Privacy Fixture |
| Form factor | audio/privacy fixture |
| Budget | ~$300-$850 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Small privacy station for self-reflection journaling, behavioral prompts, and personal insight capture.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Pi 5 | — |
| ReSpeaker mic | — |
| Whisplay consent display | — |
| speaker | — |
| privacy hood | — |

Budget for the full item: **~$300-$850**.

## Specs

- Form factor: audio/privacy fixture
- Placement: Quiet room or desk booth.
- Industrial design: Rose privacy hood with dark interior.

## Software stack and signals

Signals / outputs: Cognara journal agent, encrypted storage.

## Placement and agents

Placement: Quiet room or desk booth.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Cognara_Mind]].

## Governance

> [!warning] Safety gate
> Sensitive data local and encrypted.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Data: behavioral data stays local/encrypted unless a reviewed workflow permits export.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
