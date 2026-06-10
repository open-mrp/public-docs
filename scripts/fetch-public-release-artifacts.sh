#!/usr/bin/env bash
# Download public OpenAPI + Stainless config from the API release S3 bucket.
#
# Usage:
#   ./scripts/fetch-public-release-artifacts.sh                       # latest openapi.json + stainless.yml
#   ./scripts/fetch-public-release-artifacts.sh 1.0.forge-preview.2   # API-version-pinned artifacts
#
# Also downloads every archived version listed in api-versions.json into
# specs/versions/, so build:docs can generate the versioned API reference.
#
# --archive-previous (used by the sync-api-spec workflow): after fetching the
# latest spec, archive the previously published latest version into
# api-versions.json (scripts/archive-previous-api-version.ts) before fetching
# archived versions, so a new release automatically keeps the old version
# available in the docs version picker.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SPECS_DIR="${ROOT}/specs"
VERSIONS_DIR="${SPECS_DIR}/versions"
MANIFEST="${ROOT}/api-versions.json"
BUCKET="s3://augno-public-openapi-specs"
API_VERSION=""
ARCHIVE_PREVIOUS="false"

for arg in "$@"; do
    case "${arg}" in
        --archive-previous) ARCHIVE_PREVIOUS="true" ;;
        *) API_VERSION="${arg}" ;;
    esac
done

mkdir -p "${SPECS_DIR}" "${VERSIONS_DIR}"

if [ -n "${API_VERSION}" ]; then
    aws s3 cp "${BUCKET}/${API_VERSION}.json" "${SPECS_DIR}/public_openapi_spec.json"
    aws s3 cp "${BUCKET}/${API_VERSION}-stainless.yml" "${SPECS_DIR}/stainless.yml"
else
    aws s3 cp "${BUCKET}/openapi.json" "${SPECS_DIR}/public_openapi_spec.json"
    aws s3 cp "${BUCKET}/stainless.yml" "${SPECS_DIR}/stainless.yml"
fi

if [ "${ARCHIVE_PREVIOUS}" = "true" ]; then
    bun "${ROOT}/scripts/archive-previous-api-version.ts"
fi

if [ -f "${MANIFEST}" ]; then
    while IFS= read -r version; do
        [ -z "${version}" ] && continue
        aws s3 cp "${BUCKET}/${version}.json" "${VERSIONS_DIR}/${version}.json"
        # A missing stainless config is non-fatal: snippets fall back to generic curl examples.
        aws s3 cp "${BUCKET}/${version}-stainless.yml" "${VERSIONS_DIR}/${version}-stainless.yml" ||
            echo "WARN: no stainless.yml for archived version ${version}; SDK snippets will fall back to curl"
    done < <(bun -e "console.log((JSON.parse(require('fs').readFileSync('${MANIFEST}', 'utf8')).archived ?? []).join('\n'))")
fi

echo "Fetched public release artifacts into ${SPECS_DIR}/"
