import { execSync } from 'node:child_process';
import { readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const CLAUDE_DIR = 'C:\\Users\\adamk\\.claude';
const TESTS_DIR = join(CLAUDE_DIR, 'tests');
const MAX_DURATION_MS = 30_000;

const start = Date.now();

console.log('════════════════════════════════════');
console.log('REGRESJA — claude-config');
console.log('════════════════════════════════════');

let passed = 0;
let failed = 0;

function runSuite(label, file) {
  if (!existsSync(file)) return;
  try {
    execSync(`node "${file}"`, { stdio: 'pipe', timeout: MAX_DURATION_MS });
    console.log(`✅ ${label}`);
    passed++;
  } catch (err) {
    console.log(`🔴 ${label}`);
    console.log(err.stdout?.toString() || err.message);
    failed++;
  }
}

// Warstwa 1 — Smoke
runSuite('Smoke — critical', join(TESTS_DIR, 'smoke', 'critical.js'));

// Warstwa 2 — Per task (każdy folder tests/task-*)
const taskDirs = existsSync(TESTS_DIR)
  ? readdirSync(TESTS_DIR).filter(d => d.startsWith('task-'))
  : [];

for (const dir of taskDirs) {
  const testFile = join(TESTS_DIR, dir, 'test.js');
  runSuite(`Task — ${dir}`, testFile);
}

const duration = Date.now() - start;
console.log('════════════════════════════════════');
console.log(`Wynik: ${passed} ✅  ${failed} 🔴  | ${duration}ms`);
console.log(failed === 0 ? 'GOTOWE DO MERGE' : 'BLOKUJĄCE — napraw błędy przed PR');
console.log('════════════════════════════════════');

if (failed > 0) process.exit(1);
