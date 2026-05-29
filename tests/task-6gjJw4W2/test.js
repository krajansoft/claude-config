import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const CLAUDE_DIR = process.env.CLAUDE_DIR_OVERRIDE || 'C:\\Users\\adamk\\.claude';
const read = (...p) => readFileSync(join(CLAUDE_DIR, ...p), 'utf8');

// Parser wpisów "Historia estymacji" z po-knowledge.md
// Format: [data] | [nazwa] | est: $X | real: $Y | błąd: XX% | kategoria: KAT
function parseHistory(content) {
  const out = [];
  const re = /est:\s*\$([\d.]+)\s*\|\s*real:\s*\$([\d.]+)\s*\|\s*błąd:\s*(\d+)%\s*\|\s*kategoria:\s*(.+)/;
  for (const line of content.split(/\r?\n/)) {
    const m = line.match(re);
    if (m) out.push({ est: +m[1], real: +m[2], errPct: +m[3], kategoria: m[4].trim() });
  }
  return out;
}

// Logika predykcji: średnie przekroczenie (signed) i bufor dla grupy podobnych tasków
function predict(entries) {
  if (entries.length < 2) return null;
  const overruns = entries.map((e) => ((e.real - e.est) / e.est) * 100);
  const avg = overruns.reduce((s, v) => s + v, 0) / overruns.length; // ze znakiem: kierunek
  const avgAbs = overruns.reduce((s, v) => s + Math.abs(v), 0) / overruns.length; // skala błędu
  const avgAbsAmount = entries.reduce((s, e) => s + Math.abs(e.real - e.est), 0) / entries.length;
  return { n: entries.length, avgOverrunPct: avg, avgAbsOverrunPct: avgAbs, avgAbsAmount };
}

test('po-knowledge.md ma parsowalną historię (≥2 wpisy)', () => {
  const h = parseHistory(read('agents', 'po', 'po-knowledge.md'));
  assert.ok(h.length >= 2, `Za mało wpisów historii: ${h.length}`);
});

test('Predykcja jest policzalna i trafna dla podgrupy historii', () => {
  const h = parseHistory(read('agents', 'po', 'po-knowledge.md'));
  const p = predict(h);
  assert.ok(p, 'Predykcja powinna powstać dla ≥2 wpisów');
  assert.ok(Number.isFinite(p.avgOverrunPct), 'Średnie przekroczenie (ze znakiem) musi być liczbą');
  assert.ok(Number.isFinite(p.avgAbsAmount) && p.avgAbsAmount > 0, 'Kwota odchylenia > 0');
  // Trafność: skala |overrun| per wpis ~ błąd zapisany w historii (tolerancja zaokrągleń)
  const avgErr = h.reduce((s, e) => s + e.errPct, 0) / h.length;
  assert.ok(Math.abs(p.avgAbsOverrunPct - avgErr) <= 3,
    `|przekroczenie| (${p.avgAbsOverrunPct.toFixed(0)}%) niespójne z błędem historii (${avgErr.toFixed(0)}%)`);
});

test('Para UI/JS-małych z historii daje predykcję przeszacowania (~-46%)', () => {
  // sortowanie $0.30→$0.18, szlif $0.43→$0.21 — oba przeszacowane
  const sample = [
    { est: 0.30, real: 0.18, errPct: 40, kategoria: 'Inne' },
    { est: 0.43, real: 0.21, errPct: 51, kategoria: 'Inne' },
  ];
  const p = predict(sample);
  assert.ok(p.avgOverrunPct < 0, 'Powinno wyjść przeszacowanie (ujemne)');
  assert.ok(Math.abs(p.avgOverrunPct + 45.5) <= 3, `Oczekiwano ~-45.5%, jest ${p.avgOverrunPct.toFixed(1)}%`);
});

test('/po-ryzyko ma 4. wymiar Historia + blok 🔮 PREDYKCJA i czyta obie bazy', () => {
  const c = read('skills', 'po-ryzyko', 'SKILL.md');
  assert.match(c, /Historia/, 'Brak 4. wymiaru Historia');
  assert.match(c, /🔮 PREDYKCJA/, 'Brak bloku 🔮 PREDYKCJA');
  assert.match(c, /po-knowledge\.md/, 'Nie czyta po-knowledge.md');
  assert.match(c, /project-memory\.md/, 'Nie czyta project-memory.md');
  assert.match(c, /≥\s*2|>=\s*2|2 podobne/, 'Brak progu ≥2 podobnych tasków');
});

test('/po-podobne istnieje z frontmatterem i czyta historię', () => {
  const path = join(CLAUDE_DIR, 'skills', 'po-podobne', 'SKILL.md');
  assert.ok(existsSync(path), 'SKILL.md /po-podobne powinien istnieć');
  const c = readFileSync(path, 'utf8');
  assert.match(c, /^---\r?\n[\s\S]*?description:[\s\S]*?---/, 'Brak frontmatter description');
  assert.match(c, /po-knowledge\.md/, '/po-podobne nie czyta po-knowledge.md');
  assert.match(c, /3 (najbardziej )?podobne|max 3/, '/po-podobne nie zwraca 3 podobnych');
});

test('/po-plan ma alert predykcji >50% przekroczenia', () => {
  const c = read('skills', 'po-plan', 'SKILL.md');
  assert.match(c, /⚠️.*UWAGA|Alert predykcji/, 'Brak alertu predykcji w /po-plan');
  assert.match(c, /50%/, 'Brak progu 50% w alercie');
});
