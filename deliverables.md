# deliverables.md — for **Mueed**

## 1. Objective
Refactor both codebases inside **Website/** and **Invoice-Generator/** into a modular Eleventy (11ty) pipeline.  
The refactor must keep desktop and mobile views pixel-identical to the originals, while enabling fast re-skinning for four future sites (two marketing pages + two client-facing versions).

## 2. High-level tasks
### Website/
- Break monolithic HTML into components: header, hero, features, pricing, testimonials, footer, etc.
- Extract section-specific CSS and JS into their own files; leave global utilities in shared files.
- Build an Eleventy v3 pipeline:
  * Nunjucks components in `src/_includes/components/`
  * SCSS entry `src/styles/main.scss` → PostCSS (Autoprefixer, cssnano) → `dist/css/main.css`
  * JS modules bundled with **esbuild** (`src/scripts/index.js` → `dist/js/bundle.js`, ES2017 target)
  * Theme layer: `src/styles/_theme.scss` + `src/_data/theme.json` for colour palette, fonts, logo
- Add npm scripts: `dev`, `build`, `clean`, `lint`
- Write a concise README with setup and re-skinning instructions

### Invoice-Generator/
- Perform the same componentisation + Eleventy refactor so the tool can be branded per client

## 3. Technical stack & conventions
- Eleventy v3 (ESM config)
- SCSS + PostCSS (Autoprefixer, cssnano)
- esbuild for JavaScript bundling (ES2017 target)
- Passthrough copy for `dist/` assets
- Component naming: kebab-case, e.g. `hero.njk`, `_hero.scss`, `hero.js`
- Directory skeleton (Website example):
