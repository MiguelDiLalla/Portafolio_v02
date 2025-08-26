# Portafolio\_v02

A modern, evolving portfolio project built with **React + Vite + TypeScript**, integrating TailwindCSS and modular design principles. This project is intended as both a professional portfolio and a sandbox for experimenting with state-of-the-art frontend technologies, design workflows, and deployment strategies.

---

## 🚀 Project Overview

* **Purpose**: Showcase projects, skills, and interactive demos in a polished, fast, and scalable portfolio.
* **Stack**:

  * [Vite](https://vitejs.dev/) – Lightning-fast bundler and dev server.
  * [React](https://react.dev/) – Modern UI framework.
  * [TypeScript](https://www.typescriptlang.org/) – Strongly typed JavaScript for maintainability.
  * [TailwindCSS](https://tailwindcss.com/) – Utility-first styling.
  * [Lucide React](https://lucide.dev/) & [shadcn/ui](https://ui.shadcn.com/) – Iconography and UI components.
  * [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/) – Animation libraries.
  * **Professional Tools**: ESLint, Prettier, Husky, lint-staged, Plop.js for code quality and automation.
* **Design Process**: Wireframed in Figma, built iteratively.

---

## 📂 Project Structure

```bash
c:\Users\User\Projects_Unprotected\Portafolio_v02
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── README.md
│   ├── folder_tree.txt
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── index.css
│   │   ├── globals.css
│   └── figma/
│       └── Custom Personal Website Wireframe.zip
```

> 🔍 For a full and updated view of the folder structure, see [`folder_tree.txt`](./folder_tree.txt).

---

## ⚙️ Getting Started

### Prerequisites

* Node.js (v18 or newer)
* npm (v9+) or yarn/pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Professional development tools
npm run lint          # ESLint with auto-fix
npm run format        # Prettier code formatting
npm run setup         # Full setup (install + lint + format)
npm run generate:component  # Generate new components with Plop.js
```

---

## 📜 Guidelines & Documentation

* [Guidelines.md](./src/guidelines/Guidelines.md) – Project guidelines and conventions.
* [Professional_Baseline.md](./Professional_Baseline.md) – Professional development standards and workflows.
* [.github/copilot-instructions.md](./.github/copilot-instructions.md) – AI coding agent instructions.
* [Attributions.md](./src/Attributions.md) – Acknowledgements and references.

---

## 📖 Changelog

### [0.2.0] - 2025-08-27

* **Professional Baseline Implementation**: Added ESLint, Prettier, Husky, lint-staged for code quality.
* **Modern Husky Setup**: Implemented 2025 Husky workflow with `npx husky init` and direct hook editing.
* **Component Scaffolding**: Added Plop.js generator for creating new components with TypeScript interfaces.
* **Animation Libraries**: Integrated Framer Motion and GSAP for advanced animations.
* **AI Agent Instructions**: Created comprehensive `.github/copilot-instructions.md` for consistent AI development.
* **Professional Scripts**: Added lint, format, setup, and generate:component npm scripts.
* **Git Hooks**: Automatic code formatting and linting on every commit.

### [0.1.0] - 2025-08-27

* Initialized project with Vite + React + TypeScript + TailwindCSS.
* Added base scaffolding and Figma wireframes.
* Integrated lucide-react, shadcn/ui, and motion/react for animations.
* Established project documentation system.

---

## 🛠️ Roadmap

* [x] **Professional Development Setup** - ESLint, Prettier, Husky, component generation.
* [x] **AI Agent Instructions** - Comprehensive Copilot guidance for consistent development.
* [ ] Build and refine portfolio landing page (hero, about, projects).
* [ ] Add reusable UI components with shadcn/ui.
* [ ] Integrate animation patterns with framer-motion.
* [ ] Connect to GitHub projects dynamically.
* [ ] Optimize for deployment (Netlify / Vercel).
* [ ] Add dark mode toggle.
* [ ] Consider Storybook integration for component documentation.

---

## 🤝 Contributing

This is a personal project, but external contributions, issues, and suggestions are welcome.

---

## 📄 License

This project is currently unlicensed and for personal/professional showcase purposes only.
