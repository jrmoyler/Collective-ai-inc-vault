#!/usr/bin/env python3
"""Raise today's daily note in the live vault, once per day.

  scripts/daily_note.py            create today's note if it is missing (live API)
  scripts/daily_note.py --print    print the note it would write, touch nothing
  scripts/daily_note.py --date 2026-10-09

The date is the calendar day in VAULT_DAILY_TZ (default America/New_York). Running it twice is safe: an existing
note is never overwritten. The new day is also listed at the top of [[Daily Notes]].

Token: VAULT_SYNC_TOKEN (CI) or VAULT_AGENT_TOKEN / .vault-agent (an agent running it by hand).
"""
import datetime as dt
import json
import os
import re
import sys
import urllib.error
import urllib.request
from zoneinfo import ZoneInfo

API = os.environ.get("VAULT_API_URL", "https://vczwabqqmiskrqxmiomi.supabase.co/functions/v1/agent-api")
TZ = os.environ.get("VAULT_DAILY_TZ", "America/New_York")
HUB = "Daily Notes"
DATE_LINE = re.compile(r"^- \[\[(\d{4}-\d{2}-\d{2})\]\]", re.M)


def token():
    t = os.environ.get("VAULT_SYNC_TOKEN") or os.environ.get("VAULT_AGENT_TOKEN", "")
    if not t:
        for p in (".vault-agent", os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".vault-agent")):
            if os.path.exists(p):
                t = open(p).read()
                break
    if not t.strip():
        sys.exit("missing VAULT_SYNC_TOKEN or VAULT_AGENT_TOKEN")
    return t.strip()


def call(tok, action, **body):
    req = urllib.request.Request(API, data=json.dumps({"action": action, **body}).encode(),
                                 headers={"Authorization": "Bearer " + tok, "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return None
        sys.exit(f"{action}: HTTP {e.code} {e.read().decode()[:300]}")


def heading(day):
    return f"{day:%A}, {day:%b} {day.day}, {day.year}"


def board(tasks):
    """Counts and the open high-priority work, straight from the live task table. No figures are made up here."""
    order = ["open", "claimed", "review", "blocked"]
    counts = {s: sum(1 for t in tasks if t.get("status") == s) for s in order}
    lines = ["| Status | Tasks |", "|---|---|"] + [f"| {s} | {counts[s]} |" for s in order]
    hot = [t for t in tasks if t.get("status") == "open" and t.get("priority") == "high"][:5]
    if hot:
        lines += ["", "High-priority open tasks:"]
        lines += [f"- `{t['id']}` {str(t.get('title', '')).replace('|', '/')}" for t in hot]
    return "\n".join(lines)


def body(day, tasks, prev):
    linked = [f"- Previous day: [[{prev}]]"] if prev else []
    linked += [f"- [[{HUB}]]", "- [[Daily Capture Template]]", "- [[005 — Operations MOC]]"]
    return "\n".join([
        f"# {heading(day)}", "",
        "## Top 3",
        "- [ ] ",
        "- [ ] ",
        "- [ ] ", "",
        f"## Board when this note opened ({TZ})",
        board(tasks) if tasks is not None else "unknown: the task board was not reachable when this note was raised.", "",
        "## Log",
        "- ", "",
        "## Decisions", "",
        "## Linked",
        *linked, "",
    ])


def hub_body(existing, date):
    """Insert the date at the top of the hub's list, newest first. Keeps everything else in the note."""
    if existing is None:
        return "\n".join([
            f"# {HUB}", "",
            "One note per calendar day, raised automatically at midnight by `scripts/daily_note.py`. Newest first.", "",
            "## Days",
            f"- [[{date}]]", "",
            "## Linked",
            "- [[005 — Operations MOC]]",
            "- [[Daily Capture Template]]", "",
        ])
    if f"[[{date}]]" in existing:
        return None
    m = DATE_LINE.search(existing)
    if m:
        return existing[:m.start()] + f"- [[{date}]]\n" + existing[m.start():]
    return existing.rstrip() + f"\n\n## Days\n- [[{date}]]\n"


def main(argv):
    day = dt.datetime.now(ZoneInfo(TZ)).date()
    if "--date" in argv:
        day = dt.date.fromisoformat(argv[argv.index("--date") + 1])
    name = day.isoformat()
    dry = "--print" in argv
    tok = None if dry else token()
    if not dry and call(tok, "notes.get", name=name):
        print(f"{name} already exists")
        return
    tasks = None if dry else (call(tok, "tasks.list") or {}).get("tasks")
    prev = None
    if not dry:
        hub = call(tok, "notes.get", name=HUB)
        hub_text = hub["note"]["body"] if hub else None
        dates = sorted(d for d in DATE_LINE.findall(hub_text or "") if d < name)
        prev = dates[-1] if dates else None
    else:
        hub_text = None
    fm = {"type": "daily", "tags": ["daily"], "date": name}
    text = body(day, tasks, prev)
    if dry:
        print(text)
        return
    r = call(tok, "notes.upsert", name=name, folder="Daily", fm=fm, body=text, summary="daily note raised")
    print(json.dumps(r))
    nb = hub_body(hub_text, name)
    if nb is not None:
        call(tok, "notes.upsert", name=HUB, folder="Daily", fm={"type": "moc", "tags": ["moc", "daily"]}, body=nb, summary=f"listed {name}")


if __name__ == "__main__":
    main(sys.argv[1:])
