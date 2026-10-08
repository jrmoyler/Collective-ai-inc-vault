# Video-reference presentation upgrade

Reference: JR's uploaded `1000010452.mp4`, 64 seconds, 1920 × 1080. The forest paths and town square establish the target: layered foliage, tactile surfaces, detailed characters, directional daylight and readable walking views. This change retains the vault's knowledge-city identity and live note structure.

## Implemented

- Six instanced landscape batches: branching trees, cutout foliage, grass, flowers, moss and stones. Clustered greenbelt groves share the existing tree budget with district planting. Streets, waterfront and building entrances retain clear margins.
- Meter-scale limestone paving, masonry piers, cornices, mullions, sunshades, entrance lights and furnished planted terraces. Facade dressing retains its one-draw-call contract and bounded instance counts.
- Shaped Sentinel armor, folded cloth and distinct founder equipment. Identity colors, ownership markers, skinning and motion remain connected to existing state.
- Tailored guide robes, harnesses, bags and shoulders; all 19 guide portraits regenerated from the actual mesh, kit revision 3.
- Lower-exposure daylight, local shadow coverage, restrained post-processing and a closer neighborhood arrival. The explicit campus overview remains available.
- Planted title court, closer camera shots, bounded menu motion, restrained HUD edging and touch targets. Skip and reduced-motion paths remain supported.

## Validation and evidence

Run `npm run build`, `node --test --test-name-pattern='^(?!browser:)' tests/*.test.mjs` and `VAULT_QA_OUT=docs/reference-world-evidence npm run test:browser`.

`reference-world-evidence/results.json` records desktop high-quality and mobile low-quality/reduced-motion runs against 1,405 mirrored note fixtures and all 19 knowledge districts. Screenshots cover title, district, world, street, night and mobile walking. Transport is mocked; the test performs no production database writes.

Landscape tests check finite geometry and transforms, deterministic rebuilds, instance caps, entrance clearance, reduced motion and disposal. Facade tests check oriented entrances and terrace containment. Shadow tests check map tracking without changing the sun direction. Existing identity, guide, navigation and UI tests remain in use.

## Remaining quality gates

The changes are code-authored geometry and material improvements. They do not establish that the whole vault equals the reference video's production art quality. Terrain remains the knowledge-city layout; it is not a reconstruction of the reference's sculpted forest or medieval town. Bespoke high-detail production assets and further art direction would be required for that fidelity.

Browser evidence uses Chromium software WebGL. It verifies rendering and interactions, not physical Galaxy A15 frame rate, thermal behavior or GPU stability. No claim of hardware performance is made.
