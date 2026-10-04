---
title: Eon Wearable Integration Hub
tags:
- product
- master-product-catalog
- eon-core
type: product
owner: JR Moyler (Hataalii)
source: Master Product Catalog
status: spec
updated: 2026-10-04
division: Eon Core
product_type: Data Integration Platform
---
# Eon Wearable Integration Hub

**Division:** [[Eon Core Division]] · **Type:** Data Integration Platform · **Status:** spec

## Description

Unified integration hub connecting wearables (Oura, Whoop, Garmin, Apple Health), CGM (Levels, Dexcom), and genomics platforms (23andMe, Nebula) into the Eon biological age tracking platform.

## Build / creation platform

Unified Health API connector built on FastAPI. HL7 FHIR for health data standards. OAuth for wearable platform auth. PostgreSQL for normalized health data. Binary Loom infrastructure.

> [!warning] Clinical oversight
> Per the catalog, all health and longevity recommendations from Vital Helix and Eon Core require clinical oversight before delivery. Aegis-Review is mandatory. See [[Aegis Protocol]].

## Links

- Division: [[Eon Core Division]]
- Director agent: [[Director_Eon_Core]]
- Related: [[Eon Biological Age Platform]] · [[Binary Loom Division]]
- Catalog hub: [[Master Product Catalog]]

## MVP plan
- [[MVP — Eon Wearable Integration Hub]]
