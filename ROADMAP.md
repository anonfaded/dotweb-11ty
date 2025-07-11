# Website Eleventy Refactor Roadmap

## 1. Project Setup
- [x] Initialize new Eleventy v3 project structure inside this folder (`Website-11ty/`)
- [x] Set up npm, install dependencies (Eleventy, SCSS, PostCSS, esbuild, etc.)
- [x] Configure Eleventy for ESM, Nunjucks, passthrough copy, etc.
- [x] Create .gitignore for Website-11ty

## 2. Componentisation
- [ ] Identify and list all major sections/components (header, hero, features, etc.)
- [ ] Break up index.html and inner pages into Nunjucks components in `src/_includes/components/`
- [ ] Move section-specific HTML into components

## 3. Styles Refactor
- [x] Set up SCSS pipeline (`src/styles/main.scss`)
- [x] Extract section-specific styles into partials (e.g., `_header.scss`, `_hero.scss`)
- [x] Set up PostCSS (Autoprefixer, cssnano)
- [x] Implement theme layer (`_theme.scss`, `theme.json`)

## 4. JavaScript Refactor
- [x] Modularize JS (split by section/component)
- [x] Set up esbuild to bundle JS (`src/scripts/index.js` → `dist/js/bundle.js`)

## 5. Content Migration
- [ ] Migrate all content/pages to Eleventy collections/layouts
- [ ] Ensure all legal/inner pages are ported

## 6. Build & Utility Scripts
- [x] Add npm scripts: dev, build, clean, lint

## 7. QA & Pixel Perfection
- [ ] Compare original and refactored site side-by-side (desktop & mobile)
- [ ] Fix any layout, spacing, or behavior discrepancies

## 8. Documentation
- [ ] Write README with setup, usage, and re-skinning instructions

---

**Next step:** Begin migration of HTML, CSS, and JS from the original Website/ folder into the new Eleventy structure, refactoring into components and partials as you go. 