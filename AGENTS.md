# AGENT Guide

Purpose: Coordinate refactoring work using the project’s plan, style baseline, and UI blueprint.

## Primary Directives
- Execute the refactoring following the implementation steps in `docs/Ring_UI_System_Implementation_Plan.md`.
- Apply coding style preferences from `Professional_Baseline.md`.
- Preserve and align the core idea with `docs/Rings_UI_blueprint.md`.

## Operating Process
- Read the three source documents before making changes and keep them open for reference.
- Work in small, focused changes that map to explicit steps from the plan.
- Keep changes minimal and scoped; avoid unrelated fixes or opportunistic refactors.
- When ambiguity arises, defer to the blueprint for intent and the baseline for style.
- Update or add documentation when steps change behavior, public APIs, or structure.

## Quality and Style
- Match existing patterns; do not introduce new frameworks or conventions unless the plan requires it.
- Follow naming, structure, comments, and formatting rules in `Professional_Baseline.md`.
- Prefer clarity over cleverness; remove dead code; keep public surfaces stable unless the plan dictates otherwise.
- Run format and lint tasks if configured (e.g., Prettier/ESLint) and resolve warnings relevant to your changes.

## Validation
- Build and run locally if applicable; verify the specific behavior impacted by each step.
- Add or update tests adjacent to changed code when practical; do not add broad test scaffolding unless required by the plan.
- Definition of Done for each step:
  - Plan step implemented and cross-checked with the blueprint’s intent.
  - Code conforms to the baseline style.
  - Lint/format pass without new warnings relevant to the change.
  - Docs updated where behavior or usage changed.

## Guardrails
- No destructive actions (e.g., mass renames, large-scale folder moves) unless explicitly called for by the plan.
- Avoid touching files outside the refactor scope.
- Keep diffs readable and reviewable; prefer multiple small changes over one large change.

## References
- Plan: `docs/Ring_UI_System_Implementation_Plan.md`
- Style Baseline: `Professional_Baseline.md`
- Core Idea / Blueprint: `docs/Rings_UI_blueprint.md`

