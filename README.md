# Lucía Martín Jiménez — Systems Engineering Portfolio

Static one-page portfolio that accompanies the CV: experience, five V-model projects
with detail panels, strategy/research work, education and contact.
Plain HTML, CSS and JavaScript. No build step, no dependencies.

## Preview locally

```bash
cd lucia-martin-portfolio
python3 -m http.server 8000
# open http://localhost:8000
```

Opening `index.html` directly in a browser also works.

## Files

| Path | Purpose |
|---|---|
| `index.html` | All page content (single source of truth for every section and V-model phase) |
| `styles.css` | Design tokens, layout, responsive rules, reduced motion and print stylesheet |
| `script.js` | Mobile menu, active-section highlight, V-model detail dialog, footer year |
| `assets/profile.jpg` | Portrait (taken from the CV) |
| `assets/logos/` | Company / university logo tiles — see `assets/logos/README.md` |
| `assets/favicon.svg` | Browser icon |
| `assets/og-image.svg` | Link-preview image (some platforms prefer PNG; export one at 1200×630 if needed) |

## Editing

- **Contact:** section `#contact` in `index.html` (email, LinkedIn). Phone is intentionally not published.
- **Experience / education:** sections `#experience` and `#education`.
- **V-model phases:** each `<li class="phase">` holds the card text and a `.phase-detail` block.
  The dialog copies that block, and the print view shows it, so edit it in one place only.
- **Logos:** replace the placeholder SVGs in `assets/logos/` with official files using the same names.
- **Colours / fonts:** CSS variables at the top of `styles.css`.

## Print / PDF

Print the page (Ctrl/Cmd + P → Save as PDF). Navigation and buttons are hidden and all
phase details are expanded automatically.

## Publishing on GitHub Pages (manual)

1. Create a repository on GitHub (e.g. `username.github.io` for a root site).
2. Upload the contents of this folder (or push them with your usual Git workflow).
3. Repository → Settings → Pages → Source: `main` branch, `/ (root)`.
4. After publishing, update `og:image` in `index.html` to the absolute URL if you want link previews.
