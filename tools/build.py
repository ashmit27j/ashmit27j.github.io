#!/usr/bin/env python3
"""Build every copy of the two portfolios from their sources.

Sources (edit these):
  portfolio/portfolio.html   design + dev portfolio, one self-contained page
  terminal/terminal.html     cybersecurity terminal
  index.html                 the desk (its two inline copies are rewritten here)

Outputs:
  index.html                 desk with fresh inline copies (used on claude.ai / local preview)
  dev/index.html             portfolio for https://ashmit27j.github.io/dev/
  cyber/index.html           terminal for https://ashmit27j.github.io/cyber/
  out/standalone.html        portfolio for the standalone Claude artifact, with the
                             videos that artifact doesn't host embedded as data URIs
Run: python3 tools/build.py   (add --check to only verify everything is in sync)
"""
import base64, json, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
PORTFOLIO = ROOT / "portfolio/portfolio.html"
TERMINAL = ROOT / "terminal/terminal.html"
DESK = ROOT / "index.html"
# Videos the standalone artifact doesn't host as files, so they're embedded there.
STANDALONE_EMBED = ["video/nosh-promo.mp4", "video/unedited-promo.mp4"]

def read(p): return p.read_text(encoding="utf-8")

def js_string(s):  # double-quoted JS string, safe inside <script>
    return (json.dumps(s, ensure_ascii=False)
            .replace("</", "<\\/").replace("\u2028", "\\u2028").replace("\u2029", "\\u2029"))

def js_template(s):  # template literal body, safe inside <script>
    return (s.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")
            .replace("</", "<\\/"))

def desk_with(desk, portfolio, terminal):
    k = "<script>window.__PORTFOLIO_HTML = "
    a = desk.index(k) + len(k)
    b = desk.index("</script>", a)
    desk = desk[:a] + js_string(portfolio) + ";\n" + desk[b:]
    k = "    cyber: `"
    a = desk.index(k, desk.index("var l3 = {")) + len(k)
    i = a
    while desk[i] != "`":
        i += 2 if desk[i] == "\\" else 1
    return desk[:a] + js_template(terminal) + desk[i:]

def for_dev(p):  # /dev/ is one level down; videos live at /video/
    return re.sub(r'"(video/[\w.-]+\.mp4)"', r'"../\1"', p)

def standalone(p):
    entries = "".join('"%s": "data:video/mp4;base64,%s", ' % (v, base64.b64encode((ROOT / v).read_bytes()).decode())
                      for v in STANDALONE_EMBED)
    k = "window.IMG = {"
    assert p.count(k) == 1, "IMG map not found"
    return p.replace(k, k + entries)

def main():
    portfolio, terminal = read(PORTFOLIO), read(TERMINAL)
    outs = {
        DESK: desk_with(read(DESK), portfolio, terminal),
        ROOT / "dev/index.html": for_dev(portfolio),
        ROOT / "cyber/index.html": terminal,
        ROOT / "out/standalone.html": standalone(portfolio),
    }
    if "--check" in sys.argv:
        stale = [str(p.relative_to(ROOT)) for p, s in outs.items()
                 if p.parent.name != "out" and (not p.exists() or read(p) != s)]  # out/ is local-only
        print("in sync" if not stale else "out of date: " + ", ".join(stale))
        sys.exit(1 if stale else 0)
    for p, s in outs.items():
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(s, encoding="utf-8")
        print("wrote %-22s %6.2f MB" % (p.relative_to(ROOT), p.stat().st_size / 1e6))

if __name__ == "__main__":
    main()
