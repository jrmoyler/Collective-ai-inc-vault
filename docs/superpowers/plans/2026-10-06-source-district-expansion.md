# Source-driven District Expansion Implementation Plan

> **For agentic workers:** Use Superpowers parallel-agent execution with isolated file ownership and an integration review. Steps use checkboxes for tracking.

**Goal:** Expand the source-backed city to nineteen districts and persist its content and provenance in Supabase on PR #4.

**Architecture:** Preserve canonical note folders; add curated thematic membership and a deterministic primary world district. Keep source inventory separate from notes and derive catalog coverage rather than duplicating note bodies.

**Tech Stack:** Existing JavaScript/Three.js application, animejs, Babylon camera paths, Postgres/Supabase, Node tests and Playwright.

**Spec:** ../specs/2026-10-06-source-district-expansion.md

## Global constraints

- Current AGENTS.md overrides older documents.
- Preserve existing note content, storage folders, IDs and progress.
- Same branch and PR #4; no force push or merge.
- Six additions are virtual districts, not new corporate activations or physical-campus districts.

## Review focus

- Overlapping thematic memberships must not duplicate or hide world buildings.
- Existing client progress and saved filters survive the expanded registry.
- Unread or partial source scans must not report complete coverage.
- Historical source claims remain dated and superseded where current canon differs.
- Unauthenticated users and ordinary members cannot rewrite source provenance.

## Task 1 — Source inventory and authored content

- [x] Paginate source folders and materialize readable extracts; produce docs/drive-expansion-provenance.json.
- [x] Compare extracted entities with vault/_index.json; generate append/create plans with source IDs and known hub links.
- [x] Validate duplicate names, source URLs and planned wikilinks before writes.
- [x] Apply through versioned agent API, verify readback and mirror changed notes; run scripts/build.py.

## Task 2 — District registry and browsing

- [x] Add source-approved definitions in docs/source-district-definitions.json and web-src/b_districts.js.
- [x] Extend b_districts.js and g_journey.js for directory facets, source links, pagination and persistent filters.
- [x] Test deterministic membership, nineteen district navigation, source URL validation and async progress behavior.

## Task 3 — World integration

- [x] Add b_world_assets.js and include it before c_campus.js.
- [x] Use Districts.worldTop(note) for world placement and guide facts without changing storage metadata.
- [x] Test complete unique placement and bounded asset geometry; inspect desktop and mobile renders.

## Task 4 — Supabase provenance and progress

- [x] Add importer-owned provenance tables, district registry, curated note membership and member-read RLS.
- [x] Add derived catalog/coverage views and JWT endpoint; update progress validation to registry.
- [x] Verify catalog permissions, actual source associations and existing progress preservation in tests.
- [ ] Final production metadata seed and readback: migration and both functions deployed; initial nineteen-district registry verified. Final metadata seed blocked by Supabase connector Unauthorized.

## Task 5 — Integration and publication

- [x] Run full tests, build and rendered browser checks with current mirrored data.
- [x] Review cross-component membership and content provenance; resolve important findings.
- [ ] Publish changed blobs as a new commit on the existing PR branch and verify preview status.
- [x] Report exact content/source/district totals and remaining evidence limits.
