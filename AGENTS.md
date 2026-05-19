# AGENTS.md

This file provides guidance when working with code in this repository.

**IMPORTANT:** Do **not** run `bun run dev`. The dev server should only be started manually by a human, not through automation or commands.

## Project Overview

This is a Next.js 16 documentation site for the Augno API platform. It combines manually authored guides (MDX files) with auto-generated API reference pages from OpenAPI specs.

**Tech stack:** Next.js 16, React 19, TypeScript, MDX, TailwindCSS 4, Algolia (search), Zustand, vendored Stainless sdk-json under `packages/stainless-sdk-json` (SDK snippets at docs build time)

## Common Commands

```bash
# Development
bun install              # Install dependencies

# Build
bun run build            # Production build
bun run build:docs       # Full pipeline: API reference TS + Stainless snippets + nav/slugs

# Code Quality
bun run lint             # ESLint
bun run format           # Prettier
bun run format:check     # Check formatting
bun run test             # Run tests with bun

# Search
bun run index:docs       # Index docs to Algolia
```

## Architecture

### Content System

- **Manual docs:** `src/docs/` - MDX files with YAML frontmatter
- **Auto-generated API reference:** `src/static/apiEndpoints.generated.ts` from OpenAPI (no per-endpoint MDX). Routes live under `src/app/(docs)/api-reference/[[...segments]]/page.tsx`; `scripts/generate-nav.ts` merges synthetic `docPaths` / `pagePreview` entries for tooltips and path keys.
- **Static metadata:** `src/static/*.generated.ts` - Navigation, paths, and API reference index

### Build Pipeline (`bun run build:docs`)

1. `scripts/generate-api-reference.ts` — Parse `specs/public_openapi_spec.json`, emit `apiEndpoints.generated.ts` (and `apiVersion.generated.ts`)
2. `scripts/generate-sdk-snippets.ts` — Merge auto-generated Stainless resources into `specs/stainless.yml`, run vendored `packages/stainless-sdk-json`, emit `apiSnippets.generated.ts`
3. `scripts/generate-nav.ts` — Generate navigation from frontmatter
4. `scripts/generate-slugs.ts` — Generate static params for dynamic routes
5. `scripts/generate-llms-txt.ts` — LLMs metadata

### Key Directories

- `src/app/(docs)/[...slug]/page.tsx` - Dynamic catch-all route for MDX-backed docs
- `src/app/(docs)/api-reference/[[...segments]]/page.tsx` - API reference overview and endpoint pages from generated data
- `src/lib/mdx/fetchPageBySlug.tsx` - MDX compilation and component registration
- `src/components/markdown/` - Custom MDX components (ApiKeySnippet, AccountName, etc.)
- `src/providers/` - Auth and API key context providers

### MDX Components

Custom components available in MDX files:

- `<ApiKeySnippet />` - Displays user's sandbox API key
- `<AccountName />` - Shows user's account name
- `<AuthConditional />` - Conditional rendering based on auth state
- `<DocsCodeEditor />` - Code block with copy functionality
- `<DocLink />`, `<LinkCard />` - Navigation components

### Dependencies

- `@augno/ui` - Internal UI library (linked via yalc)
- `@augno/internal-sdk` - Internal SDK (linked via yalc)
- Uses GitHub packages registry (`.npmrc`)

## Adding Documentation

1. Create `.mdx` file in `src/docs/` with frontmatter:
    ```yaml
    ---
    title: Page Title
    description: Page description
    nav:
        title: Nav Title
        order: 1
    ---
    ```
2. Run `bun run build:docs` to regenerate navigation and slugs
3. Path convention: `src/docs/section/page.mdx` → URL `/section/page`

## Code Style

- Prettier: 4-space tabs, 100-char line width, single quotes
- TypeScript strict mode enabled
- Path alias: `@/*` maps to `src/*`
