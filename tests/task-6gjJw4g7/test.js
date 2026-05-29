import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const CLAUDE_DIR = process.env.CLAUDE_DIR_OVERRIDE || 'C:\\Users\\adamk\\.claude';
const read = (...p) => readFileSync(join(CLAUDE_DIR, ...p), 'utf8');

// Predykaty wyzwalaczy — odzwierciedlają progi udokumentowane w /po-alert-check.
const trig = {
  budget: (spent, limit) => limit != null && limit > 0 && spent / limit >= 0.8,
  estimateStreak: (last3) => last3.length === 3 && last3.every((e) => e > 50),
  staleCommits: (daysSince) => daysSince > 7,
  expensiveSession: (costUSD) => costUSD > 2.0,
};

test('Wyzwalacz budżetu: ≥80% odpala, brak limitu pomija', () => {
  assert.equal(trig.budget(80, 100), true);
  assert.equal(trig.budget(79, 100), false);
  assert.equal(trig.budget(50, null), false, 'Brak limitu = pomiń');
});

test('Wyzwalacz serii błędów: 3x >50% odpala, inaczej nie', () => {
  assert.equal(trig.estimateStreak([60, 80, 175]), true);
  assert.equal(trig.estimateStreak([60, 40, 80]), false, 'jeden ≤50 → nie');
  assert.equal(trig.estimateStreak([60, 80]), false, '<3 wpisy → nie');
});

test('Wyzwalacz commitów: >7 dni odpala', () => {
  assert.equal(trig.staleCommits(8), true);
  assert.equal(trig.staleCommits(7), false);
  assert.equal(trig.staleCommits(0), false);
});

test('Wyzwalacz drogiej sesji: >$2.00 odpala', () => {
  assert.equal(trig.expensiveSession(2.1), true);
  assert.equal(trig.expensiveSession(2.0), false);
  assert.equal(trig.expensiveSession(0.71), false);
});

test('Na realnej historii: seria błędów NIE odpala (ostatnie 3 nie są 3x >50%)', () => {
  const c = read('agents', 'po', 'po-knowledge.md');
  const errs = [];
  const re = /błąd:\s*(\d+)%/g;
  let m;
  while ((m = re.exec(c)) !== null) errs.push(+m[1]);
  assert.ok(errs.length >= 3, 'Potrzeba ≥3 wpisów błędów');
  const last3 = errs.slice(-3);
  assert.equal(
    trig.estimateStreak(last3),
    false,
    `Ostatnie 3 błędy ${JSON.stringify(last3)} — predykcja/deep-linking trafne, więc brak serii`,
  );
});

test('/po-alert-check istnieje z frontmatterem i 4 wyzwalaczami', () => {
  const path = join(CLAUDE_DIR, 'skills', 'po-alert-check', 'SKILL.md');
  assert.ok(existsSync(path), 'SKILL.md /po-alert-check powinien istnieć');
  const c = readFileSync(path, 'utf8');
  assert.match(c, /^---\r?\n[\s\S]*?description:[\s\S]*?---/, 'Brak frontmatter');
  assert.match(c, /Wyzwalacz 1[\s\S]*Wyzwalacz 2[\s\S]*Wyzwalacz 3[\s\S]*Wyzwalacz 4/, 'Brak 4 wyzwalaczy');
  assert.match(c, />\s*50%/, 'Brak progu >50% (seria błędów)');
  assert.match(c, /7 dni|7 dni/, 'Brak progu 7 dni');
  assert.match(c, /\$2\.00|\$2/, 'Brak progu $2 (droga sesja)');
  assert.match(c, /80%/, 'Brak progu 80% (budżet)');
  assert.match(c, /[Aa]nty-duplikat|już istnieje/, 'Brak ochrony anty-duplikat');
});

test('/podsumuj-sesje wywołuje /po-alert-check', () => {
  assert.match(read('skills', 'podsumuj-sesje', 'SKILL.md'), /po-alert-check/, 'Brak wywołania /po-alert-check');
});

test('/po-plan pokazuje alerty 🔔 na starcie', () => {
  const c = read('skills', 'po-plan', 'SKILL.md');
  assert.match(c, /🔔 ALERT/, 'Brak wykrywania tasków 🔔 ALERT');
  assert.match(c, /🔔 Alerty:/, 'Brak linii 🔔 Alerty w output');
});
