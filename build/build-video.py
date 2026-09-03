#!/usr/bin/env python3
"""Rebuild video.html from animations.jsx + scenes.jsx.

video.html is a self-contained export: a small HTML shell plus a manifest of
gzipped, base64'd assets (React, react-dom, motion, the dc-runtime, fonts) and
one entry holding the app itself. That app entry is animations.jsx and
scenes.jsx concatenated inside an IIFE, with the JSX left raw — support.js
transpiles it in the browser.

Only the app entry is rebuilt here. Everything else in the manifest is carried
over untouched, so this stays a drop-in replacement for the exported file.

Run it after editing either source file:

    python3 build/build-video.py

Why this exists: the app entry inside the export went stale once already,
silently, and kept shipping an old build long after the sources had moved on.
Regenerating it from source is the only way to be sure the two agree.
"""

import base64
import gzip
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
VIDEO = ROOT / "video.html"
ANIMATIONS = ROOT / "animations.jsx"
SCENES = ROOT / "scenes.jsx"

# scenes.jsx pulls the timeline primitives off window when it runs standalone.
# Inside the bundle animations.jsx shares its scope, so that line would
# redeclare consts already defined above it — the export drops it.
DESTRUCTURE = (
    "const { Stage, Sprite, useTime, useSprite, Easing, interpolate, animate, clamp } = window;"
)
GLOBALS_NOTE = "/* globals provided by animations.jsx above in this bundle scope */"
HEADER = "// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)"

MANIFEST_RE = r'(<script type="__bundler/manifest">)(.*?)(</script>)'
# The app entry is the only manifest bundle that defines the embed bridge.
APP_MARKER = b"KnomeePlayer"

# ── Poppins ──────────────────────────────────────────────────────────────────
# The film sets one family and one only: DISPLAY = "'Poppins', system-ui,
# sans-serif". The export inlined @font-face for JetBrains Mono and Plus Jakarta
# Sans — neither of which the film asks for — and for Poppins left behind two
# preconnect hints to fonts.googleapis.com and no stylesheet to go with them.
# So Poppins never arrived, anywhere, and every viewer has been reading the film
# in whatever system-ui resolves to on their machine.
#
# The faces are carried in the file rather than fetched, so this cannot come
# back: video.html now needs no network at all. Only the weights the film
# actually uses are included (400/500/600/700/800 and one italic) — the whole
# set would be six times the size for faces nothing renders.
FONT_DIR = ROOT / "assets" / "fonts"
FONT_FACES = [
    ("normal", 400, "poppins-latin-400-normal.woff2"),
    ("normal", 500, "poppins-latin-500-normal.woff2"),
    ("normal", 600, "poppins-latin-600-normal.woff2"),
    ("normal", 700, "poppins-latin-700-normal.woff2"),
    ("normal", 800, "poppins-latin-800-normal.woff2"),
    ("italic", 400, "poppins-latin-400-italic.woff2"),
]
# The faces go in the export's own <helmet>, beside the @font-face the export
# wrote for JetBrains Mono, and not in the shell's <head>. The dc-runtime
# rewrites the document out of the <x-dc> block on boot, so anything in the
# shell head is gone by the time the film paints — a style put there survives in
# the file and does nothing in the browser, which is the worst of both.
#
# The <x-dc> block is an escaped string, so the rules carry no quote, newline or
# backslash anywhere: unquoted family name, unquoted url(), no format() hint.
# They then read the same however the surrounding text is escaped. Dropping
# format() costs nothing — it is optional, and every target sniffs woff2.
HELMET = "<helmet>"
# Matches the quoted form an earlier version of this script wrote too, so a
# rebuild cleans that one out instead of stacking a second copy beside it.
FONT_STYLE_RE = r'<style id="?knomee-poppins"?>.*?</style>\n?'


def poppins_style() -> str:
    rules = []
    for style, weight, name in FONT_FACES:
        path = FONT_DIR / name
        if not path.exists():
            sys.exit(f"missing {path.relative_to(ROOT)} — the film would fall back to system-ui")
        data = base64.b64encode(path.read_bytes()).decode()
        rules.append(
            "@font-face{font-family:Poppins;font-style:%s;font-weight:%d;"
            "font-display:block;src:url(data:font/woff2;base64,%s)}" % (style, weight, data)
        )
    return "<style id=knomee-poppins>" + "".join(rules) + "</style>"


def build_app_bundle() -> bytes:
    animations = ANIMATIONS.read_text(encoding="utf-8")
    scenes = SCENES.read_text(encoding="utf-8")

    if DESTRUCTURE not in scenes:
        sys.exit(
            "scenes.jsx: expected window-destructuring line not found.\n"
            "The export's bundling convention may have changed — re-check "
            "build/build-video.py against a fresh export before trusting it."
        )
    scenes = scenes.replace(DESTRUCTURE, GLOBALS_NOTE, 1)

    source = (
        ";(function(){\n"
        + HEADER
        + "\n\n"
        + animations.strip()
        + "\n\n\n\n"
        + scenes.strip()
        + "\n\n\n})();\n"
    )
    return source.encode("utf-8")


def main() -> None:
    html = VIDEO.read_text(encoding="utf-8")
    match = re.search(MANIFEST_RE, html, re.S)
    if not match:
        sys.exit("video.html: bundler manifest not found — is this still an export?")

    manifest = json.loads(match.group(2))

    app_key = None
    for key, entry in manifest.items():
        blob = base64.b64decode(entry["data"])
        if entry.get("compressed"):
            blob = gzip.decompress(blob)
        if APP_MARKER in blob:
            app_key = key
            was = len(blob)
            break
    if app_key is None:
        sys.exit("video.html: app bundle not found in manifest")

    bundle = build_app_bundle()
    # mtime=0 keeps the output byte-identical for identical sources: gzip
    # otherwise stamps the current time into its header, so every run would
    # produce a different file and every rebuild a spurious diff.
    manifest[app_key] = {
        **manifest[app_key],
        "compressed": True,
        "data": base64.b64encode(gzip.compress(bundle, 9, mtime=0)).decode(),
    }

    rebuilt = html[: match.start(2)] + json.dumps(manifest) + html[match.end(2) :]

    # Drop any block a previous run left, so rebuilds stay idempotent.
    rebuilt = re.sub(FONT_STYLE_RE, "", rebuilt, flags=re.S)
    if HELMET not in rebuilt:
        sys.exit("video.html: no <helmet> to put the fonts in — is this still an export?")
    rebuilt = rebuilt.replace(HELMET, HELMET + poppins_style(), 1)

    if rebuilt == html:
        print("video.html already up to date")
        return

    VIDEO.write_text(rebuilt, encoding="utf-8")
    print(f"app bundle {was:,} -> {len(bundle):,} bytes")
    print(f"video.html {len(html):,} -> {len(rebuilt):,} chars")
    print(f"poppins    {len(FONT_FACES)} faces embedded")


if __name__ == "__main__":
    main()
