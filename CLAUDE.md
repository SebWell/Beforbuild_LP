# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page for BeForBuild — Plateforme SaaS de gestion de projets immobiliers et BTP. 100% static site — single `index.html` with inline CSS, HTML, and vanilla JS. No framework, no build step, no npm dependencies.

**Ecosystem:** sebastien-mignot.com (AMO) · buildoto.com (audit & automatisation) · beforbuild.com (SaaS)

## Commands

```bash
# Local development — no build needed
python3 -m http.server 8000        # Serve locally at http://localhost:8000

# Deploy to Cloudflare Pages
npx wrangler pages deploy .        # Deploy root directory as-is
```

## Architecture

**Stack:** Pure HTML + CSS + JavaScript (vanilla). No framework, no build tool. Deployed on Cloudflare Pages.

### Single File Site (`index.html`)

Everything is in one file:
- **CSS** — Inline `<style>` block with CSS custom properties (variables) for colors, fonts, spacing
- **HTML** — Semantic sections: hero, pain points, pourquoi BeForBuild, modules, process, pricing, prestations complémentaires, FAQ, contact, footer
- **JavaScript** — Inline `<script>` block for: mobile menu toggle, scroll animations (IntersectionObserver), accordions, smooth scrolling

### Key Sections (by ID)

- `hero` — Hero with badge, H1, description, CTAs, stats (3 modules / IA intégrée / 17 ans)
- `modules` — 3 product modules: ChantierDoc, ImmoContrat, ImmoRisk (accordions)
- `process` — 3-step process (inscription gratuite → configuration → pilotage)
- `pricing` — Single card: Accès anticipé gratuit
- `contact` — CTA section with registration link

### Styling

- CSS custom properties defined in `:root` for theming
- Responsive design with media queries
- Animations via CSS transitions + JS IntersectionObserver
- No external CSS framework

### Assets

- `photos/logo/` — Logos (BeForBuild, Buildoto, SM AMO, technologies)
- `photos/og-image.png` — Image Open Graph
- `photos/plan-architecte.webp` — Background section modules
- `favicon.png`, `apple-touch-icon.png` — Favicons

### Deployment

- Cloudflare Pages configured via `wrangler.toml` (serves `.` as root)
- Security headers in `_headers`
- SEO: `robots.txt`, `sitemap.xml`, `llms.txt`

## Key Files

- `index.html` — The entire site (HTML + CSS + JS inline)
- `_headers` — Cloudflare security headers
- `wrangler.toml` — Cloudflare Pages deployment config
