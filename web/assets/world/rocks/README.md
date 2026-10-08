# Mossy scanned garden stone

Source: [Rock Moss Set 01](https://polyhaven.com/a/rock_moss_set_01), by Kless Gyzen / Poly Haven.
License: [CC0 1.0](https://polyhaven.com/license). Poly Haven's asset license page and API metadata were checked during acquisition. The website's separate site-content restrictions do not replace its CC0 asset license.

The shipped geometry is the third rock of the six-rock source set: 2,741 vertices, 5,000 triangles. Original indexed topology, normals, and UVs are preserved. Its lowest vertex was moved to y=0 and floating attributes rounded to six decimal places. Images are the original 1K diffuse, OpenGL normal, and roughness maps. Textures share the source atlas; no synthetic rock image was substituted.

The runtime uses one instanced stone draw, capped at 96 stones on high and 32 on low. It fetches the local JSON directly into Three.js BufferGeometry, retaining the existing procedural stone only during loading or offline asset failure. No additional GLTFLoader or external service is used. The group diagnostics expose `rockAsset` and `rockTriangles` for browser verification.

`source.json` records author, source URLs, original MD5 checksums, conversion details, and license URL. Rebuild with `python3 scripts/acquire_world_rocks.py`; downloads are checked against Poly Haven's API checksums. Shipped geometry plus three textures and metadata total approximately 0.74 MB.
