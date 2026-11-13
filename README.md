# ashmit27j.github.io

Ashmit's Desk (a 3D portfolio) at the root. The design + dev portfolio is at `/dev/` and the cybersecurity terminal is at `/cyber/`.

```
index.html              Ashmit's Desk (exported from the Claude artifact)
dev/index.html          the design + dev portfolio (self-contained; opens on the MacBook)
cyber/index.html        the terminal (opens on the ThinkPad), built from terminal/terminal.html (do not edit by hand)
terminal/terminal.html  the terminal source: content lives in the DATA object at the top of its <script>
certs/                  the Google certificates as JPGs (the terminal also carries inline copies)
audio/ video/ books/ awards/   media the desk loads
tools/build.py          rebuilds cyber/index.html and the inline terminal copy inside index.html
.nojekyll               tells GitHub Pages to serve files as they are
```

## How the pieces connect

- On `*.github.io`, clicking the MacBook loads `dev/index.html` in the desk's portal and clicking the ThinkPad loads `/cyber/`.
- Anywhere else (the Claude artifact, a local preview), the desk uses inline copies of both, because claude.ai artifact links refuse to load inside iframes.
- The terminal posts `{type: "terminal:exit"}` on `exit` or Esc, and the desk closes the portal. The desk posts `{type: "terminal:focus"}` when the iframe loads. The terminal plays its reboot log every time it is opened.

## Deploy

This replaces whatever is in the `ashmit27j.github.io` repo now. The first two git commands keep a backup branch of the old site.

```bash
git clone https://github.com/ashmit27j/ashmit27j.github.io && cd ashmit27j.github.io
git switch -c old-site && git push -u origin old-site && git switch main
git rm -r -q . && git clean -fdq
unzip -o ../ashmit27j.github.io.zip -d .
git add -A && git commit -m "Ashmit's Desk: final" && git push
```

Then in the repo on GitHub, go to Settings → Pages → Build and deployment and set Source: **Deploy from a branch**, Branch: **main**, folder **/ (root)**. Pages goes live in about a minute at https://ashmit27j.github.io/.

To preview locally first, run `python3 -m http.server 8000` in the folder and open http://localhost:8000/. Opening index.html directly from disk also works, but it then uses the inline copies.

## Edit the terminal

1. Change text in `terminal/terminal.html` (the `DATA` object). Lines starting with `TODO` show up as TODOs in the terminal.
2. Run `python3 tools/build.py`. It writes `cyber/index.html` and refreshes the inline copy in `index.html`.
3. Commit and push.

## Edit the dev portfolio

Edit `dev/index.html` directly; that is what the live site loads. The inline copy inside `index.html` (`window.__PORTFOLIO_HTML`) is only used outside github.io. Re-export the desk from Claude if you want it updated as well.

## Hidden things

- `67` in the terminal.
- Destructive commands (`rm -rf /`, `sudo shutdown`, …) in the terminal get a jumpscare.
