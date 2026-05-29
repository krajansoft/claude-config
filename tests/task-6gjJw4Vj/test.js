import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const CLAUDE_DIR = process.env.CLAUDE_DIR_OVERRIDE || 'C:\\Users\\adamk\\.claude';
const read = (...p) => readFileSync(join(CLAUDE_DIR, ...p), 'utf8');
const PM_PATH = join(CLAUDE_DIR, 'agents', 'po', 'project-memory.md');

// Parser współczynników: linie "typ: ×N.NN | podstawa: ... | ..."
// Zwraca { [typ]: { factor: Number, raw: String } } — pomija komentarze (#).
function parseCoefficients(content) {
  const out = {};
  const section = content.split(/^##\s+Współczynniki korekcyjne/m)[1] || '';
  const body = section.split(/^##\s+/m)[0]; // do następnego nagłówka
  for (const line of body.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const m = t.match(/^([^:]+):\s*×([0-9]+\.[0-9]+)\s*\|/);
    if (m) out[m[1].trim()] = { factor: parseFloat(m[2]), raw: t };
  }
  return out;
}

test('project-memory.md istnieje', () => {
  assert.ok(existsSync(PM_PATH), 'project-memory.md powinien istnieć w agents/po/');
});

test('project-memory.md ma wszystkie wymagane sekcje', () => {
  const c = read('agents', 'po', 'project-memory.md');
  for (const h of [
    'Taksonomia typów tasków',
    'Współczynniki korekcyjne per typ taska',
    'Wzorce kosztów',
    'Wzorce czasowe',
    'Wnioski o projekcie',
  ]) {
    assert.match(c, new RegExp(`##\\s+${h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`), `Brak sekcji "${h}"`);
  }
});

test('Współczynniki są parsowalne i w sensownym zakresie (0 < × < 3)', () => {
  const coeffs = parseCoefficients(read('agents', 'po', 'project-memory.md'));
  assert.ok(Object.keys(coeffs).length >= 1, 'Brak choć jednego parsowalnego współczynnika');
  for (const [typ, { factor }] of Object.entries(coeffs)) {
    assert.ok(factor > 0 && factor < 3, `Współczynnik ${typ}=×${factor} poza zakresem (0,3)`);
  }
});

test('Współczynnik UI/JS-małe = ×0.65 (zgodny z historią ~46% przeszacowania)', () => {
  const coeffs = parseCoefficients(read('agents', 'po', 'project-memory.md'));
  assert.ok(coeffs['UI/JS-małe'], 'Brak współczynnika dla UI/JS-małe');
  // śr. przeszacowanie 46% → współczynnik ~0.65; tolerancja ±0.10
  assert.ok(
    Math.abs(coeffs['UI/JS-małe'].factor - 0.65) <= 0.10,
    `UI/JS-małe = ×${coeffs['UI/JS-małe'].factor}, oczekiwano ~0.65`
  );
  assert.match(coeffs['UI/JS-małe'].raw, /podstawa:\s*\d+\s+task/, 'Brak "podstawa: N tasków" w linii współczynnika');
});

test('Każdy typ ze współczynnika należy do taksonomii', () => {
  const c = read('agents', 'po', 'project-memory.md');
  const coeffs = parseCoefficients(c);
  const taxo = c.split(/^##\s+Taksonomia/m)[1].split(/^##\s+/m)[0];
  for (const typ of Object.keys(coeffs)) {
    assert.match(taxo, new RegExp(typ.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `Typ "${typ}" nie zdefiniowany w taksonomii`);
  }
});

test('/po-estymuj czyta project-memory.md, klasyfikuje typ i stosuje korektę', () => {
  const c = read('skills', 'po-estymuj', 'SKILL.md');
  assert.match(c, /project-memory\.md/, '/po-estymuj nie czyta project-memory.md');
  assert.match(c, /[Tt]aksonomia|sklasyfikuj/i, '/po-estymuj nie klasyfikuje typu');
  assert.match(c, /🧬 Korekta/, '/po-estymuj nie pokazuje linii korekty 🧬');
});

test('/po-uczenie zapisuje wzorce do project-memory.md', () => {
  const c = read('skills', 'po-uczenie', 'SKILL.md');
  assert.match(c, /project-memory\.md/, '/po-uczenie nie wspomina project-memory.md');
  assert.match(c, /≥2|>=2|dwa|drugi raz/i, '/po-uczenie nie ma reguły ≥2 tasków dla współczynnika');
});

test('/po-plan pokazuje 🧬 Pamięć na starcie sesji', () => {
  const c = read('skills', 'po-plan', 'SKILL.md');
  assert.match(c, /project-memory\.md/, '/po-plan nie czyta project-memory.md');
  assert.match(c, /🧬 Pamięć/, '/po-plan nie ma linii 🧬 Pamięć w output');
});
