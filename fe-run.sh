#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MODE="${1:-local}"
HOST="${FE_HOST:-127.0.0.1}"
PORT="${FE_PORT:-8080}"

case "${MODE}" in
  local)
    API_BASE_URL="${VUE_APP_URL_API:-http://127.0.0.1:8081/}"
    API_DEFAULT_URL="${VUE_APP_URL_APIDEFAULT:-http://127.0.0.1:8081/}"
    ;;
  prod)
    API_BASE_URL="${VUE_APP_URL_API:-https://monika.sisda.net/}"
    API_DEFAULT_URL="${VUE_APP_URL_APIDEFAULT:-https://monika.sisda.net/2026/}"
    ;;
  *)
    echo "[ERROR] Unknown mode: ${MODE}" >&2
    echo "Usage: ./fe-run.sh [local|prod]" >&2
    exit 1
    ;;
esac

if [ ! -f "${ROOT_DIR}/package.json" ]; then
  echo "[ERROR] package.json not found in: ${ROOT_DIR}" >&2
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "[ERROR] npm command not found in PATH" >&2
  exit 1
fi

if [ ! -d "${ROOT_DIR}/node_modules" ] || [ ! -x "${ROOT_DIR}/node_modules/.bin/vue-cli-service" ]; then
  echo "[FE] Dependencies not found/incomplete. Running npm install --legacy-peer-deps..."
  cd "${ROOT_DIR}"
  npm install --legacy-peer-deps
fi

echo "[FE] Mode: ${MODE}"
echo "[FE] Starting at http://${HOST}:${PORT}"
echo "[FE] Root: ${ROOT_DIR}"
cd "${ROOT_DIR}"
exec env \
  VUE_APP_URL_API="${API_BASE_URL}" \
  VUE_APP_URL_APIDEFAULT="${API_DEFAULT_URL}" \
  npm run serve -- --host "${HOST}" --port "${PORT}"
