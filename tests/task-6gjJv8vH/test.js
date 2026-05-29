import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const CLAUDE_DIR = process.env.CLAUDE_DIR_OVERRIDE || 'C:\\Users\\adamk\\.claude';
const read = (...p) => readFileSync(join(CLAUDE_DIR, ...p), 'utf8');

test('/po-plan wymusza estymatę w KROK 0 (linia 💡 ESTYMATA)', () => {
  const c = read('skills', 'po-plan', 'SKILL.md');
  assert.match(c, /💡 ESTYMATA:/, '/po-plan nie wspomina formatu 💡 ESTYMATA');
  assert.match(c, /\/po-estymuj/, '/po-plan nie wywołuje /po-estymuj gdy brak estymaty');
});

test('/po-estymuj definiuje kanoniczny format estymaty', () => {
  const c = read('skills', 'po-estymuj', 'SKILL.md');
  // 💡 ESTYMATA: $[min]—$[max] (pewność: [XX]%) | [YYYY-MM-DD]
  assert.match(c, /💡 ESTYMATA:\s*\$\[min\]—\$\[max\]\s*\(pewność:/, 'Brak kanonicznego formatu w /po-estymuj');
});

test('/podsumuj-sesje ma sekcję automatycznego /po-uczenie', () => {
  const c = read('skills', 'podsumuj-sesje', 'SKILL.md');
  assert.match(c, /Automatyczne uczenie się/, 'Brak sekcji automatycznego uczenia');
  assert.match(c, /\/po-uczenie/, '/podsumuj-sesje nie wywołuje /po-uczenie');
});

test('/po-uczenie zapisuje kategorię błędu dla pie chart', () => {
  const c = read('skills', 'po-uczenie', 'SKILL.md');
  for (const cat of ['Długa sesja', 'Nieznana technologia', 'Iteracje bugów', 'Złe wymagania', 'Inne']) {
    assert.match(c, new RegExp(cat), `Brak kategorii "${cat}" w /po-uczenie`);
  }
});
