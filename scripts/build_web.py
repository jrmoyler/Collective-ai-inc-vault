#!/usr/bin/env python3
"""Assemble web/index.html from web-src/. No notes are baked in: the page loads them from Supabase after sign-in."""
import os
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = os.path.join(R, "web-src")
head = open(os.path.join(src, "a_head.html"), encoding="utf-8").read()
js = "".join(open(os.path.join(src, f), encoding="utf-8").read() + "\n" for f in ["b_data.js", "c_campus.js", "d_live.js", "e_boot.js"])
html = head + "<script>\n" + js + "</script>\n</body></html>\n"
os.makedirs(os.path.join(R, "web"), exist_ok=True)
open(os.path.join(R, "web", "index.html"), "w", encoding="utf-8").write(html)
print(f"web/index.html {len(html)//1024} KB")
