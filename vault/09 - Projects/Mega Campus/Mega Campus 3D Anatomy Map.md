---
title: Mega Campus 3D Anatomy Map
url: https://collective-ai-inc-mega-campus.vercel.app
repo: https://github.com/jrmoyler/Collective-AI-Inc-Mega-Campus-
tags:
- mega-campus
- 3d
- threejs
- babylonjs
- vercel
- web-app
type: project
owner: JR Moyler (Hataalii)
source: GitHub repo; Vercel API; memory (Sept 10)
status: live (production deploy Sept 23, 2026)
updated: 2026-10-04
---
# Mega Campus 3D Anatomy Map

Interactive 3D explorer of the [[Collective AI Mega Campus]], built on the canonical Sept 16, 2026 register.

## Live links

| Item | Value |
|---|---|
| Production URL | [https://collective-ai-inc-mega-campus.vercel.app](https://collective-ai-inc-mega-campus.vercel.app) |
| Repo | [jrmoyler/Collective-AI-Inc-Mega-Campus-](https://github.com/jrmoyler/Collective-AI-Inc-Mega-Campus-) (public, last push Sept 23, 2026) |
| Vercel project | `collective-ai-inc-mega-campus` (prj_6v76GZj6bdveX5qxIjKZIdfizbpy), Git-linked to `main`, Node 24.x, created June 26, 2026 |
| Latest production deploy | dpl_FAoXcn4HZjsVYFmus7fQ8Dszc695, READY, Sept 23, 2026 12:50 UTC, commit 3a5c326 (merge of PR #15) |
| Access | Vercel SSO protection on (all deployments except custom domains); viewers may need Vercel team access |
| Older project | `collective-ai-mega-campus` (prj_yhsM9PnYDUVVqBhiiv49pIEXe4X6), Vite, single CLI upload July 14, 2026, no Git link, [https://collective-ai-mega-campus.vercel.app](https://collective-ai-mega-campus.vercel.app) |

## Features (production, Sept 23, 2026)

- Header stats: 220 acres, 35 facilities, 6 districts. Directory CF-01 to CF-35 with search and district filter; detail panel shows program area and floors.
- Camera views: Aerial, Flyover, Street, North view, Arrival corridor; daylight and dusk.
- Layers: Labels; Mesh spires & data links; Energy distribution (solar, wind, grid, storage; heat recovery, bio-energy, kinetic); fleets.
- **Explore inside**: Babylon.js tour of all 74 floors and 444 room stops, WASD/touch walking, drag-look, floor selector; floor-plan modal that works without WebGL.
- Rendering quality Balanced / High; "Record device performance" writes a local JSON report.
- If WebGL fails, a labeled schematic campus map keeps all 35 facilities selectable.
- Design: navy #050A18, ivory #F5F5F5, gold #D4A843, teal #00D9B5; 288 px directory, 300 px detail panel; bottom sheets under 760 px.

## Stack and tests

Vite 8, Three.js 0.186 (exterior), Babylon.js 9.26 (interiors, lazy-loaded, disposed on exit), anime.js 4.5 (900 ms camera and panel easing); Blender 4.5.3 synergy-node GLB; Node test suite (21 files, 76/76 passing at PR #15); Vercel builds gated on `npm test`.

## Build history

| Date | PR | Change |
|---|---|---|
| June 26-29, 2026 | initial, #1-#6 | v3.0-era Python render pipeline, 30 trimesh/Blender GLBs, Three.js r185 viewer (Orbit, Walk, Cinematic), Unreal Engine 5.4 scaffold; now historical |
| Sept 16 | #7-#10 | Rebuilt as the 35-facility reference campus with 74-floor interior tours; furnished interiors; dusk fidelity; Vercel pinned to Vite `dist` |
| Sept 17 | #11-#13 | Realism regressions, Blender assets, per-program interiors, textured occupants |
| Sept 18-19 | #14 | 35-facility / 444-room invariants, unique room finishes, CI and test-gated Vercel builds |
| Sept 23 | #15 | Building flicker fix; reference-matched exteriors for all 35 facilities; photoreal interiors, landscape and fleets; screenshot harness |

Repo-recorded fixes: mixed indexed/non-indexed geometry merges, mis-oriented sawtooth roofs, Babylon import cut from 6 MB to ~895 KB, narrow-room doorways, agents teleporting at path ends, room detection on guided return, building flicker, kinetic road shader export for the Vercel build.

## Earlier single-file anatomy map (Sept 10, 2026)

Before the register, a single-file HTML artifact mapped the 30-facility v3.0 campus: Anatomy Map (30 OpenCV-verified hotspots on JR's campus artwork), Isometric View, and Campus Tour with Anthropic API + SpeechSynthesis narration (Three.js r128). Its GLB plan (`models/` folder, `vercel.json` MIME/cache headers, `gltf-pipeline` Draco ~70% reduction) still applies to any GLB swap. Details in [[Mega Campus Version History]].

## Open acceptance items

- Exact likeness to the reference artwork is not claimed.
- Browser GPU rendering not verified in the agent's browser (WebGL disabled there).
- Physical Samsung Galaxy A15 test pending; target mean >=30 FPS and p95 <=50 ms in Balanced mode.

## Related

- [[Design System Bible v3]]
