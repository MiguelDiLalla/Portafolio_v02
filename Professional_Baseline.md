# Professional Baseline for Web Development Projects

This document defines a **professional baseline** of practices for frontend projects (React + Vite + TailwindCSS), inspired by high standards in data science workflows (logging, documentation, reproducibility, CLI design). These practices can be used as guidance and integrated into your VS Code / GitHub Copilot prompts to maintain consistency across the project.

---

## 🔹 1. Logging & Developer Experience

* Use **Vite** dev server logs during development (default: `npm run dev`).
* Add **eslint + prettier** to enforce consistent coding style and auto-fixes.
* Use **Error Lens** VS Code extension to surface errors inline.
* Consider adding **Storybook** to serve as a "visual log" of components:

  * Run components in isolation.
  * Showcase props, states, and visual variants.
  * Document usage inline with examples.

---

## 🔹 2. Documentation Standards

* **README.md** at root: project overview, setup, roadmap, changelog.
* **Component-level docs**:

  * Add JSDoc/TSDoc comments above each React component.
  * Example:

    ```tsx
    /**
     * FloatingNavigation renders the frosted glass nav panel.
     * Props:
     * - currentPage: string – active page key.
     * - onNavigate: fn – callback for navigation.
     */
    ```
* **Guidelines.md**: conventions for naming, styling, folder structure.
* **Changelog.md** (or inline in README): track all notable changes.
* **Attributions.md**: credits for UI kits, icons, images.

---

## 🔹 3. CLI & Scripts

* Centralize commands in `package.json`:

  ```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --fix",
    "format": "prettier --write .",
    "storybook": "storybook dev -p 6006",
    "generate:component": "plop --plopfile scripts/component-generator.js"
  }
  ```
* Add **Plop.js** or custom Node.js scripts to scaffold new components/pages.
* Provide **one-run setup** (e.g., `npm run setup`) that installs, builds, lints, and runs.

---

## 🔹 4. Styling & Design System

* Use **TailwindCSS** for consistent styling with utility-first classes.
* Add **shadcn/ui** or similar for professional component primitives.
* Define theme tokens in `globals.css` (colors, typography, spacing, radii).
* Integrate **Lucide React** for iconography.
* Add **Framer Motion** for page transitions, **GSAP** for complex timelines.
* Define **custom animations** in Tailwind (e.g., `.animate-float`).

---

## 🔹 5. Versioning & Reproducibility

* Use **conventional commits**:

  * `feat: add frosted glass navigation panel`
  * `fix: correct endless scroll bug`
  * `chore: update dependencies`
* Use **Git tags/releases** for major milestones.
* Keep `package-lock.json` (npm) or `pnpm-lock.yaml` versioned.
* Update **changelog** at each release.

---

## 🔹 6. Configs & Standards

* Maintain configs at root:

  * `vite.config.ts` – bundler.
  * `tailwind.config.ts` – styling system.
  * `tsconfig.json` – TypeScript rules.
  * `.eslintrc.js` – linting.
  * `.prettierrc` – formatting.
  * `.env` – environment variables (never commit secrets).
* Enforce formatting and linting on commit (use **Husky** + **lint-staged**).

---

## 🔹 7. Deployment & Presentation

* Deploy with **Vercel** or **Netlify** (fast for Vite/React).
* Include **live demo link** in README.
* Document deployment steps in README for reproducibility.
* Optimize bundle size and assets (Vite plugins, image compression).

---

## ✅ Summary Checklist

* [ ] ESLint + Prettier configured.
* [ ] Storybook added for component logging & docs.
* [ ] JSDoc comments on components.
* [ ] Changelog updated per release.
* [ ] npm scripts include lint/format/build/test.
* [ ] Conventional commits enforced.
* [ ] Tailwind + shadcn UI tokens defined.
* [ ] Deployment documented and reproducible.

---

This baseline ensures your **frontend projects feel as professional and stylish as your AI/data science pipelines** — with consistency, documentation, automation, and polish baked in.
