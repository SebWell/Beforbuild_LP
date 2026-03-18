# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page for BeForBuild — Plateforme SaaS pour les promoteurs immobiliers. 6 modules métier : Foncier, Bilan, Contrats, Planning, Documents, Commercial. IA intégrée, signature électronique. 100% static site — single `index.html` with inline CSS, HTML, and vanilla JS. No framework, no build step, no npm dependencies.

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
- **HTML** — Semantic sections: hero, pain points, pourquoi BeForBuild, modules (6 cards), IA, process, pricing, FAQ, contact, footer
- **JavaScript** — Inline `<script>` block for: mobile menu toggle, scroll animations (IntersectionObserver), FAQ accordions, smooth scrolling

### Key Sections (by ID)

- `hero` — Hero with badge, H1, description, CTAs, stats (6 modules / IA intégrée / Signature électronique), logo
- `modules` — 6 product modules in 3×2 grid: Foncier, Bilan, Contrats, Planning, Documents, Commercial
- `ia` — Section IA dédiée (fond sombre) : RAG documentaire, OCR automatique, Agent IA transversal
- `process` — 3-step process (démo → import → pilotage)
- `pricing` — Single card: BeForBuild Pro, sur devis
- `contact` — CTA section with Cal.com booking link + mailto

### CTAs & Links

- **Demander une démo** → `https://cal.com/sebastien-mignot/rendez-vous-decouverte-avec-beforbuild.com`
- **Se connecter** → `https://app.beforbuild.com`
- **Nous contacter** → `mailto:contact@beforbuild.com`

### Styling

- CSS custom properties defined in `:root` for theming
- Responsive design with media queries (1024px, 768px breakpoints)
- Animations via CSS transitions + JS IntersectionObserver
- No external CSS framework

### Assets

- `photos/logo/` — Logos (BeForBuild)
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
- `llms.txt` — LLM-friendly site description (6 modules, pricing, links)
- `sitemap.xml` — SEO sitemap
