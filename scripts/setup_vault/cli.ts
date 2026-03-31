#!/usr/bin/env tsx
/**
 * Renders scripts/setup_vault/query.sql with Mustache using vault env vars,
 * then runs it via `supabase db query`.
 *
 * Requires VAULT_SUPABASE_URL and VAULT_SUPABASE_SECRET_KEY in .env.
 *
 * Usage:
 *   tsx scripts/setup_vault/cli.ts
 *   tsx scripts/setup_vault/cli.ts --linked
 */

import '@dotenvx/dotenvx/config';
import { defineCommand, runMain } from 'citty';
import { createConsola } from 'consola';
import Mustache from 'mustache';
import { spawnSync } from 'node:child_process';
import { readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = fileURLToPath(new URL('.', import.meta.url));
const repoRoot = join(scriptDir, '..', '..');
const queryPath = join(scriptDir, 'query.sql');

const logger = createConsola({
  defaults: { tag: 'setup-vault' },
});

function applyVault(linked: boolean): void {
  logger.start(
    linked
      ? 'Applying vault secrets to linked Supabase project'
      : 'Applying vault secrets to local database'
  );
  const template = readFileSync(queryPath, 'utf8');
  const sql = Mustache.render(template, buildView());
  const tmpFile = join(tmpdir(), `campus-flow-setup-vault-${Date.now()}.sql`);
  writeFileSync(tmpFile, sql, 'utf8');
  try {
    runSupabaseDbQuery(linked, tmpFile);
  } finally {
    try {
      unlinkSync(tmpFile);
    } catch {
      logger.warn('Could not delete temporary SQL file');
    }
  }
  logger.success('Vault secrets updated (supabase_url, supabase_secret_key)');
}

function buildView(): Record<string, string> {
  const secretKey = requiredEnv(
    'VAULT_SUPABASE_SECRET_KEY',
    process.env.VAULT_SUPABASE_SECRET_KEY
  );
  const supabaseUrl = requiredEnv(
    'VAULT_SUPABASE_URL',
    process.env.VAULT_SUPABASE_URL
  );
  return {
    SUPABASE_SECRET_KEY: pgStringLiteral(secretKey),
    SUPABASE_URL: pgStringLiteral(supabaseUrl),
  };
}

function pgStringLiteral(value: string): string {
  return `'${value.replace(/'/g, "''")}'`;
}

function requiredEnv(name: string, value: string | undefined): string {
  if (value === undefined || value === '') {
    logger.fatal(`Missing required environment variable: ${name}`);
    process.exit(1);
  }
  return value;
}

function runSupabaseDbQuery(linked: boolean, filePath: string): void {
  const args = ['supabase', 'db', 'query', '-f', filePath];
  if (linked) {
    args.push('--linked');
  } else {
    args.push('--local');
  }
  const result = spawnSync('npx', args, {
    cwd: repoRoot,
    shell: true,
    stdio: 'inherit',
  });
  if (result.error) {
    logger.error(result.error);
    process.exit(1);
  }
  if (result.status !== 0) {
    logger.error(
      `supabase db query exited with code ${String(result.status ?? 1)}`
    );
    process.exit(result.status ?? 1);
  }
}

runMain(
  defineCommand({
    args: {
      linked: {
        description: 'Run against the linked Supabase project instead of local',
        type: 'boolean',
      },
    },
    meta: {
      description:
        'Apply Supabase vault secrets from env (Mustache SQL + db query)',
      name: 'setup-vault',
    },
    run({ args }) {
      applyVault(Boolean(args.linked));
    },
  })
);
