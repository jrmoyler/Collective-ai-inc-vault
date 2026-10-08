#!/usr/bin/env python3
"""Assemble web/index.html from web-src/. No notes are baked in: the page loads them from Supabase after sign-in."""
import os
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = os.path.join(R, "web-src")
head = open(os.path.join(src, "a_head.html"), encoding="utf-8").read()
def _need(f):
    # A typo in the module list used to drop that module silently. Now the build stops and names it.
    if not os.path.exists(os.path.join(src, f)):
        raise SystemExit(f"build_web: web-src/{f} is listed but missing")
    return True
js = "".join(open(os.path.join(src, f), encoding="utf-8").read() + "\n" for f in ["b_data.js", "b_districts.js", "b_hud.js", "b_engine.js", "b_audio.js", "b_identity.js", "b_sentinel.js", "b_world_assets.js", "b_landscape.js", "b_buildings.js","b_vfx.js", "c_campus.js", "c_npc.js", "d_live.js", "d_reader.js","g_journey.js", "g_ux.js", "f_title.js", "e_boot.js"] if _need(f))
# One version source: package.json. The title footer and the shortcut sheet read VAULT_BUILD.version.
import json
version = json.load(open(os.path.join(R, "package.json"), encoding="utf-8")).get("version", "0.0.0")
# Content hash: the service worker cache is keyed on it (sw.js?v=<hash>), so every deploy that changes the page or the
# Warden portrait manifest rotates the offline cache, even when package.json keeps its version.
import hashlib
_h = hashlib.sha1((head + js).encode("utf-8"))
_gm = os.path.join(R, "web", "assets", "guides", "manifest.json")
if os.path.exists(_gm):
    _h.update(open(_gm, "rb").read())
build_hash = _h.hexdigest()[:12]
js = "const VAULT_BUILD=Object.freeze({version:" + json.dumps(version) + ",hash:" + json.dumps(build_hash) + "});\n" + js
html = head + "<script>\n" + js + "</script>\n</body></html>\n"
os.makedirs(os.path.join(R, "web"), exist_ok=True)
open(os.path.join(R, "web", "index.html"), "w", encoding="utf-8").write(html)
print(f"web/index.html {len(html)//1024} KB")


# Auth-free design reference, with the exact same mesh factory as the campus.
reference = open(os.path.join(src, "sentinel_reference.html"), encoding="utf-8").read()
modules = "\n".join(open(os.path.join(src, f), encoding="utf-8").read() for f in ["b_identity.js", "b_sentinel.js"])
open(os.path.join(R, "web", "sentinels.html"), "w", encoding="utf-8").write(reference.replace("<!-- SENTINEL_MODULES -->", "<script>" + modules + "</script>"))
import shutil
shutil.copyfile(os.path.join(R, "docs", "sentinel-concept.webp"), os.path.join(R, "web", "sentinel-concept.webp"))
