#!/bin/sh
set -e

npx prisma migrate deploy

exec node .output/server/index.mjs
