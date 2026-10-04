"""Shared helpers for export.py and build.py.

Frontmatter is YAML. Dates stay strings on load so a note round-trips
byte-for-byte through export -> build.
"""
import json
import os
import re

import yaml

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VAULT = os.path.join(REPO, "vault")
INDEX = os.path.join(VAULT, "_index.json")
LINK_RE = re.compile(r"\[\[([^\]|#]+)")


class StrLoader(yaml.SafeLoader):
    """SafeLoader that leaves timestamps as plain strings."""


for ch, resolvers in list(StrLoader.yaml_implicit_resolvers.items()):
    StrLoader.yaml_implicit_resolvers[ch] = [
        r for r in resolvers if r[0] != "tag:yaml.org,2002:timestamp"
    ]


class StrDumper(yaml.SafeDumper):
    pass


def _str_presenter(dumper, data):
    if "\n" in data:
        return dumper.represent_scalar("tag:yaml.org,2002:str", data, style="|")
    return dumper.represent_scalar("tag:yaml.org,2002:str", data)


StrDumper.add_representer(str, _str_presenter)


def sanitize(name: str) -> str:
    """File-system safe file stem. Em dashes and emoji are fine."""
    out = name.replace("/", "-").replace(":", " -").replace("\\", "-")
    out = re.sub(r'[<>"|?*\x00-\x1f]', "", out)
    return out.strip().rstrip(".")


def note_path(folder: str, name: str) -> str:
    return os.path.join(VAULT, folder, sanitize(name) + ".md")


def dump_note(name: str, fm: dict, body: str) -> str:
    front = {"title": name}
    for k, v in fm.items():
        if k != "title":
            front[k] = v
    y = yaml.dump(front, Dumper=StrDumper, allow_unicode=True,
                  sort_keys=False, default_flow_style=False, width=10000)
    if not body.endswith("\n"):
        body += "\n"
    return "---\n" + y + "---\n" + body


def parse_note(text: str):
    """Return (fm, body). fm keeps 'title'."""
    if not text.startswith("---\n"):
        return {}, text
    end = text.find("\n---\n", 4)
    if end < 0:
        return {}, text
    fm = yaml.load(text[4:end + 1], Loader=StrLoader) or {}
    body = text[end + 5:]
    return fm, body


def links_of(body: str):
    seen, out = set(), []
    for m in LINK_RE.findall(body):
        t = m.strip()
        if t and t not in seen:
            seen.add(t)
            out.append(t)
    return out


def read_vault(root: str = VAULT):
    """Walk vault/ and return notes as [{folder, name, fm, body, path}]."""
    notes = []
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = sorted(d for d in dirnames if not d.startswith("."))
        for fn in sorted(filenames):
            if not fn.endswith(".md"):
                continue
            full = os.path.join(dirpath, fn)
            rel = os.path.relpath(full, root)
            folder = os.path.dirname(rel).replace(os.sep, "/")
            with open(full, encoding="utf-8") as f:
                fm, body = parse_note(f.read())
            name = fm.pop("title", None) or fn[:-3]
            notes.append({"folder": folder, "name": name, "fm": fm,
                          "body": body, "path": rel.replace(os.sep, "/")})
    notes.sort(key=lambda n: (n["folder"], n["name"]))
    return notes


def build_index(notes):
    idx = {}
    for n in notes:
        idx[n["name"]] = {
            "path": "vault/" + n["path"],
            "folder": n["folder"],
            "type": n["fm"].get("type"),
            "tags": n["fm"].get("tags", []),
            "links": links_of(n["body"]),
        }
    return idx


def write_index(idx, path: str = INDEX):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(idx, f, ensure_ascii=False, indent=1, sort_keys=True)
        f.write("\n")


def unresolved_links(notes):
    names = {n["name"] for n in notes}
    bad = []
    for n in notes:
        for t in links_of(n["body"]):
            if t not in names:
                bad.append((n["name"], t))
    return bad
