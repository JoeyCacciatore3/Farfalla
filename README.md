# Farfalla Portfolio

Vite + React portfolio site.

## Artwork assets

### Source files (`attachments (2)/`)

There are **7 unique** source images:

| File | Notes |
|------|--------|
| `IMG_20260322_220746.jpg` | JPG — also used as hero (`public/hero-landscape.jpg`) |
| `IMG_20260322_221912.jpg` | JPG |
| `IMG_20260322_221942.jpg` | JPG |
| `IMG_20260322_221901.heic` | Convert to web JPG |
| `IMG_20260322_221922.heic` | Convert to web JPG |
| `IMG_20260322_221926.heic` | Convert to web JPG |
| `IMG_20260322_221935.heic` | Convert to web JPG |

### Built files (`public/artwork/`)

After running the conversion script, you get `work-01.jpg` … `work-07.jpg` (stable names for the gallery slideshow).

```bash
npm run convert-artwork
```

This copies the three JPGs and converts the four HEIC files using the `heic-convert` package (see [scripts/convert-artwork.mjs](scripts/convert-artwork.mjs)).

Gallery entries are defined in `src/data/content.js` as **`WORKS`** (each item: `id`, `img`, `hue`). Add `work-08.jpg`, etc., and append to `WORKS` when you have more art.

### Adding more photos

1. Drop new files into `attachments (2)/` (JPG/PNG/WebP preferred; HEIC will need conversion).
2. Extend `scripts/convert-artwork.mjs` or copy files manually into `public/artwork/` with sequential names.
3. Add matching objects to `WORKS` in `content.js`.

## Deployment and links

### Live site (GitHub Pages)

Pushing to **`main` does not update the public site by itself**. The site is published from the **`gh-pages`** branch (built output).

- **Manual:** after `git push`, run **`npm run deploy`** (runs `vite build` then publishes `dist/` to `gh-pages`).
- **Automatic:** pushes to `main` also run [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml), which builds and deploys the same way.

In **GitHub → Settings → Pages**, source should be **Deploy from a branch** → **`gh-pages`** → **`/(root)`**.

Live URL: [https://joeycacciatore3.github.io/Farfalla/](https://joeycacciatore3.github.io/Farfalla/) — hard-refresh or use a private window if you still see an old build (cached JS).

- **`import.meta.env.BASE_URL`** comes from [vite.config.js](vite.config.js) (`base`). Production builds use `/Farfalla/` so the app is served under that path (e.g. GitHub Pages). In-app section links from other routes use this base so hashes resolve to `/Farfalla/#works`, not `/#works`.
- **`KIT` and `SOCIALS` in `content.js`:** use full `https://` URLs for external links. Placeholder `#` entries render as disabled (no `target="_blank"` junk tabs). Instagram/TikTok are set; add YouTube/Pinterest when you have URLs.

### Optional: GitHub Pages SPA refresh

Direct visits or refresh on a client route like `/Farfalla/sicilia` can 404 on static hosting. Mitigations: add a [SPA redirect `404.html`](https://github.com/rafgraph/spa-github-pages) pattern, or host behind a server that rewrites all routes to `index.html`.
