---
title: MCP-05 GitHub Intelligence MCP
id: MCP-05
tags:
- mcp-server
- to-build
- binary-loom
type: mcp-server
owner: JR Moyler (Hataalii)
source: MCP Matrix
status: to-build
updated: 2026-10-04
division: Binary Loom
platform: Python FastMCP + GitHub API + Sentry API + dependency parser
---
# MCP-05 GitHub Intelligence MCP

Custom MCP server 05 of 20 in the [[MCP Matrix]]. Owner: [[Binary Loom Division]]. Also used by: ZenFlow, Obsidian Arc. Status: to build.

[[Binary Loom Division]] is one of the 9 operating divisions.

## Purpose

Extended GitHub MCP for Binary Loom. Adds dependency analysis, security audit queries, deployment health, PR intelligence, and infrastructure manifest parsing beyond standard GitHub operations.

## Tools (7)

Inputs and outputs come from the build prompt. Where the matrix gives only the tool name, the cell says so.

| Tool | Input | Output / behavior |
|---|---|---|
| `get_dependency_graph` | repo | Dependency graph parsed from package.json and requirements.txt across all repos |
| `audit_dependencies` | (none) | Dependencies cross-referenced with the known CVE list from NVD |
| `get_deployment_health` | project | Aggregated Vercel + Sentry status |
| `analyze_pr` | pr_url | Complexity score, test coverage delta, security flags |
| `parse_infrastructure_manifest` | Not specified in the matrix | Not specified in the matrix |
| `get_tech_debt_report` | Not specified in the matrix | Not specified in the matrix |
| `flag_security_issue` | Not specified in the matrix | Not specified in the matrix |

## Auth

Not specified in the matrix

## Data sources

- GitHub API
- Sentry API
- Vercel status
- NVD CVE list

## Platform

Python FastMCP + GitHub API + Sentry API + dependency parser

## Build prompt

```
get_dependency_graph(repo) parses package.json and requirements.txt across all repos. audit_dependencies() cross-references with known CVE list from NVD. get_deployment_health(project) aggregates Vercel + Sentry status. analyze_pr(pr_url) returns complexity score, test coverage delta, security flags. Flag results written to Binary Loom Infrastructure Graph.
```

## Related

- Writes flags to [[KG-17 Binary Loom Infrastructure Dependency Graph]].
- Extends the GitHub MCP in [[Established MCP Servers]].
- Division: [[Binary Loom Division]]
- Hub: [[MCP Matrix]]
