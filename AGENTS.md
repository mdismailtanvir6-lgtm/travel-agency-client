<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Travel Agency Client — Agent Guide

Frontend for a travel agency site. Currently an early scaffold: the App Router has a single placeholder page, shadcn/ui components are installed, and light/dark theming is wired up.

## Commands

```bash
npm run dev     # start dev server at http://localhost:3000 (Turbopack)
npm run build   # production build
npm start       # serve production build
npm run lint    # ESLint (eslint-config-next core-web-vitals)
```

There is no test runner configured yet.

Use `npx shadcn@latest add <component>` to add shadcn/ui components rather than writing equivalent primitives by hand.

## Stack

- **Next.js 16.4.6** App Router with `cacheComponents` and `partialPrefetching` enabled (`next.config.mjs`). These change caching/rendering defaults — consult `node_modules/next/dist/docs/` before using data-fetching, caching, or route APIs.
- **React 19.3** with the React Compiler enabled (`reactCompiler: true`).
- **JavaScript, not TypeScript.** Source files are `.js` / `.jsx`; `components.json` sets `"tsx": false`. Resolve imports with the `@/*` alias (`jsconfig.json` → `src/*`).
- **Tailwind CSS v4** configured entirely in `src/app/globals.css` (`@import "tailwindcss"`, `@theme inline`, CSS variables). There is no `tailwind.config.*`; add tokens/variants in CSS.
- **shadcn/ui** with the `base-nova` style, backed by **@base-ui/react** primitives (not Radix). Icons come from **lucide-react**.
- **next-themes** for color mode: `ThemeProvider` in the root layout, `ModeToggle` dropdown in `src/components/theme/`.

## Structure

```text
src/
  app/                 # App Router: layout.js, page.js, globals.css
  components/
    theme/             # ThemeProvider and ModeToggle
    ui/                # generated shadcn/ui components (.jsx)
  hooks/               # shared React hooks (e.g. use-mobile)
  lib/utils.js         # re-exports `cn` from the `cn` package
public/                # static assets
```

- `src/app/layout.js` owns fonts (Geist), metadata, `ThemeProvider`, and `TooltipProvider`.
- Route files live under `src/app/`; keep server components server-side and add `"use client"` only to components that need hooks/browser APIs.

## Conventions

- Use the `@/` alias for cross-directory imports.
- Use the exported `cn(...)` helper for conditional Tailwind classes. shadcn-generated components import it from `"cn"` directly; application code can import from `@/lib/utils`.
- Style with Tailwind utilities and the shadcn CSS variables (`bg-background`, `text-foreground`, `border-border`, `bg-primary`, …) so light/dark mode keeps working; avoid hard-coded colors.
- Follow the existing file style: function components, `export function Name`, named exports for components; default exports for pages/layouts.
- Keep generated `src/components/ui/*` files close to upstream shadcn output; prefer extending through props/`className` over editing internals, so they stay updatable.
- Check that changes render in both light and dark themes and on mobile widths.
