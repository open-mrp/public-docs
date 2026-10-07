/**
 * Called by fetch-public-release-artifacts.sh --archive-previous (the
 * sync-api-spec workflow) after downloading the latest spec.
 *
 * When the freshly fetched spec is a NEW version, the previously published
 * latest version (from the committed src/static/apiVersion.generated.ts) is
 * added to `archived` in api-versions.json so it stays available in the docs
 * version picker, and pinned in `specTags` to its last `{version}-rev.{N}` tag
 * in open-mrp/openapi-spec, which the docs server fetches its spec from.
 * No-op when the version is unchanged, so re-running a sync for the same
 * release never grows the manifest.
 */
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve relative to this file, not cwd — fetch-public-release-artifacts.sh
// can be invoked from anywhere.
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const MANIFEST_PATH = path.join(ROOT, 'api-versions.json');
const SPEC_PATH = path.join(ROOT, 'specs/public_openapi_spec.json');
const PREVIOUS_VERSION_MODULE = path.join(ROOT, 'src/static/apiVersion.generated.ts');
const SPEC_REPO_URL = 'https://github.com/open-mrp/openapi-spec';

interface VersionsManifest {
    $comment?: string;
    archived?: string[];
    specTags?: Record<string, string>;
}

/** Highest `{version}-rev.{N}` tag in the public spec repo: that version's final spec. */
function finalSpecTag(version: string): string {
    const prefix = `${version}-rev.`;
    const out = execFileSync(
        'git',
        ['ls-remote', '--tags', '--refs', SPEC_REPO_URL, `${prefix}*`],
        {
            encoding: 'utf8',
        },
    );
    const revs = out
        .split('\n')
        .map((line) => line.split('refs/tags/')[1])
        .filter((tag): tag is string => !!tag?.startsWith(prefix))
        .map((tag) => Number(tag.slice(prefix.length)))
        .filter(Number.isInteger);
    if (revs.length === 0) {
        throw new Error(`No ${prefix}* tag in ${SPEC_REPO_URL}; cannot archive ${version}.`);
    }
    return `${prefix}${Math.max(...revs)}`;
}

if (!fs.existsSync(SPEC_PATH)) {
    console.error(`[archive-previous-api-version] ${SPEC_PATH} not found — fetch artifacts first.`);
    process.exit(1);
}
const newLatest: string = JSON.parse(fs.readFileSync(SPEC_PATH, 'utf8')).info.version;

if (!fs.existsSync(PREVIOUS_VERSION_MODULE)) {
    console.log(
        '[archive-previous-api-version] No previously generated apiVersion.generated.ts — nothing to archive.',
    );
    process.exit(0);
}
const { API_VERSION } = (await import(PREVIOUS_VERSION_MODULE)) as {
    API_VERSION: { current: string };
};
const previousLatest = API_VERSION.current;

if (!previousLatest || previousLatest === newLatest) {
    console.log(
        `[archive-previous-api-version] Latest version unchanged (${newLatest}) — nothing to archive.`,
    );
    process.exit(0);
}

const manifest: VersionsManifest = fs.existsSync(MANIFEST_PATH)
    ? JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'))
    : {};

// Keep newest-first order; a version promoted back to latest leaves the archive.
const archived = (manifest.archived ?? []).filter((v) => v !== newLatest);
if (archived.includes(previousLatest)) {
    console.log(
        `[archive-previous-api-version] ${previousLatest} already archived — nothing to do.`,
    );
    process.exit(0);
}
const specTag = finalSpecTag(previousLatest);
archived.unshift(previousLatest);
manifest.archived = archived;
manifest.specTags = { ...manifest.specTags, [previousLatest]: specTag };

fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 4)}\n`);
console.log(
    `[archive-previous-api-version] Archived ${previousLatest} (new latest: ${newLatest}), ` +
        `pinned to ${specTag}. api-versions.json now lists: ${archived.join(', ')}`,
);
