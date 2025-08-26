## Copilot Instructions for Portafolio_v02

### Project Overview
Portafolio_v02 is a modern React + Vite + TypeScript portfolio showcasing professional work and serving as a frontend experimentation sandbox. Built with TailwindCSS, shadcn/ui, Framer Motion, and lucide-react.

### Architecture & Structure
- **src/components/ui/**: Reusable primitives extending shadcn/ui. Follow composition over inheritance.
- **src/pages/**: Route components (About, Contact, Home, Settings, Work). Keep lean, delegate to components.
- **src/styles/**: TailwindCSS utilities in `index.css`, global styles in `globals.css`.
- **figma/**: Design source of truth for layout and visual decisions.

### Developer Workflows
```bash
npm install     # Setup (Node.js 18+)
npm run dev     # Development server (Vite)
npm run build   # Production build
npm run preview # Preview build locally
```

### Coding Standards & Patterns
- **Always provide 2+ implementation approaches** with trade-offs when suggesting solutions
- **Component Design**: Functional components with TypeScript. Use props interfaces for reusability.
- **Styling**: Tailwind-first. Custom animations in `index.css` with semantic class names.
- **Accessibility**: Include ARIA labels and semantic HTML in UI components.
- **Performance**: Lazy load components and images where appropriate.

### Animation & Interaction Guidelines
- Use Framer Motion for complex animations, CSS transitions for simple ones
- Follow design system timing: `duration-200` for micro-interactions, `duration-500` for page transitions
- Prefer `transform` over layout-changing properties for performance

### Professional Baseline Standards
- **Documentation**: Add JSDoc/TSDoc comments above React components with props descriptions
- **Component Format**: 
  ```tsx
  /**
   * FloatingNavigation renders the frosted glass nav panel.
   * Props:
   * - currentPage: string – active page key.
   * - onNavigate: fn – callback for navigation.
   */
  ```
- **Logging & Dev Experience**: Use Vite dev server logs during development
- **Code Quality**: Maintain ESLint + Prettier configuration (add if missing)
- **Git Commits**: Use conventional commits (`feat:`, `fix:`, `chore:`)
- **Versioning**: Update changelog in README.md for notable changes, use git tags/releases for milestones
- **CLI Scripts**: Centralize commands in package.json:
  ```json
  {
    "lint": "eslint src --fix",
    "format": "prettier --write .",
    "storybook": "storybook dev -p 6006",
    "generate:component": "plop --plopfile scripts/component-generator.js",
    "setup": "npm install && npm run build && npm run lint"
  }
  ```
- **Storybook Integration**: Add for component isolation, visual testing, and documentation - run components in isolation, showcase props/states/variants
- **Plop.js Scaffolding**: Use Plop.js or custom Node.js scripts to scaffold new components/pages
- **Configuration Files**: Maintain at root (vite.config.ts, tailwind.config.ts, tsconfig.json, .eslintrc.js, .prettierrc, .env)
- **Git Hooks**: Use Husky + lint-staged for pre-commit formatting/linting
- **Deployment**: Document Vercel/Netlify steps, include live demo link in README, optimize bundle with Vite plugins
- **Attributions**: Maintain Attributions.md for credits to UI kits, icons, images
- **Package Lock Versioning**: Keep package-lock.json versioned for reproducibility
- **Custom Animations**: Define custom animations in Tailwind (e.g., `.animate-float`)
- **Animation Libraries**: Use Framer Motion for page transitions, GSAP for complex timelines

### Professional Checklist
- [ ] ESLint + Prettier configured
- [ ] Storybook added for component logging & docs
- [ ] JSDoc comments on components
- [ ] Changelog updated per release
- [ ] npm scripts include lint/format/build/test
- [ ] Conventional commits enforced
- [ ] Tailwind + shadcn UI tokens defined
- [ ] Deployment documented and reproducible

### Examples & Teaching Approach
When creating new components:
1. **Option A**: Extend existing shadcn/ui component
2. **Option B**: Build custom primitive with better flexibility
3. Explain when to choose each approach based on requirements

### Integration Points
- **Design**: Reference Figma wireframes before implementing
- **Icons**: Use lucide-react with consistent sizing (`size={24}` default)
- **Routing**: React Router patterns in `main.tsx`

### References
- `README.md`: Setup and project overview
- `src/guidelines/Guidelines.md`: Design system conventions
- `figma/`: Visual design reference
- `Professional_Baseline.md`: Professional standards and workflows

---
If any section is unclear or incomplete, ask for feedback on any unclear or incomplete sections to iterate.
