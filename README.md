# Augno Documentation

The source of [docs.augno.com](https://docs.augno.com) — Augno's product guides and API reference. It's a Next.js 16 site that combines hand-written MDX guides with an API reference generated from Augno's public OpenAPI specification.

## Found something wrong?

Every page on the site has an **Edit this page** link at the bottom that opens its source in the GitHub editor. Fix the typo, open a pull request — no clone required.

Prefer to just tell us? [Open a documentation issue](https://github.com/Augno/public-docs/issues/new?template=documentation-error.yml).

## Running locally

Requires [Bun](https://bun.sh).

```bash
bun install
bun run dev          # http://localhost:3000
```

The generated files under `src/static/` are committed, so a fresh clone runs and builds without access to the OpenAPI spec.

```bash
bun run lint
bun run test
bun run format
bun run build        # production build
```

## How the site is put together

**Tech:** Next.js 16, React 19, TypeScript, MDX, Tailwind CSS 4, Algolia search.

| Path | Contents |
|---|---|
| `src/docs/**/*.mdx` | Hand-written guides. Frontmatter drives title, subtitle, and nav placement. |
| `src/app/(docs)/[...slug]/` | Catch-all route that renders those MDX files |
| `src/app/(docs)/api-reference/` | API reference, rendered from generated data |
| `src/static/*.generated.ts` | Generated: endpoints, SDK snippets, nav, slugs, route map |
| `src/components/markdown/` | Custom MDX components (`<ApiEndpoint />`, `<ApiKeySnippet />`, …) |
| `scripts/` | The `build:docs` generation pipeline |

Anything named `*.generated.ts` is overwritten by the build — don't hand-edit it. The API reference comes from Augno's public OpenAPI specification, so if an endpoint's description is wrong, the fix belongs at the source rather than in this repo.

### Regenerating the API reference

```bash
bun run build:docs
```

This reads `specs/public_openapi_spec.json` and `specs/stainless.yml`, then regenerates the endpoint data, SDK snippets, navigation, slugs, and `llms.txt`. The specs are published artifacts of an API release and are fetched by `scripts/fetch-public-release-artifacts.sh`, which needs AWS credentials — so in practice only Augno maintainers run this step. Everything else in the repo works without it.

## Search

`bun run index:docs` pushes the docs to Algolia. It needs `NEXT_PUBLIC_ALGOLIA_APP_ID`, `NEXT_PUBLIC_ALGOLIA_INDEX_NAME`, and `ALGOLIA_SEARCH_ADMIN_KEY`. Search degrades gracefully when unconfigured.

## Writing docs

Pages live in `src/docs/` and are `.mdx` with YAML frontmatter:

```mdx
---
title: Idempotency
subtitle: Retry requests safely without duplicating work.
nav:
    section: Developer resources
    order: 5
---
```

Beyond GitHub-flavored Markdown, pages can use the components registered in `src/lib/mdx/fetchPageBySlug.tsx` — cards, tabs, checklists, flowcharts, and API reference embeds.

Code examples get reader-specific values substituted automatically: `YOUR_API_KEY` becomes the signed-in reader's sandbox key, and `<AccountName />` / `<ApiKeySnippet />` render their account inline. Always write examples with those placeholders rather than real credentials.

## For Augno maintainers

Local linking of `@augno/ui` and `@augno/internal-sdk` via yalc, the monorepo layout, and the release/sync workflows are documented in [AGENTS.md](AGENTS.md).

## License

| What | License |
|---|---|
| Source code | [MIT](LICENSE) |
| Documentation content (`src/docs/`) | [CC BY 4.0](LICENSE-DOCS) |
| Augno name, logo, and brand assets | Not licensed — see [TRADEMARKS.md](TRADEMARKS.md) |

Third-party dependency notices are in [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md).

Security issues: please follow [SECURITY.md](SECURITY.md) rather than opening a public issue.
