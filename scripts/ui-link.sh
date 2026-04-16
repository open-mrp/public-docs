#!/usr/bin/env bash
# Link the yalc-published @augno/ui into public-docs. Clears .next so Next.js
# re-resolves the module from the new location.

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
source "$ROOT/scripts/yalc-lib.sh"

YALC_CMD=$(resolve_yalc_cmd)
PKG="@augno/ui"

cd "$ROOT"

echo "Adding $PKG from yalc store..."
if ! $YALC_CMD add "$PKG"; then
  echo ""
  echo "Run 'bun run link:all' in ui/ first (publishes to yalc store)." >&2
  exit 1
fi

echo "Clearing .next cache..."
rm -rf .next

echo "Syncing yalc dependencies..."
$YALC_CMD update

echo "Done. public-docs is using yalc-linked $PKG. Teardown: bun run ui:unlink"
