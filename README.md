# Eventseiten.ch Eleventy Migration

This project is a pixel-perfect migration of the original Eventseiten.ch website to a modern, maintainable Eleventy (11ty) static site generator setup.

## Codebase Structure

- **/Website/** — The original legacy site (HTML, CSS, JS). Used as the reference for all migration work.
- **/src/** — The new Eleventy codebase.
  - **_includes/components/** — All Nunjucks components, organized by section (header, footer, home, etc.).
  - **_includes/layouts/** — Base and page layouts.
  - **styles/** — SCSS source files, organized by component and global styles. Compiled to `main.css`.
  - **scripts/** — JS files for interactivity and animations.
  - **.njk** — Top-level Nunjucks page templates.
  - **_data/** — Global data/configuration (e.g., theme).
  - **images/** — Static assets.

## Migration Approach

- Every section is migrated 1:1 from `/Website`, including all HTML, CSS, and JS (global, inline, and page-specific styles).
- Components and SCSS are organized for maintainability, but the result is visually and functionally identical to the old site.
- No unrelated refactoring or changes are made.

## Development

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. **View the site:**
   Open [http://localhost:8080](http://localhost:8080) in your browser.

---

- For any migration, always reference `/Website` for original structure and styles.
- All new work should use the component system and SCSS organization in `/src`.
