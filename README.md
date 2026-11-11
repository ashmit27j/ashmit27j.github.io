# ashmit27j.github.io

Ashmit's Desk (a 3D portfolio) at the root, with two portfolios inside it:

| URL | What | Built from |
|---|---|---|
| `/` | Ashmit's Desk | `index.html` |
| `/dev/` | Design + Dev Portfolio (the MacBook) | `portfolio/portfolio.html` |
| `/cyber/` | Cybersecurity terminal (the ThinkPad) | `terminal/terminal.html` |

```
index.html                desk; also carries inline copies of both portfolios
portfolio/portfolio.html  SOURCE: dev portfolio, one self-contained page (data in window.PORTFOLIO)
terminal/terminal.html    SOURCE: terminal (content in the DATA object at the top of its <script>)
tools/build.py            writes every copy from the two sources
dev/index.html            built, do not edit
cyber/index.html          built, do not edit
audio/ awards/ books/ video/   desk + portfolio media
.github/workflows/pages.yml    runs build.py and deploys on every push to main
```

## Editing

1. Edit `portfolio/portfolio.html` or `terminal/terminal.html` (never `dev/`, `cyber/`, or the inline copies in `index.html`).
2. `python3 tools/build.py` refreshes `dev/index.html`, `cyber/index.html`, both inline copies in `index.html`, and `out/standalone.html` (the standalone Claude artifact's page, with two videos embedded). `python3 tools/build.py --check` reports anything out of sync.
3. Commit and push. The workflow rebuilds and deploys in about a minute.

## How the pieces connect

- On `*.github.io` the desk opens `dev/index.html` and `/cyber/` in its portal iframe. Elsewhere (claude.ai, local file) it uses the inline copies, because artifact links refuse to load in iframes.
- Videos are referenced as `video/<name>.mp4`. In the desk they resolve against the desk's folder. `dev/index.html` rewrites them to `../video/`. The standalone artifact embeds the ones it doesn't host.
- Bridge messages: `terminal:exit` / `terminal:focus` for the terminal; `portfolio:exit`, `portfolio:open {portal}`, `portfolio:focus {scene, sound}`, `portfolio:theme` for the dev portfolio.

## Settings

Settings → Pages → Build and deployment → Source: **GitHub Actions**.
