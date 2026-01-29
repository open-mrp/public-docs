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

To test local changes to `@augno/ui` (or `@augno/internal-sdk`) without publishing:

1. **In the UI repo** (e.g. `../ui`):
    - One-off: `bun run yalc:publish` (builds and pushes to yalc)
    - With live updates: `bun run yalc:watch` (rebuilds and pushes on file changes)

2. **In this repo** (external-docs):
    - Link UI: `bun run ui:link` (adds local `@augno/ui` from yalc and clears Next.js cache)
    - Start the app: `bun run dev`

To switch back to the published UI: `bun run ui:unlink`.

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

// We use `200 OK` with empty JSON objects instead of `204 No Content`.
//
// Unlike 204, this allows us to add response fields later without breaking
// backwards compatibility, since 204s cannot include a body per HTTP spec.
