# Augno Documentation

This repository contains the external documentation for the Augno application, including auto-generated API reference pages and manually maintained documentation sections.

## Overview

The Augno documentation site is built using:

- **NextJS**: For the core framework and routing
- **MDX**: For markdown with JSX support
- **GitHub-Flavored Markdown**: For enhanced markdown features

## Getting Started

### Prerequisites

- Bun
- Node.js 18+

### Installation

```bash
# Install dependencies
bun install
```

### Development

```bash
# Start the development server
bun run dev
```

Visit `http://localhost:3000` to see the documentation site.

### Building

```bash
bun run build
```

### Linking local packages (yalc)

To prototype local changes to `@augno/ui` or `@augno/internal-sdk`, **drive linking from the library directory**, not from here:

```bash
# From ../ui — links @augno/ui into dashboard/ AND public-docs/
cd ../ui && bun run link:all

# From ../internal-sdk — links into dashboard/ (SDK is not consumed by public-docs yet)
cd ../internal-sdk && bun run link:all
```

Then `bun run dev` here to pick up the linked copy. For live updates as you edit the library, run `bun run yalc:watch` in the library directory alongside `dev`.

The `ui:link` / `ui:unlink` / `sdk:link` / `sdk:unlink` scripts in this repo's `package.json` are the single-consumer entry points that the library orchestrators call. You can invoke them directly if you're only linking into public-docs (e.g. quick UI tweak without touching dashboard), but **do not** commit while `.yalc/`, `yalc.lock`, or `file:.yalc/...` refs are present.

**Always tear down from the library before committing:**

```bash
cd ../ui && bun run unlink:all
cd ../internal-sdk && bun run unlink:all
```

Unlinking queries GitHub Packages for the latest version, pins this repo's `package.json` to it, removes `.yalc/` and `yalc.lock` artefacts, clears `.next/`, and runs `bun install`. See the root `CLAUDE.md` for details.

## Documentation Authoring

### File Structure

- `src/app/`: Main application code and page routes
- Documentation pages are organized under appropriate directories in the app directory

### Creating Documentation Pages

#### Option 1: MDX Files

Create `.mdx` files in the `src/app` directory structure:

```
src/app/docs/my-feature/page.mdx
```

#### Option 2: API Reference Pages

API reference pages are auto-generated from the API source code.

### Markdown Features

This documentation supports GitHub-flavored Markdown via `remark-gfm`, providing these features:

#### Tables

```markdown
| Feature | Description              |
| ------- | ------------------------ |
| Tables  | Organized data display   |
| Lists   | Bullet or numbered items |
```

#### Task Lists

```markdown
- [x] Completed task
- [ ] Pending task
```

#### Strikethrough

```markdown
~~Strikethrough text~~
```

#### Autolinks

URLs like https://augno.com are automatically converted to links.

#### Footnotes

```markdown
Here's a sentence with a footnote[^1].

[^1]: This is the footnote.
```

### Syntax Highlighting

Code blocks have automatic syntax highlighting:

````markdown
```javascript
function hello() {
    console.log('Hello, Augno!');
}
```
````

### Dynamic User Data in Code Examples

The docs automatically inject the user's sandbox API key and account name into code examples.

#### In Code Blocks

Use these placeholders—they're replaced automatically:

- `YOUR_API_KEY` → User's sandbox API key
- `YOUR_ACCOUNT_NAME` → User's account name

```js
const client = new AugnoClient({
    apiKey: 'YOUR_API_KEY', // Replaced with actual key
});
```

#### Inline Components

For inline display outside code blocks:

```mdx
Here's your API key for <AccountName />:

| Type   | Value             |
| ------ | ----------------- |
| Secret | <ApiKeySnippet /> |
```

- `<AccountName />` — Displays account name inline
- `<ApiKeySnippet />` — Copyable, abbreviated API key with click-to-copy

## Contributing

1. Create a new branch for your changes
2. Update or add documentation pages
3. Submit a pull request
