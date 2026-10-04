---
title: Zenith OS
tags:
- product
- spec
type: product
owner: JR Moyler (Hataalii)
status: spec
updated: 2026-10-04
division: ZenFlow
---
# Zenith OS

Agent operating system for routing, memory, tools, permissions, and execution.

## Division
- [[ZenFlow Division]]

## Open items
- [ ] Full spec

## Linked
- [[003 — Products MOC]]

## MVP plan

MVP brief: [[MVP — Zenith OS]] (from [[MVP Build Guide]])

- Objective: Master agent operating system for the 600-agent lattice, routing logic, memory management, and cross-division orchestration.
- Build platform: FastAPI + Python, Docker, Anthropic Claude API, LangGraph.
- Priority: Phase 1/2; complexity: Medium
- Governance: Standard Aegis-Clear with privacy, audit logging, and role-based access controls.
- Timeline: 90 days in 5 phases; status planned.

## Master Product Catalog entry

- **Division:** [[ZenFlow Division]]
- **Type:** Platform

**Description.** The master agent operating system. Houses the 600-agent lattice, routing logic, memory management, and cross-division orchestration. Every agent in the portfolio is instantiated, managed, and audited through Zenith OS.

**Build / creation platform.** Custom FastAPI + Python — Docker containers on ZenFlow infrastructure. Agent runtime via Anthropic Claude API (claude-sonnet-4-20250514). Orchestration layer in LangGraph.

> [!note] Model routing
> The catalog lists the model string as written in the spec. Current vault routing lives in [[Agent Tier Registry]] (Tier 1 is [[ZENITH]] alone, [[HATAALII]] at Tier 0.5).

Source: [[Master Product Catalog]]
