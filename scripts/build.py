#!/usr/bin/env python3
"""Build step for the vault.

  scripts/build.py [--template PATH] [--out dist/index.html] [--json PATH] [--strict]

1. Reads every vault/**/*.md.
2. Regenerates vault/_index.json.
3. Validates [[wikilinks]]; prints unresolved ones. --strict exits 1 on any.
4. If --template is given, writes the viewer HTML by replacing __NOTES__ with
   the notes JSON (same shape as notes_full.json: folder, name, fm, body).
5. --json also writes that notes JSON to a file (useful for diffing).
"""
import argparse
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import vaultlib as V  # noqa: E402


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--template", help="viewer template with __NOTES__ placeholder")
    ap.add_argument("--out", default=os.path.join(V.REPO, "dist", "index.html"))
    ap.add_argument("--json", help="also write notes JSON here")
    ap.add_argument("--strict", action="store_true", help="exit 1 on unresolved links")
    a = ap.parse_args()

    notes = V.read_vault()
    V.write_index(V.build_index(notes))
    bad = V.unresolved_links(notes)
    links = sum(len(V.links_of(n["body"])) for n in notes)
    print(f"notes: {len(notes)}  links: {links}  unresolved: {len(bad)}")
    for src, tgt in bad[:50]:
        print(f"  unresolved: [[{tgt}]] in {src}")

    payload = [{"folder": n["folder"], "name": n["name"], "fm": n["fm"], "body": n["body"]}
               for n in notes]
    js = json.dumps(payload, ensure_ascii=False)
    if a.json:
        with open(a.json, "w", encoding="utf-8") as f:
            f.write(js)
    if a.template:
        with open(a.template, encoding="utf-8") as f:
            t = f.read()
        if "__NOTES__" not in t:
            sys.exit("template has no __NOTES__ placeholder")
        html = t.replace("__NOTES__", js.replace("</", "<\\/"))
        os.makedirs(os.path.dirname(a.out), exist_ok=True)
        with open(a.out, "w", encoding="utf-8") as f:
            f.write(html)
        print(f"wrote {a.out} ({len(html)//1024} KB)")
    if a.strict and bad:
        sys.exit(1)


if __name__ == "__main__":
    main()
