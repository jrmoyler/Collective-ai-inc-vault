---
title: Prime Hand Test Bench
cost: ~$600-$2,000
tags:
- hardware
- foundry
- physical-ai
- animus-prime
- robotics-bench
type: hardware
owner: JR Moyler (Hataalii)
phase: not specified in catalog
source: Foundry Infrastructure Hardware Catalog
status: prototype concept (Aegis-gated)
updated: 2026-10-04
category: Robotics Bench
cost_low: 600
division: Animus Prime
cost_high: 2000
form_factor: robotics bench
division_status: chartered
---
# Prime Hand Test Bench

**Robotics Bench** in the Animus Prime set of the [[Foundry Infrastructure Hardware Catalog]].

| Field | Value |
|---|---|
| Division | [[Animus Prime Division]] |
| Division status | chartered (Oct 2026 canon) |
| Category | Robotics Bench |
| Form factor | robotics bench |
| Budget | ~$600-$2,000 |
| Phase | Not specified in catalog |
| Catalog ID | None (catalog lists items by name only) |

## Purpose

Bench for robot hand, gripper, tendon, and gesture experiments without full humanoid risk.

## Parts list

From the catalog hardware stack. The catalog gives one budget range per item, not per-part prices. Quantities appear only where the catalog states them.

| Component | Qty |
|---|---|
| Jetson/Pi | — |
| servo controller/PCA9685 | — |
| DYNAMIXEL option | — |
| e-stop | — |
| force pads optional | — |
| camera | — |

Budget for the full item: **~$600-$2,000**.

## Specs

- Form factor: robotics bench
- Placement: Robotics workbench.
- Industrial design: Arc-cyan bench plates and safety labels.

## Software stack and signals

Signals / outputs: Animus control stack, ROS2/LeRobot, Knowledge Keeper.

Related systems: [[Knowledge Keeper]]

## Placement and agents

Placement: Robotics workbench.

The catalog column headed "Agents / APIs" holds placement notes. It does not name assigned agents.

Owning division director: [[Director_Animus_Prime]].

## Governance

> [!warning] Safety gate
> E-stop mandatory; low-force test mode first.

Catalog-wide rules that apply (see [[Foundry Hardware Build Governance Rules]]):

- [ ] Identity: device ID, owner, division, firmware version, physical label and registry entry before deployment.
- [ ] Network: starts on VLAN 80 Quarantine; moves to production only after Binary Loom QA and Aegis review.
- [ ] Autonomy: human-supervised and e-stop protected.
- [ ] Brand: one division accent.

The catalog gives no step-by-step build procedure for this item. Staged Aegis-Hold/Aegis-Review governance holds until testing, human review, logging and deployment safety checks are complete ([[Foundry Hardware Operating Standard]]).
