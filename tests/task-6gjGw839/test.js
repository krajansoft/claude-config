import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

// Domyślnie realny framework; override pozwala walidować worktree przed merge.
const CLAUDE_DIR = process.env.CLAUDE_DIR_OVERRIDE || 'C:\\Users\\adamk\\.claude';

test('VERSION istnieje i ma format SemVer X.Y.Z', () => {
  const path = join(CLAUDE_DIR, 'VERSION');
  assert.ok(existsSync(path), 'VERSION powinien istnieć');
  const content = readFileSync(path, 'utf8').trim();
  assert.match(content, /^\d+\.\d+\.\d+$/, `VERSION ma zły format: "${content}"`);
});

test('CHANGELOG.md istnieje, ma sekcję [Unreleased] i wpis 1.0.0', () => {
  const path = join(CLAUDE_DIR, 'CHANGELOG.md');
  assert.ok(existsSync(path), 'CHANGELOG.md powinien istnieć');
  const content = readFileSync(path, 'utf8');
  assert.match(content, /## \[Unreleased\]/, 'Brak sekcji [Unreleased]');
  assert.match(content, /## \[1\.0\.0\]/, 'Brak wpisu [1.0.0]');
});

test('GETTING-STARTED.md frameworku istnieje i linkuje do QUALITY/TESTING/CHANGELOG', () => {
  const path = join(CLAUDE_DIR, 'GETTING-STARTED.md');
  assert.ok(existsSync(path), 'GETTING-STARTED.md powinien istnieć');
  const content = readFileSync(path, 'utf8');
  assert.match(content, /QUALITY\.md/, 'Brak linku do QUALITY.md');
  assert.match(content, /TESTING\.md/, 'Brak linku do TESTING.md');
  assert.match(content, /CHANGELOG\.md/, 'Brak linku do CHANGELOG.md');
});

const SKILLS = [
  ['nowy-projekt', /project\.config\.md/],
  ['framework-bump', /VERSION/],
  ['framework-update', /project\.config\.md/],
];

for (const [name, mustMatch] of SKILLS) {
  test(`Skill /${name} istnieje z frontmatterem i treścią`, () => {
    const path = join(CLAUDE_DIR, 'skills', name, 'SKILL.md');
    assert.ok(existsSync(path), `SKILL.md ${name} powinien istnieć`);
    const content = readFileSync(path, 'utf8');
    assert.match(content, /^---\n[\s\S]*?description:[\s\S]*?---/, `Frontmatter z description wymagany w ${name}`);
    assert.match(content, mustMatch, `Skill ${name} nie zawiera oczekiwanej treści`);
  });
}

test('Skille z argumentem mają argument-hint', () => {
  for (const name of ['nowy-projekt', 'framework-bump']) {
    const content = readFileSync(join(CLAUDE_DIR, 'skills', name, 'SKILL.md'), 'utf8');
    assert.match(content, /argument-hint:/, `Skill ${name} powinien mieć argument-hint`);
  }
});
