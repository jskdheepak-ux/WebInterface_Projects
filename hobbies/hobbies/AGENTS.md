# AGENTS.md

## Project

Hobbylog is a small React 19 single-page hobby tracker built with Vite. The UI uses an editorial serif visual style with CSS custom properties and responsive layouts.

## Commands

- `npm run dev` starts the Vite development server.
- `npm run build` creates the production build.
- `npm run lint` runs ESLint across the project.
- `npm run preview` serves the production build locally.
- No test framework or test script is configured.

## Code Map

- `src/main.jsx` is the React entry point and renders `App` inside `StrictMode`.
- `src/App.jsx` owns the page markup, starter data, local hobby state, filtering, adding hobbies, completion toggling, and progress statistics.
- `src/App.css` contains page and component styles, design tokens, animations, and responsive breakpoints.
- `src/index.css` contains global reset and typography defaults.
- `public/` contains static assets referenced by the app.

## Working Conventions

- Use functional React components and hooks with immutable state updates.
- Keep JavaScript/JSX; do not introduce TypeScript unless the task requires it.
- Preserve the existing CSS custom-property design tokens, kebab-case class names, and `active`/`is-done` state modifiers.
- Keep responsive behavior aligned with the existing `800px` and `450px` breakpoints.
- React Compiler is enabled in `vite.config.js`; avoid adding manual `useMemo`/`useCallback` unless there is a demonstrated need and it matches the existing code.
- Keep changes focused on the owning file and preserve the current public behavior unless the request explicitly changes it.

## Current Behavior Notes

- Hobby state is local only and resets on reload.
- Starter content, date text, weekly time, profile initials, and footer year are hardcoded in `src/App.jsx`.
- Filter categories are currently a fixed list rather than derived from hobby data.
- New hobbies use the `New` category and default presentation values.

## Validation

After changes, run `npm run lint` and, for production-facing changes, `npm run build`. Since no tests are configured, mention that limitation when reporting validation.

See [README.md](README.md) for the repository's existing documentation.
