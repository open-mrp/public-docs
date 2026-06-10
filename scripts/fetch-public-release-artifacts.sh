#!/usr/bin/env bash
# Download public OpenAPI + Stainless config from the API release S3 bucket.
#
# Usage:
#   ./scripts/fetch-public-release-artifacts.sh                       # latest openapi.json + stainless.yml
#   ./scripts/fetch-public-release-artifacts.sh 1.0.forge-preview.2   # API-version-pinned artifacts
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SPECS_DIR="${ROOT}/specs"
BUCKET="s3://augno-public-openapi-specs"
API_VERSION="${1:-}"

mkdir -p "${SPECS_DIR}"

if [ -n "${API_VERSION}" ]; then
    aws s3 cp "${BUCKET}/${API_VERSION}.json" "${SPECS_DIR}/public_openapi_spec.json"
    aws s3 cp "${BUCKET}/${API_VERSION}-stainless.yml" "${SPECS_DIR}/stainless.yml"
else
    aws s3 cp "${BUCKET}/openapi.json" "${SPECS_DIR}/public_openapi_spec.json"
    aws s3 cp "${BUCKET}/stainless.yml" "${SPECS_DIR}/stainless.yml"
fi

echo "Fetched public release artifacts into ${SPECS_DIR}/"
