// scripts/switch-env.mjs

import { copyFileSync, existsSync } from "fs";

import { resolve } from "path";

const target = process.argv[2];

if (!["dev", "staging", "prod"].includes(target)) {

  console.error("Usage: node scripts/switch-env.mjs <dev|staging|prod>");

  process.exit(1);

}

const src = resolve(process.cwd(), `.env.${target}`);

const dst = resolve(process.cwd(), ".env.local");

if (!existsSync(src)) {

  console.error(`Source env file not found: ${src}`);

  process.exit(1);

}

copyFileSync(src, dst);

console.log(`Switched env → ${target}. Wrote ${dst}`);

console.log("Tip: pnpm dev (for dev) | pnpm build && pnpm start (for staging/prod)");

