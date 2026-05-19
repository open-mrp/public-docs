# Vendored `@stainless/sdk-json`

This folder contains an extracted copy of the published npm package **`@stainless/sdk-json@0.1.0-beta.11`** (`dist/`, `vendor/`, root `index.js` / `index.d.ts`). The registry tarball does not include TypeScript sources or a standalone license file.

**Why:** Keeps `bun run build:docs` working if the package is unpublished or the registry entry goes away.

**Upstream:** [npm `@stainless/sdk-json`](https://www.npmjs.com/package/@stainless/sdk-json)

## Refreshing from npm

From `public-docs/`:

```bash
npm pack @stainless/sdk-json@0.1.0-beta.11
mkdir -p packages/stainless-sdk-json
tar -xzf stainless-sdk-json-0.1.0-beta.11.tgz -C packages/stainless-sdk-json --strip-components=1
rm stainless-sdk-json-0.1.0-beta.11.tgz
```

Then restore this folder’s trimmed `package.json` (drop `devDependencies` / build `scripts` from the extracted manifest) so installs stay minimal.
