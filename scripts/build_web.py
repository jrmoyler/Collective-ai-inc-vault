#!/usr/bin/env python3
"""Assemble web/index.html from web-src/. No notes are baked in: the page loads them from Supabase after sign-in."""
import os
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = os.path.join(R, "web-src")
head = open(os.path.join(src, "a_head.html"), encoding="utf-8").read()
js = "".join(open(os.path.join(src, f), encoding="utf-8").read() + "\n" for f in ["b_data.js", "b_districts.js", "b_engine.js", "b_audio.js", "b_identity.js", "b_sentinel.js", "b_world_assets.js", "c_campus.js", "c_npc.js", "d_live.js", "g_journey.js", "f_title.js", "e_boot.js"] if os.path.exists(os.path.join(src, f)))
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
