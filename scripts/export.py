#!/usr/bin/env python3
"""Export notes_full.json -> vault/<folder>/<name>.md (one-time seed, or re-import).

Usage: scripts/export.py <notes_full.json> [--clean]

--clean removes every existing .md under vault/ first. Without it, files are
overwritten in place and nothing else is touched.
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import vaultlib as V  # noqa: E402


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(2)
    src = sys.argv[1]
    clean = "--clean" in sys.argv
    with open(src, encoding="utf-8") as f:
        data = json.load(f)
    notes = data["notes"] if isinstance(data, dict) else data

    if clean and os.path.isdir(V.VAULT):
        for dirpath, _, files in os.walk(V.VAULT):
            for fn in files:
                if fn.endswith(".md"):
                    os.remove(os.path.join(dirpath, fn))

    seen = {}
    for n in notes:
        p = V.note_path(n["folder"], n["name"])
        if p in seen:
            sys.exit(f"file collision after sanitize: {n['name']!r} vs {seen[p]!r}")
        seen[p] = n["name"]
        os.makedirs(os.path.dirname(p), exist_ok=True)
        with open(p, "w", encoding="utf-8") as f:
            f.write(V.dump_note(n["name"], n["fm"], n["body"]))

    written = V.read_vault()
    V.write_index(V.build_index(written))
    print(f"exported {len(notes)} notes -> {len(written)} files; index written")


if __name__ == "__main__":
    main()
