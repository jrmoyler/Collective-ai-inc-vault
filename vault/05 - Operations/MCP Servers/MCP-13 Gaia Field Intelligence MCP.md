---
title: MCP-13 Gaia Field Intelligence MCP
id: MCP-13
tags:
- mcp-server
- to-build
- gaia-synthesis
type: mcp-server
owner: JR Moyler (Hataalii)
source: MCP Matrix
status: to-build
updated: 2026-10-04
division: Gaia Synthesis
platform: Python FastMCP + Gaia Field Sensor API + OpenWeather + NASA EOSDIS
---
# MCP-13 Gaia Field Intelligence MCP

Custom MCP server 13 of 20 in the [[MCP Matrix]]. Owner: [[Gaia Synthesis Division]]. Also used by: VectorShift, ZenFlow. Status: to build.

[[Gaia Synthesis Division]] is chartered, not operating. This spec is a build plan for when the division activates.

## Purpose

Gaia Synthesis precision agriculture MCP. Exposes field sensor data, crop health analysis, environmental monitoring, and agronomic intervention recommendations for field robotics agents.

## Tools (7)

Inputs and outputs come from the build prompt. Where the matrix gives only the tool name, the cell says so.

| Tool | Input | Output / behavior |
|---|---|---|
| `get_field_status` | field_id | Soil health, moisture, crop stage, active alerts |
| `query_sensor_data` | Not specified in the matrix | Not specified in the matrix |
| `get_crop_health` | field_id, crop_type | Image analysis + sensor fusion result |
| `get_weather_forecast` | field_id, days | OpenWeather forecast using field GPS |
| `recommend_intervention` | (none listed) | Decision-tree recommendation from soil + weather + crop stage data |
| `get_yield_forecast` | Not specified in the matrix | Not specified in the matrix |
| `log_intervention` | Not specified in the matrix | Interventions are logged to the Gaia field graph |

## Auth

Not specified in the matrix

## Data sources

- Gaia Field Sensor API
- OpenWeather
- NASA EOSDIS

## Platform

Python FastMCP + Gaia Field Sensor API + OpenWeather + NASA EOSDIS

## Build prompt

```
get_field_status(field_id) returns soil health, moisture, crop stage, active alerts. get_crop_health(field_id, crop_type) runs image analysis + sensor fusion. get_weather_forecast(field_id, days) calls OpenWeather with field GPS. recommend_intervention() uses decision tree against soil + weather + crop stage data. Log interventions to Gaia field graph.
```

## Related

- Logs to [[KG-08 Gaia Synthesis Environmental Knowledge Graph]].
- Consumers: [[Field Robotics]] agents.
- Division: [[Gaia Synthesis Division]]
- Hub: [[MCP Matrix]]
