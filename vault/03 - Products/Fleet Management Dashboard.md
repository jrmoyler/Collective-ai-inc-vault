---
title: Fleet Management Dashboard
tags:
- product
- spec
type: product
owner: JR Moyler (Hataalii)
status: spec
updated: 2026-10-04
division: VectorShift
---
# Fleet Management Dashboard

Telemetry, maintenance, utilization, safety, and live operations.

## Division
- [[VectorShift Division]]

## Open items
- [ ] Full spec

## Linked
- [[003 — Products MOC]]

## MVP plan

MVP brief: [[MVP — Fleet Management Dashboard]] (from [[MVP Build Guide]])

- Objective: Real-time fleet dashboard for tracking, mission status, battery/fuel, maintenance, and analytics.
- Build platform: React dashboard, Mapbox, WebSocket, FastAPI, PostgreSQL + TimescaleDB.
- Priority: Year 3 - Series B; complexity: Medium
- Governance: Standard Aegis-Clear with privacy, audit logging, and role-based access controls.
- Timeline: 90 days in 5 phases; status planned.

## Master Product Catalog entry

- **Division:** [[VectorShift Division]]
- **Type:** Operations Platform

**Description.** Real-time fleet operations dashboard for Ground Vector and Sky Vector. Vehicle tracking, mission status, battery/fuel monitoring, maintenance scheduling, and performance analytics.

**Build / creation platform.** React dashboard. Mapbox for real-time vehicle tracking. WebSocket for live updates. FastAPI backend. PostgreSQL + TimescaleDB for telemetry data.

Source: [[Master Product Catalog]]
