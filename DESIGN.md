# Vault campus refinement

Tier S: focused upgrades inside the existing game. Delivery: repository and Vercel web app. Brand: Collective AI, retaining the approved PR6 daylight village and existing district colors.

The vault is a working second brain. Buildings represent real notes; sentinels represent people and agents. Visual changes must strengthen those relationships and keep navigation, ownership, task state and source provenance readable.

## Direction

An inhabited knowledge campus: clay roofs on compact buildings, civic pavilions, solar terraces and observatory crowns on taller structures. Each of the 19 district landmarks gets its own architectural setting. Sentinels retain their six authored forms, with continuous cloth deformation and faithful identity colors.

## Constraints

- Keep the street grid, note footprints, interaction targets, authentication and live-data contracts.
- Preserve the existing branded typography and identity palette allocation. No global recolor or arbitrary accent replacement.
- Use bounded, shared geometry batches. No per-building animation loops or decorative particle additions.
- Respect authored landmarks. Derive anchors from actual roof geometry.
- Mobile controls need 44px targets and separation from the reader, floor and district panels.
- Reduced motion must remain usable; no required cinematic interruption.

## Signature

Architecture expresses knowledge districts while live figures and cables occupy the actual roof surfaces. District identity comes from built details and silhouette, rather than a repeated object with a different color.

## Audit scope

Existing app refinement: ideation and unrelated branding changes intentionally skipped. No supplied image reference in this request; no exact-image fidelity claim. Browser evidence and regression results belong in docs/pr6-refinement.md. The existing game mechanics and original title sequence remain the baseline.

## AAA swarm pass (Oct 2026)

Direction: a campus that reacts to the work. Every live write shows on the building that changed, district entry is a moment, facades read note state, Wardens walk and lead, and the world around the island has a far shore, weather, a real moon and a sky that glides between times of day. Report, findings and evidence: docs/aaa-swarm.md.

Constraints added or changed by this pass:

- Particles are allowed only when they carry data or weather, and only from the pooled VFX layer: fixed pools, one shared GPU clock, five draw calls at most. The PR6 rule against decorative particles still applies to anything else.
- Every new layer has a quality tier: high (desktop), MID (phones at full resolution, ambient at 15 fps, no post or drones) and low. Tiers apply live, without a reload.
- Reflective metals share the Sentinels' prefiltered env map, and any material holding it registers for repointing after a GPU reset. Without an env map, metals drop to metalness .3 so direct light still reads.
- Copy states only what the data holds. A missing value says "not set", never a default dressed as a fact.
- Theme swaps change colours in one frame; no transition may show text and fill from different themes.
- On screens 760 px wide or less, HUD panels fold in street-level close-ups so in-world titles stay readable.

Signature for this pass: the write sweep. A scanline in the agent's colour climbs the facade of the note that changed, the roof flashes, and a ring and light column rise from the street.
