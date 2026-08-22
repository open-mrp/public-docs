#!/usr/bin/env bash
# Tear down @openmrp/ui yalc link and restore public-docs to the latest
# published GitHub Packages version.
#
# Teardown invariant: after this script, `git status` must show no yalc-related
# diffs for this package — no file:.yalc/... in package.json, no
# .yalc/@openmrp/ui/ directory, no entry in yalc.lock, no stale .next cache.

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
source "$ROOT/scripts/yalc-lib.sh"

PKG="@openmrp/ui"

echo "Resolving latest published version of $PKG..."
NPM_REF=$(resolve_latest_version "$PKG")
echo "  → $NPM_REF"

echo "Restoring $PKG to $NPM_REF in package.json..."
rewrite_dep_version "$ROOT/package.json" "$PKG" "$NPM_REF"

echo "Scoped-cleaning yalc artefacts for $PKG..."
yalc_lock_scoped_remove "$ROOT/yalc.lock" "$PKG"
yalc_dir_scoped_cleanup "$ROOT" "$PKG"

echo "Clearing .next cache..."
rm -rf "$ROOT/.next"

echo "Running: bun install"
cd "$ROOT" && bun install
echo "Done. public-docs is using published $PKG@$NPM_REF."
