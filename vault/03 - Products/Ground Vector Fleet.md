---
title: Ground Vector Fleet
tags:
- product
- spec
type: product
owner: JR Moyler (Hataalii)
status: spec
updated: 2026-10-04
division: VectorShift
---
# Ground Vector Fleet

Autonomous and assisted ground-delivery operations.

## Division
- [[VectorShift Division]]

## Open items
- [ ] Full spec

## Linked
- [[003 — Products MOC]]

## MVP plan

MVP brief: [[MVP — Ground Vector Fleet]] (from [[MVP Build Guide]])

- Objective: Urban last-mile autonomous ground delivery with SLAM, object detection, route optimization, fleet management, and oversight.
- Build platform: ROS2, PyTorch CV, Cartographer/RTAB-Map, FastAPI fleet backend, React dashboard.
- Priority: Year 3 - Series B; complexity: High
- Governance: Hardware/safety timeline: simulation-first; field deployment requires safety and regulatory review.
- Timeline: 90 days in 5 phases; status planned.

## Master Product Catalog entry

- **Division:** [[VectorShift Division]]
- **Type:** Autonomous Ground Vehicle Fleet

**Description.** Autonomous ground delivery vehicle fleet for urban last-mile logistics. SLAM navigation, object detection, real-time route optimization, fleet management, and human oversight interface.

**Build / creation platform.** ROS2 (Robot Operating System) for autonomous navigation. PyTorch for CV/perception models. SLAM via Cartographer / RTAB-Map. Fleet management in custom FastAPI backend. Real-time monitoring via React dashboard.

Source: [[Master Product Catalog]]
