"""Canon and note-quality checks for the vault (CLAUDE.md "Writing notes", "Linking", "Canon", "Voice").

Used by scripts/build.py. Every finding is (rule, note name, detail).
Errors fail `build.py --strict`; warnings are printed only.

Rules
  h1          body must start with an H1 that names the note: "# <exact name>", or a display form
              of it ("# Aether Link" for Aether Link Division, "# Director_X — CODENAME"). Daily notes
              need an H1; the 🏠 Home template note is exempt
  fm          frontmatter needs `type` and non-empty `tags`
  spelling    "Vector Shift" must be written VectorShift, also inside source quotes (a line that
              states the rule and names VectorShift is allowed)
  voice       banned words outside quotes (> lines, "quoted spans"), code and lines that list three
              or more banned words (the rule itself)
  veto        a line that states the Civic Core veto as live (no removed/superseded/former wording)
              needs "Superseded" in the note or a [[Civic Core Fiduciary Veto]] link
  pending     a pending division (21-30) described as active or operating
  orphan      no other note links here (home, root MOC and Daily notes are exempt)
  dead-end    the note links to nothing
  archive     a 10 - Archive note must say why it is archived and what replaced it
"""
import re

BANNED = ["delve", "leverage", "robust", "seamless", "transformative", "empower", "elevate",
          "game-changing", "cutting-edge", "innovative", "tapestry"]
# Word forms count (leveraged, empowers, seamlessly); "elevated" and "elevation" as plain physical
# height are common in campus notes, so the elevate rule checks the verb forms only.
BANNED_RE = re.compile(
    r"\b(delv(?:e|es|ed|ing)|leverag(?:e|es|ed|ing)|robust(?:ly|ness)?|seamless(?:ly)?|"
    r"transformative|empower(?:s|ed|ing|ment)?|elevat(?:e|es|ing)|game-changing|"
    r"cutting-edge|innovative(?:ly)?|tapestry)\b", re.I)
PENDING = ["Astral Forge", "Materia Nova", "Aqua Meridian", "Nourish Grid", "Sovereign Key",
           "Praesidium Mutual", "Mercantile Circuit", "Human Foundry", "Volta Grid", "Hearth Nexus"]
ACTIVE_RE = re.compile(r"\b(is|are|now)\s+(active|operating|operational|live)\b", re.I)
NEGATION_RE = re.compile(r"\b(not|never|pending|chartered|planned|no longer)\b", re.I)
VETO_GONE_RE = re.compile(r"\b(removed|superseded|former|historical|no longer|withdrawn|removal)\b", re.I)
VETO_RE = re.compile(r"Civic Core[^.\n]{0,80}\bveto\b|\bveto\b[^.\n]{0,80}Civic Core", re.I)
LINK_RE = re.compile(r"\[\[([^\]|#]+)")
ARCHIVE_WHY_RE = re.compile(r"\b(archived|superseded|replaced|retired)\b", re.I)
ARCHIVE_NOW_RE = re.compile(r"\b(replaced by|superseded by|see|now lives|current)\b|\[\[", re.I)

EXEMPT_ORPHAN = {"🏠 Home", "000 — Collective AI Knowledge Base"}
ERROR_RULES = {"h1", "fm", "spelling", "voice", "veto", "pending", "orphan", "dead-end", "archive"}


def _strip_quoted(line):
    """Drop inline code, "double quoted" spans and wikilink targets; those are names or quotes."""
    line = re.sub(r"`[^`]*`", "", line)
    line = re.sub(r"“[^”]*”|\"[^\"]*\"", "", line)
    line = re.sub(r"\[\[[^\]]*\]\]", "", line)
    return line


def _h1_ok(name, folder, h1):
    if not h1:
        return False
    if folder == "Daily":
        return True
    return h1 == name or h1 in name or h1.startswith(name)


def _lines_outside_code(body):
    fence = False
    for i, line in enumerate(body.split("\n")):
        if line.lstrip().startswith("```"):
            fence = not fence
            continue
        if not fence:
            yield i + 1, line


def check(notes):
    """notes: [{folder, name, fm, body}] -> list of (rule, name, detail)."""
    names = {n["name"] for n in notes}
    inbound = {n["name"]: 0 for n in notes}
    out = []
    for n in notes:
        targets = {t.strip() for t in LINK_RE.findall(n["body"])} - {n["name"]}
        n["_links"] = targets & names
        for t in n["_links"]:
            inbound[t] += 1

    for n in notes:
        name, body, fm = n["name"], n["body"], n["fm"] or {}
        home = body.strip() == "{{HOME}}"
        first = next((l for l in body.split("\n") if l.strip()), "")
        h1 = first.strip()[2:].strip() if first.startswith("# ") else ""
        if not home and not _h1_ok(name, n["folder"], h1):
            out.append(("h1", name, f"first line is {first.strip()[:60]!r}"))
        if not fm.get("type") or not fm.get("tags"):
            out.append(("fm", name, "frontmatter needs type and tags"))
        veto_ok = "Superseded" in body or "[[Civic Core Fiduciary Veto]]" in body \
            or name == "Civic Core Fiduciary Veto"
        for ln, line in enumerate(body.split("\n"), 1):
            if "Vector Shift" in line and "VectorShift" not in line:
                out.append(("spelling", name, f"line {ln}: 'Vector Shift'"))
        for ln, line in _lines_outside_code(body):
            plain = _strip_quoted(line)
            is_quote = line.startswith(">") and not re.match(r">\s*\[!", line)
            lists_rule = re.search(r"\bbanned\b", line, re.I)
            hits = list(BANNED_RE.finditer(plain))
            if len(hits) >= 3:
                lists_rule = True
            if not is_quote and not lists_rule:
                for m in hits:
                    out.append(("voice", name, f"line {ln}: '{m.group(0)}'"))
            if VETO_RE.search(line) and not veto_ok and not VETO_GONE_RE.search(line):
                out.append(("veto", name, f"line {ln}: Civic Core veto without Superseded or link"))
            if any(p in line for p in PENDING) and ACTIVE_RE.search(line) \
                    and not NEGATION_RE.search(line):
                out.append(("pending", name, f"line {ln}: pending division described as active"))
        if name not in EXEMPT_ORPHAN and n["folder"] != "Daily" and inbound[name] == 0:
            out.append(("orphan", name, "no other note links here"))
        if not home and not n["_links"]:
            out.append(("dead-end", name, "links to no note"))
        if n["folder"].startswith("10 - Archive") and not (
                ARCHIVE_WHY_RE.search(body) and ARCHIVE_NOW_RE.search(body)):
            out.append(("archive", name, "must say why it is archived and what replaced it"))
    for n in notes:
        n.pop("_links", None)
    return out


def report(findings, limit=12):
    """Print a grouped report. Returns the number of errors."""
    by = {}
    for rule, name, detail in findings:
        by.setdefault(rule, []).append((name, detail))
    errors = sum(len(v) for k, v in by.items() if k in ERROR_RULES)
    print(f"canon: {len(findings)} findings, {errors} errors")
    for rule in sorted(by):
        rows = by[rule]
        print(f"  [{rule}] {len(rows)}")
        for name, detail in rows[:limit]:
            print(f"    {name}: {detail}")
    return errors
