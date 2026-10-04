---
title: MCP-12 Regulatory Intelligence MCP
id: MCP-12
tags:
- mcp-server
- to-build
- juris-guard
type: mcp-server
owner: JR Moyler (Hataalii)
source: MCP Matrix
status: to-build
updated: 2026-10-04
division: Juris Guard
platform: Python FastMCP + Perplexity API + Juris Guard Compliance API + Stardog
---
# MCP-12 Regulatory Intelligence MCP

Custom MCP server 12 of 20 in the [[MCP Matrix]]. Owner: [[Juris Guard Division]]. Also used by: ZenFlow, All Divisions. Status: to build.

[[Juris Guard Division]] is one of the 9 operating divisions.

## Purpose

Juris Guard AI compliance and regulatory monitoring MCP. Tracks AI laws, scores product compliance, issues regulatory alerts, and provides contract review assistance.

## Tools (7)

Inputs and outputs come from the build prompt. Where the matrix gives only the tool name, the cell says so.

| Tool | Input | Output / behavior |
|---|---|---|
| `get_compliance_score` | product_id, jurisdiction | {score, risk_level, gaps[]} |
| `search_regulations` | query, jurisdiction | Results from the Stardog ontology + Perplexity live search |
| `get_regulatory_alerts` | Not specified in the matrix | Not specified in the matrix |
| `review_contract_clause` | Not specified in the matrix | Not specified in the matrix |
| `get_jurisdiction_requirements` | Not specified in the matrix | Not specified in the matrix |
| `flag_compliance_risk` | product_id, regulation_id | Creates an alert and routes it to the Dr. Joseph Johnson notification queue for legal sign-off |
| `get_ai_policy_update` | Not specified in the matrix | Not specified in the matrix |

## Auth

Not specified in the matrix. Compliance flags need legal sign-off from Dr. Joseph Johnson.

## Data sources

- Stardog ontology
- Perplexity API
- Juris Guard Compliance API

## Platform

Python FastMCP + Perplexity API + Juris Guard Compliance API + Stardog

## Build prompt

```
search_regulations(query, jurisdiction) queries Stardog ontology + Perplexity live search. get_compliance_score(product_id, jurisdiction) runs product against current regulation set, returns {score, risk_level, gaps[]}. flag_compliance_risk(product_id, regulation_id) creates alert and routes to Dr. Joseph Johnson notification queue for legal sign-off.
```

## Related

- Sign-off: [[Dr. Joseph Johnson]].
- Ontology: [[KG-05 Juris Guard AI Regulation Ontology]].
- Related products: [[RegPulse]], [[Regulatory Intelligence Platform]].
- Division: [[Juris Guard Division]]
- Hub: [[MCP Matrix]]
