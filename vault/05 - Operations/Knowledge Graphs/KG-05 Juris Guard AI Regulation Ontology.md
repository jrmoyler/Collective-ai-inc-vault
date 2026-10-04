---
title: KG-05 Juris Guard AI Regulation Ontology
id: KG-05
tags:
- knowledge-graph
- to-build
- juris-guard
type: knowledge-graph
owner: JR Moyler (Hataalii)
source: Knowledge Graph Matrix
status: to-build
updated: 2026-10-04
division: Juris Guard
platform: Stardog (OWL/SPARQL) + Perplexity API for regulation ingestion
---
# KG-05 Juris Guard AI Regulation Ontology

Custom knowledge graph 05 of 20 in the [[Knowledge Graph Matrix]]. Owner: [[Juris Guard Division]]. Status: to build.

[[Juris Guard Division]] is one of the 9 operating divisions.

## Purpose

Legal knowledge graph mapping AI regulations, jurisdictions, product categories, and compliance requirements. Traversable ontology that scores Collective AI products against current regulatory landscape.

**Purpose:** AI compliance intelligence and automated legal risk scoring

## Node types

- `Regulation`
- `Jurisdiction`
- `ProductCategory`
- `Requirement`
- `ComplianceStatus`
- `RiskLevel`

## Edge types

- `APPLIES_TO`
- `ENFORCED_IN`
- `REQUIRES`
- `SUPERSEDES`
- `CONFLICTS_WITH`

## Platform

Stardog (OWL/SPARQL) + Perplexity API for regulation ingestion

Platform tools are described in [[Knowledge Graph Tools]].

## Build prompt

```
Define OWL ontology classes for Regulation, Jurisdiction, ProductCategory. Ingest AI regulatory documents (EU AI Act, NIST RMF, state laws) via Perplexity. SPARQL query: which regulations apply to Quantum Alpha Trading in the EU? Return requirement list with risk score.
```

## Related

- Example query target: [[Quantum Alpha]].
- Related MCP: [[MCP-12 Regulatory Intelligence MCP]].
- Related product: [[Regulatory Intelligence Platform]].
- Division: [[Juris Guard Division]]
- Hub: [[Knowledge Graph Matrix]]
