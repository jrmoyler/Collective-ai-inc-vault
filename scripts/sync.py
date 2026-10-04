#!/usr/bin/env python3
"""Keep the git vault and the live vault (Supabase) in step.

  scripts/sync.py push [--range BEFORE..AFTER] [--as NAME]  repo -> live, changed notes only (CI, on push)
  scripts/sync.py push-file PATH                             one note -> live with your own agent token (Claude Code hook)
  scripts/sync.py pull                                       live -> repo, notes edited since the last pull (CI, every 30 min)

Tokens: VAULT_SYNC_TOKEN (repo-sync agent) for push/pull; VAULT_AGENT_TOKEN or .vault-agent for push-file.
"""
import json
import os
import subprocess
import sys
import urllib.request

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import vaultlib as V  # noqa: E402

API = os.environ.get("VAULT_API_URL", "https://vczwabqqmiskrqxmiomi.supabase.co/functions/v1/agent-api")
MARK = os.path.join(V.VAULT, ".last_pull")


def token(kind):
    if kind == "sync":
        t = os.environ.get("VAULT_SYNC_TOKEN", "")
    else:
        t = os.environ.get("VAULT_AGENT_TOKEN", "")
        if not t:
            for p in (os.path.join(os.getcwd(), ".vault-agent"), os.path.join(V.REPO, ".vault-agent")):
                if os.path.exists(p):
                    t = open(p).read().strip()
                    break
    if not t:
        sys.exit(f"missing {'VAULT_SYNC_TOKEN' if kind == 'sync' else 'VAULT_AGENT_TOKEN'}")
    return t.strip()


def call(tok, action, **body):
    req = urllib.request.Request(API, data=json.dumps({"action": action, **body}).encode(),
                                 headers={"Authorization": "Bearer " + tok, "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        sys.exit(f"{action}: HTTP {e.code} {e.read().decode()[:300]}")


def load(path):
    full = path if os.path.isabs(path) else os.path.join(V.REPO, path)
    rel = os.path.relpath(full, V.VAULT)
    fm, body = V.parse_note(open(full, encoding="utf-8").read())
    name = fm.pop("title", None) or os.path.basename(full)[:-3]
    return {"name": name, "folder": os.path.dirname(rel).replace(os.sep, "/"), "fm": fm, "body": body}


def push(rng=None, as_=None):
    if rng:
        out = subprocess.run(["git", "diff", "--name-only", "--diff-filter=AM", rng, "--", "vault"], cwd=V.REPO, capture_output=True, text=True, check=True).stdout
        files = [f for f in out.splitlines() if f.endswith(".md")]
    else:
        files = [os.path.join("vault", n["path"]) for n in V.read_vault()]
    if not files:
        print("nothing to push")
        return
    notes = [load(f) for f in files if os.path.exists(os.path.join(V.REPO, f))]
    tok = token("sync")
    for i in range(0, len(notes), 150):
        r = call(tok, "notes.bulk", notes=notes[i:i + 150], quiet=len(notes) > 20, **({"as": as_} if as_ else {}))
        print("pushed", r.get("count"))
    if len(notes) > 20:
        call(tok, "log", kind="synced", text=f"{len(notes)} notes from a repo commit")


def push_file(path):
    n = load(path)
    r = call(token("agent"), "notes.upsert", name=n["name"], folder=n["folder"], fm=n["fm"], body=n["body"], summary="edited in the repo")
    print(json.dumps(r))


def pull():
    since = open(MARK).read().strip() if os.path.exists(MARK) else None
    r = call(token("sync"), "notes.export", **({"since": since} if since else {}))
    rows = r.get("notes", [])
    existing = {n["name"]: n for n in V.read_vault()}
    changed = 0
    newest = since or ""
    for row in rows:
        newest = max(newest, row["updated_at"])
        old = existing.get(row["name"])
        path = V.note_path(row["folder"], row["name"])
        text = V.dump_note(row["name"], row.get("fm") or {}, row["body"])
        if old and os.path.join(V.VAULT, old["path"]) != path:
            os.remove(os.path.join(V.VAULT, old["path"]))
        if not os.path.exists(path) or open(path, encoding="utf-8").read() != text:
            os.makedirs(os.path.dirname(path), exist_ok=True)
            open(path, "w", encoding="utf-8").write(text)
            changed += 1
    tasks = call(token("sync"), "tasks.list").get("tasks", [])
    os.makedirs(os.path.join(V.REPO, "tasks"), exist_ok=True)
    lines = ["# Task board (snapshot)", "", "The live board is in the app and in Supabase. This file is a read-only snapshot written by the sync job.", "",
             "| ID | Status | Priority | Agent | Title | Note |", "|---|---|---|---|---|---|"]
    for t in tasks:
        lines.append(f"| {t['id']} | {t['status']} | {t['priority']} | {t.get('agent') or ''} | {t['title'].replace('|', '/')} | {t.get('note') or ''} |")
    board = "\n".join(lines) + "\n"
    bp = os.path.join(V.REPO, "tasks", "BOARD.md")
    if not os.path.exists(bp) or open(bp).read() != board:
        open(bp, "w").write(board)
    if newest:
        open(MARK, "w").write(newest)
    V.write_index(V.build_index(V.read_vault()))
    print(f"pulled {len(rows)} rows, {changed} files changed")


if __name__ == "__main__":
    a = sys.argv[1:]
    if not a:
        sys.exit(__doc__)
    if a[0] == "push":
        rng = a[a.index("--range") + 1] if "--range" in a else None
        as_ = a[a.index("--as") + 1] if "--as" in a else None
        push(rng, as_)
    elif a[0] == "push-file":
        push_file(a[1])
    elif a[0] == "pull":
        pull()
    else:
        sys.exit(__doc__)
