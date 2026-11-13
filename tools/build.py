#!/usr/bin/env python3
"""Rebuild the terminal after editing terminal/terminal.html.

Writes cyber/index.html (served at /cyber/ on GitHub Pages) and refreshes the inline
copy inside index.html (used when the desk runs anywhere other than *.github.io).
Run from the repo root:  python3 tools/build.py
"""
import pathlib, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
src = (ROOT / "terminal/terminal.html").read_text(encoding="utf8")
(ROOT / "cyber/index.html").write_text(src, encoding="utf8")

def tl(s):  # text -> safe inside a JS template literal
    return s.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${").replace("</", "<\\/")

idx = ROOT / "index.html"
html = idx.read_text(encoding="utf8")
key = "    cyber: `"
i = html.find(key)
if i < 0:
    sys.exit("index.html: could not find the inline terminal (cyber: `...`)")
start = i + len(key)
j = start
while True:  # the closing backtick is the first one not escaped by an odd run of backslashes
    j = html.index("`", j)
    k, n = j - 1, 0
    while html[k] == "\\":
        n += 1; k -= 1
    if n % 2 == 0:
        break
    j += 1
idx.write_text(html[:start] + tl(src) + html[j:], encoding="utf8")
print("wrote cyber/index.html and refreshed the terminal inside index.html")
