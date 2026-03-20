# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Beforbuild_teaser is a **Remotion-based video generation project** for creating promotional/teaser videos for BeForBuild. It uses React components to declaratively define video compositions rendered to MP4.

This is a subdirectory of the main BeForBuild application (`../`), but is an independent project with its own `package.json`.

## Commands

```bash
pnpm dev        # Open Remotion Studio (interactive preview at localhost:3000)
pnpm build      # Bundle the video project (remotion bundle)
pnpm lint       # ESLint + TypeScript type checking
```

## Architecture

- **`src/index.ts`** — Remotion entry point, registers the root component
- **`src/Root.tsx`** — Defines all `<Composition>` entries (video specs: resolution, fps, duration)
- **`src/Composition.tsx`** — Main video component (currently empty placeholder)
- **`remotion.config.ts`** — Remotion CLI config (JPEG format, overwrite enabled)
- **`public/`** — Static assets (images, fonts, logos) used in compositions

### Adding a new video

1. Create a component in `src/` that uses Remotion hooks (`useCurrentFrame`, `useVideoConfig`, `interpolate`, `spring`, etc.)
2. Register it as a `<Composition>` in `Root.tsx` with id, dimensions, fps, and duration
3. Preview in Remotion Studio (`pnpm dev`)

## Stack

- **Remotion 4.0** — Declarative video rendering framework
- **React 19** — Component model
- **TypeScript 5.9** — Strict mode enabled

## Conventions

- Video default: 1280x720, 30fps
- Output format: JPEG frames (configured in `remotion.config.ts`)
- Formatting: Prettier (2-space indent, bracket spacing, no tabs)
- ESLint: Remotion flat config (`@remotion/eslint-config-flat`)
