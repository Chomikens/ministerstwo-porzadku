#!/usr/bin/env node
/**
 * Google Search Console CLI for ministerstwoporzadku.pl
 *
 * Auth: service account shared with claude-seo (~/.config/claude-seo/).
 * No npm deps - the JWT is signed with node:crypto.
 *
 * Usage:
 *   node scripts/gsc.mjs sites
 *   node scripts/gsc.mjs query [--dim query|page|date|country|device] [--days 28] [--limit 25]
 *                              [--start YYYY-MM-DD] [--end YYYY-MM-DD] [--page <url substring>] [--json]
 *   node scripts/gsc.mjs inspect <url>
 *
 * Property defaults to sc-domain:ministerstwoporzadku.pl; override with --property or GSC_PROPERTY.
 */

import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const CONFIG_PATH =
  process.env.CLAUDE_SEO_CONFIG || path.join(os.homedir(), '.config', 'claude-seo', 'google-api.json');
const DEFAULT_PROPERTY = process.env.GSC_PROPERTY || 'sc-domain:ministerstwoporzadku.pl';
const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith('--')) args[key] = true;
      else args[key] = argv[++i];
    } else {
      args._.push(a);
    }
  }
  return args;
}

function loadServiceAccount() {
  if (!fs.existsSync(CONFIG_PATH)) {
    throw new Error(`Missing ${CONFIG_PATH}. See ~/.claude/skills/seo-google/references/auth-setup.md`);
  }
  const cfg = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const saPath = cfg.service_account_path.replace(/^~/, os.homedir());
  return JSON.parse(fs.readFileSync(saPath, 'utf8'));
}

async function getAccessToken() {
  const sa = loadServiceAccount();
  const b64 = (o) => Buffer.from(typeof o === 'string' ? o : JSON.stringify(o)).toString('base64url');
  const now = Math.floor(Date.now() / 1000);
  const input = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64({
    iss: sa.client_email,
    scope: SCOPE,
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  })}`;
  const sig = crypto.createSign('RSA-SHA256').update(input).sign(sa.private_key).toString('base64url');

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${input}.${sig}`,
    }),
  });
  const tok = await res.json();
  if (!tok.access_token) throw new Error(`Token request failed: ${JSON.stringify(tok)}`);
  return tok.access_token;
}

async function api(token, url, body) {
  const res = await fetch(url, {
    method: body ? 'POST' : 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`${res.status} ${JSON.stringify(data.error ?? data)}`);
  return data;
}

const isoDaysAgo = (n) => new Date(Date.now() - n * 86400e3).toISOString().slice(0, 10);
const pad = (s, n) => String(s).padEnd(n).slice(0, n);

async function cmdSites(token) {
  const data = await api(token, 'https://www.googleapis.com/webmasters/v3/sites');
  for (const s of data.siteEntry ?? []) console.log(`${s.siteUrl}  [${s.permissionLevel}]`);
}

async function cmdQuery(token, property, args) {
  // GSC data lags ~2 days; end 2 days back so the last bucket isn't half-empty.
  const end = args.end ?? isoDaysAgo(2);
  const start = args.start ?? isoDaysAgo(Number(args.days ?? 28) + 2);
  const dimension = args.dim ?? 'query';
  const rowLimit = Number(args.limit ?? 25);

  const body = {
    startDate: start,
    endDate: end,
    dimensions: [dimension],
    rowLimit,
  };
  if (args.page) {
    body.dimensionFilterGroups = [
      { filters: [{ dimension: 'page', operator: 'contains', expression: args.page }] },
    ];
  }

  const data = await api(
    token,
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/searchAnalytics/query`,
    body,
  );

  if (args.json) {
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  const rows = data.rows ?? [];
  console.log(`${property} | ${dimension} | ${start} .. ${end} | ${rows.length} rows\n`);
  if (!rows.length) {
    console.log('(no data)');
    return;
  }
  console.log(`${pad(dimension, 58)} ${pad('clicks', 8)}${pad('impr', 9)}${pad('ctr', 8)}pos`);
  console.log('-'.repeat(90));
  for (const r of rows) {
    console.log(
      `${pad(r.keys[0], 58)} ${pad(r.clicks, 8)}${pad(r.impressions, 9)}${pad(
        `${(r.ctr * 100).toFixed(1)}%`,
        8,
      )}${r.position.toFixed(1)}`,
    );
  }
  const tot = rows.reduce((a, r) => ({ c: a.c + r.clicks, i: a.i + r.impressions }), { c: 0, i: 0 });
  console.log('-'.repeat(90));
  console.log(`${pad('TOTAL (shown rows)', 58)} ${pad(tot.c, 8)}${tot.i}`);
}

async function cmdInspect(token, property, url) {
  const data = await api(token, 'https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
    inspectionUrl: url,
    siteUrl: property,
    languageCode: 'pl',
  });
  const r = data.inspectionResult ?? {};
  const idx = r.indexStatusResult ?? {};
  console.log(`URL:        ${url}`);
  console.log(`Verdict:    ${idx.verdict ?? '?'}`);
  console.log(`Coverage:   ${idx.coverageState ?? '?'}`);
  console.log(`Robots:     ${idx.robotsTxtState ?? '?'}`);
  console.log(`Indexing:   ${idx.indexingState ?? '?'}`);
  console.log(`Canonical:  google=${idx.googleCanonical ?? '?'} | user=${idx.userCanonical ?? '?'}`);
  console.log(`Last crawl: ${idx.lastCrawlTime ?? 'never'}`);
  if (r.mobileUsabilityResult) console.log(`Mobile:     ${r.mobileUsabilityResult.verdict}`);
  if (r.richResultsResult) console.log(`Rich result:${r.richResultsResult.verdict}`);
}

const args = parseArgs(process.argv.slice(2));
const cmd = args._[0] ?? 'query';
const property = args.property ?? DEFAULT_PROPERTY;

try {
  const token = await getAccessToken();
  if (cmd === 'sites') await cmdSites(token);
  else if (cmd === 'query') await cmdQuery(token, property, args);
  else if (cmd === 'inspect') {
    const url = args._[1];
    if (!url) throw new Error('Usage: node scripts/gsc.mjs inspect <url>');
    await cmdInspect(token, property, url);
  } else {
    throw new Error(`Unknown command "${cmd}". Use: sites | query | inspect`);
  }
} catch (err) {
  console.error(`ERROR: ${err.message}`);
  process.exit(1);
}
