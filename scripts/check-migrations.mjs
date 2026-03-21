#!/usr/bin/env node
/**
 * Migration check — verifies local migration files exist and are tracked.
 * Run before deploy to ensure no migrations are missing.
 */

import { readdirSync, readFileSync } from "fs";
import { join } from "path";

const MIGRATIONS_DIR = "supabase/migrations";

console.log("\n══════════════════════════════════════════");
console.log("  Migration Check — The Returned");
console.log("══════════════════════════════════════════\n");

try {
  const files = readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  if (files.length === 0) {
    console.log("⚠️  No migration files found in supabase/migrations/\n");
    process.exit(1);
  }

  console.log(`Found ${files.length} migration file(s):\n`);

  for (const file of files) {
    const content = readFileSync(join(MIGRATIONS_DIR, file), "utf-8");
    const tableMatches = content.match(/CREATE TABLE (\w+)/gi) || [];
    const policyMatches = content.match(/CREATE POLICY/gi) || [];
    const indexMatches = content.match(/CREATE INDEX/gi) || [];

    console.log(`  ✓ ${file}`);
    if (tableMatches.length) console.log(`    Tables: ${tableMatches.length}`);
    if (policyMatches.length)
      console.log(`    Policies: ${policyMatches.length}`);
    if (indexMatches.length) console.log(`    Indexes: ${indexMatches.length}`);
    console.log();
  }

  // Verify expected tables are in migrations
  const allContent = files
    .map((f) => readFileSync(join(MIGRATIONS_DIR, f), "utf-8"))
    .join("\n");

  const expectedTables = [
    "crossings",
    "checkins",
    "night_watch",
    "pillar_logs",
    "fast_logs",
    "reading_progress",
    "waitlist",
  ];

  const missing = expectedTables.filter(
    (t) => !allContent.toLowerCase().includes(`create table ${t}`)
  );

  if (missing.length > 0) {
    console.log(`❌ Missing tables in migrations: ${missing.join(", ")}\n`);
    process.exit(1);
  }

  console.log("✅ All expected tables found in migrations\n");
  process.exit(0);
} catch (err) {
  console.log(`❌ Error: ${err.message}\n`);
  process.exit(1);
}
