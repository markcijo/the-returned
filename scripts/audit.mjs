#!/usr/bin/env node
import { readFileSync } from "fs";
import { execSync } from "child_process";

const issues = [];
const warn = (file, line, msg) => issues.push({ file, line, msg });

const tsxFiles = execSync('find src -name "*.tsx" -o -name "*.jsx" | grep -v node_modules | grep -v __tests__ | grep -v ".test." | grep -v ".spec."', { encoding: "utf-8" }).trim().split("\n").filter(Boolean);
const allSrcFiles = execSync('find src \\( -name "*.ts" -o -name "*.tsx" \\) | grep -v node_modules | grep -v __tests__ | grep -v ".test." | grep -v ".spec."', { encoding: "utf-8" }).trim().split("\n").filter(Boolean);

// 1. EMPTY / UNLABELLED BUTTONS
for (const file of tsxFiles) {
  const lines = readFileSync(file, "utf-8").split("\n");
  lines.forEach((line, i) => {
    const n = i + 1;
    if (/<button[^>]*>\s*<\/button>/.test(line)) {
      warn(file, n, "❌ Empty button — no text, no aria-label");
    }
  });
}

// 2. USER FLOW DEAD ENDS
for (const file of tsxFiles) {
  const lines = readFileSync(file, "utf-8").split("\n");
  lines.forEach((line, i) => {
    if (/href=['"]#['"]/.test(line)) warn(file, i + 1, '⚠️  href="#" — link goes nowhere');
    if (/>\s*(TODO|FIXME|PLACEHOLDER|Lorem ipsum)/i.test(line)) warn(file, i + 1, "❌ Placeholder text visible to users");
    if (/console\.log\(/.test(line)) warn(file, i + 1, "⚠️  console.log left in production code");
  });
}

// 3. HARDCODED VALUES
const hardcoded = [
  { re: /sk_(test|live)_[a-zA-Z0-9]{20,}/g, msg: "❌ Hardcoded Stripe secret key" },
  { re: /localhost:[0-9]{4}/g, msg: "⚠️  Hardcoded localhost URL — use env var" },
];

for (const file of allSrcFiles) {
  const lines = readFileSync(file, "utf-8").split("\n");
  lines.forEach((line, i) => {
    if (line.trim().startsWith("//") || line.trim().startsWith("*")) return;
    hardcoded.forEach(({ re, msg }) => {
      if (re.test(line)) warn(file, i + 1, msg);
      re.lastIndex = 0;
    });
  });
}

// 4. MISSING ENV VARS
try {
  const envExample = readFileSync(".env.local.example", "utf-8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => l.split("=")[0].trim());

  const usedEnvVars = [];
  for (const file of allSrcFiles) {
    const content = readFileSync(file, "utf-8");
    for (const match of content.matchAll(/process\.env\.([A-Z_]+)/g)) {
      if (!usedEnvVars.includes(match[1])) usedEnvVars.push(match[1]);
    }
  }
  for (const v of usedEnvVars) {
    if (!envExample.includes(v)) {
      warn(".env.local.example", "—", `❌ ${v} used in code but missing from .env.local.example`);
    }
  }
} catch {
  warn(".env.local.example", "—", "⚠️  .env.local.example not found");
}

// REPORT
console.log("\n══════════════════════════════════════════");
console.log("  Code Quality Audit — The Returned");
console.log("══════════════════════════════════════════\n");

if (issues.length === 0) {
  console.log("✅ All clear — no issues found\n");
  process.exit(0);
} else {
  const errors = issues.filter((i) => i.msg.startsWith("❌"));
  const warnings = issues.filter((i) => i.msg.startsWith("⚠️"));
  console.log(`Found ${errors.length} errors, ${warnings.length} warnings\n`);
  issues.forEach(({ file, line, msg }) => {
    console.log(`${msg}`);
    console.log(`  → ${file}:${line}\n`);
  });
  if (errors.length > 0) {
    console.log("❌ Fix errors before committing\n");
    process.exit(1);
  } else {
    console.log("⚠️  Review warnings before shipping\n");
    process.exit(0);
  }
}
