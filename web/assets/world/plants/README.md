# Botanical source geometry

Two compact variants from Poly Haven are used in the existing instanced garden batches:

| Asset | Source mesh | Triangles | High / low instance cap |
|---|---:|---:|---:|
| [Fern 02](https://polyhaven.com/a/fern_02) | 2 | 784 | 640 / 180 |
| [Shrub Sorrel 01](https://polyhaven.com/a/shrub_sorrel_01) | 2 | 353 | 1000 / 320 |

Both assets use Poly Haven's [CC0 asset license](https://polyhaven.com/license). Each `*-source.json` records the authors returned by the asset API, original model and buffer URLs and checksums, selected mesh, and exact texture provenance. Diffuse, OpenGL normal, alpha, and packed ARM maps are original 1K JPG files. The green channel of ARM supplies roughness; alpha uses the separate original alpha map.

Conversion preserves indexed topology, UVs, and normals. Vertices are centered in x/z, seated at y=0, uniformly resized to the garden's world scale, and rounded to six decimal places. The separate source variants are not represented as whole source collections. Reproduce with `python3 scripts/acquire_world_plants.py`.

The runtime loads local files into the existing fern and broadleaf batches. No GLTFLoader or external runtime request is needed. Procedural geometry is only a loading/offline fallback. `landscape.userData.landscape.plantAssets` reports each asset's readiness for browser validation.
