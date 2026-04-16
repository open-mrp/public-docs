#!/usr/bin/env bash
# Shared helpers for public-docs yalc link/unlink scripts.
# Source this file; do not execute directly.

set -e

REGISTRY="https://npm.pkg.github.com"

resolve_yalc_cmd() {
  if command -v yalc &>/dev/null; then
    echo "yalc"
  elif command -v bunx &>/dev/null; then
    echo "bunx yalc"
  else
    echo "yalc is required. Install with: bun add -g yalc (or run via bunx)" >&2
    exit 1
  fi
}

# Resolve the latest published version of a package from GitHub Packages.
# Aborts before any mutation if the registry call fails.
resolve_latest_version() {
  local pkg="$1"
  local version
  if ! version=$(npm view "$pkg" version --registry="$REGISTRY" 2>/dev/null); then
    echo "Failed to resolve latest version of $pkg from $REGISTRY." >&2
    echo "Check that your .npmrc has a valid GitHub Packages token, then retry." >&2
    exit 1
  fi
  if [ -z "$version" ]; then
    echo "npm view returned empty version for $pkg" >&2
    exit 1
  fi
  echo "^$version"
}

sed_inplace() {
  if sed --version 2>/dev/null | grep -q GNU; then
    sed -i "$@"
  else
    sed -i '' "$@"
  fi
}

rewrite_dep_version() {
  local file="$1" pkg="$2" version="$3"
  [ -f "$file" ] || return 0
  grep -q "\"$pkg\"" "$file" || return 0
  local escaped_pkg="${pkg//\//\\/}"
  sed_inplace "s|\"$escaped_pkg\": \"[^\"]*\"|\"$escaped_pkg\": \"$version\"|g" "$file"
}

# Remove a package entry from yalc.lock. If it becomes the last package,
# delete yalc.lock entirely (keeps teardown scoped).
yalc_lock_scoped_remove() {
  local lockfile="$1" pkg="$2"
  [ -f "$lockfile" ] || return 0
  node -e "
    const fs = require('fs');
    const [lockfile, pkg] = process.argv.slice(1);
    const j = JSON.parse(fs.readFileSync(lockfile, 'utf8'));
    if (j.packages) {
      delete j.packages[pkg];
      if (Object.keys(j.packages).length === 0) {
        fs.unlinkSync(lockfile);
        return;
      }
    }
    fs.writeFileSync(lockfile, JSON.stringify(j, null, 2));
  " "$lockfile" "$pkg"
}

yalc_dir_scoped_cleanup() {
  local root="$1" pkg="$2"
  local target="$root/.yalc/$pkg"
  [ -d "$target" ] && rm -rf "$target"
  local scope_dir
  scope_dir=$(dirname "$target")
  if [ -d "$scope_dir" ] && [ -z "$(ls -A "$scope_dir" 2>/dev/null)" ]; then
    rmdir "$scope_dir"
  fi
  if [ -d "$root/.yalc" ] && [ -z "$(ls -A "$root/.yalc" 2>/dev/null)" ]; then
    rmdir "$root/.yalc"
  fi
}
