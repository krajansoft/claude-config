import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const CLAUDE_DIR = 'C:\\Users\\adamk\\.claude';

test('QUALITY.md istnieje i ma sekcje 1-10', () => {
  const path = join(CLAUDE_DIR, 'QUALITY.md');
  assert.ok(existsSync(path), 'QUALITY.md powinien istnieć');
  const content = readFileSync(path, 'utf8');
  for (const n of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
    assert.match(content, new RegExp(`## ${n}\\.`), `Brak sekcji ${n} w QUALITY.md`);
  }
});

test('QUALITY.md ma markery po-retro do automatycznej aktualizacji', () => {
  const content = readFileSync(join(CLAUDE_DIR, 'QUALITY.md'), 'utf8');
  assert.match(content, /<!-- po-retro:start -->/, 'Brak markera po-retro:start');
  assert.match(content, /<!-- po-retro:end -->/, 'Brak markera po-retro:end');
  const startIdx = content.indexOf('<!-- po-retro:start -->');
  const endIdx = content.indexOf('<!-- po-retro:end -->');
  assert.ok(startIdx < endIdx, 'Marker start musi być przed end');
});

test('TESTING.md istnieje i linkuje do QUALITY.md', () => {
  const path = join(CLAUDE_DIR, 'TESTING.md');
  assert.ok(existsSync(path), 'TESTING.md powinien istnieć');
  const content = readFileSync(path, 'utf8');
  assert.match(content, /QUALITY\.md/, 'TESTING.md nie linkuje do QUALITY.md');
});

test('QUALITY.md linkuje do TESTING.md', () => {
  const content = readFileSync(join(CLAUDE_DIR, 'QUALITY.md'), 'utf8');
  assert.match(content, /TESTING\.md/, 'QUALITY.md nie linkuje do TESTING.md');
});

test('Skill /sprawdz-wymagania istnieje z poprawnym frontmatterem', () => {
  const path = join(CLAUDE_DIR, 'skills', 'sprawdz-wymagania', 'SKILL.md');
  assert.ok(existsSync(path), 'SKILL.md sprawdz-wymagania powinien istnieć');
  const content = readFileSync(path, 'utf8');
  assert.match(content, /^---\n[\s\S]*?description:[\s\S]*?---/, 'Frontmatter z description wymagany');
  assert.match(content, /argument-hint:/, 'argument-hint w frontmatter wymagany');
});

test('Skill /sprawdz-wymagania sprawdza Ryzyko (spójność z QUALITY.md DoR)', () => {
  const content = readFileSync(
    join(CLAUDE_DIR, 'skills', 'sprawdz-wymagania', 'SKILL.md'),
    'utf8',
  );
  assert.match(content, /\*\*Ryzyko\*\*/, 'Skill musi sprawdzać element "Ryzyko" zgodnie z QUALITY.md sekcja 2');
});

test('/po-plan wywołuje /sprawdz-wymagania przed przeniesieniem taska', () => {
  const content = readFileSync(
    join(CLAUDE_DIR, 'skills', 'po-plan', 'SKILL.md'),
    'utf8',
  );
  assert.match(content, /\/sprawdz-wymagania/, '/po-plan nie odwołuje się do /sprawdz-wymagania');
  assert.match(content, /Definition of Ready/i, '/po-plan nie wspomina Definition of Ready');
});

test('/po-retro ma instrukcję aktualizacji QUALITY.md', () => {
  const content = readFileSync(
    join(CLAUDE_DIR, 'skills', 'po-retro', 'SKILL.md'),
    'utf8',
  );
  assert.match(content, /QUALITY\.md/, '/po-retro nie wspomina QUALITY.md');
  assert.match(content, /<!-- po-retro:start -->/, '/po-retro nie używa markera po-retro:start');
  assert.match(content, /<!-- po-retro:end -->/, '/po-retro nie używa markera po-retro:end');
});
