#!/usr/bin/env bash
cd "$(dirname "$0")"
set -e

source .env.sh
deno run --watch --unstable \
  --allow-env \
  --allow-net \
  --allow-read \
  --allow-write=./assets \
  main.ts
