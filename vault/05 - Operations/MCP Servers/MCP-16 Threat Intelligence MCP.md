---
title: MCP-16 Threat Intelligence MCP
id: MCP-16
tags:
- mcp-server
- to-build
- obsidian-arc
type: mcp-server
owner: JR Moyler (Hataalii)
source: MCP Matrix
status: to-build
updated: 2026-10-04
division: Obsidian Arc
platform: Python FastMCP + MISP + NVD API + Shodan + VirusTotal
---
# MCP-16 Threat Intelligence MCP

Custom MCP server 16 of 20 in the [[MCP Matrix]]. Owner: [[Obsidian Arc Division]]. Also used by: Binary Loom, ZenFlow, Juris Guard. Status: to build.

[[Obsidian Arc Division]] is one of the 9 operating divisions.

## Purpose

Obsidian Arc cybersecurity intelligence MCP. Surfaces active CVEs affecting Collective AI's tech stack, monitors for brand mentions on dark web, and delivers incident response playbooks.

## Tools (7)

Inputs and outputs come from the build prompt. Where the matrix gives only the tool name, the cell says so.

| Tool | Input | Output / behavior |
|---|---|---|
| `get_threat_summary` | (none) | MISP + NVD CVEs affecting the current tech stack (from the Binary Loom infrastructure graph) |
| `search_cves` | Not specified in the matrix | Not specified in the matrix |
| `get_affected_systems` | cve_id | Deployed services affected by the CVE |
| `monitor_brand_exposure` | Not specified in the matrix | Not specified in the matrix |
| `get_incident_playbook` | incident_type | Step-by-step response procedure |
| `run_vulnerability_scan` | Not specified in the matrix | Not specified in the matrix |
| `get_security_posture` | Not specified in the matrix | Not specified in the matrix |

## Auth

Obsidian Arc Director JWT only. Critical threat alerts route to the Obsidian Arc Director and the JR notification queue.

## Data sources

- MISP
- NVD API
- Shodan
- VirusTotal
- Binary Loom infrastructure graph

## Platform

Python FastMCP + MISP + NVD API + Shodan + VirusTotal

## Build prompt

```
get_threat_summary() aggregates MISP + NVD for CVEs affecting current tech stack (from Binary Loom infrastructure graph). get_affected_systems(cve_id) cross-references against deployed services. get_incident_playbook(incident_type) returns step-by-step response procedure. All critical threat alerts route to Obsidian Arc Director and JR notification queue. Auth: Obsidian Arc Director JWT only.
```

## Related

- Only caller: [[Director_Obsidian_Arc]]. Alerts also go to [[JR Moyler]].
- Graphs: [[KG-12 Obsidian Arc Threat Intelligence Graph]], [[KG-17 Binary Loom Infrastructure Dependency Graph]].
- Incidents: [[SOP — Incident Response]].
- Division: [[Obsidian Arc Division]]
- Hub: [[MCP Matrix]]
