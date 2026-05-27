import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync } from 'node:fs';
import { execSync } from 'node:child_process';

const CLAUDE_DIR = 'C:\\Users\\adamk\\.claude';

test('Folder skills/ istnieje i jest niepusty', () => {
  const skillsPath = `${CLAUDE_DIR}\\skills`;
  assert.ok(existsSync(skillsPath), 'Folder skills/ nie istnieje');
  const skills = readdirSync(skillsPath);
  assert.ok(skills.length > 0, 'Folder skills/ jest pusty');
});

test('Hook blokada-bezpieczenstwo.ps1 istnieje', () => {
  const hookPath = `${CLAUDE_DIR}\\hooks\\blokada-bezpieczenstwo.ps1`;
  assert.ok(existsSync(hookPath), 'Hook blokada-bezpieczenstwo.ps1 nie istnieje');
});

test('Plik po-knowledge.md istnieje', () => {
  const knowledgePath = `${CLAUDE_DIR}\\agents\\po\\po-knowledge.md`;
  assert.ok(existsSync(knowledgePath), 'po-knowledge.md nie istnieje');
});

test('Git repo ma remote origin', () => {
  const result = execSync(`git -C "${CLAUDE_DIR}" remote get-url origin`, { encoding: 'utf8' }).trim();
  assert.ok(result.includes('github.com'), `Remote origin nie wskazuje na GitHub: ${result}`);
});

test('Folder agents/ istnieje i zawiera kod-reviewer', () => {
  const agentsPath = `${CLAUDE_DIR}\\agents`;
  assert.ok(existsSync(agentsPath), 'Folder agents/ nie istnieje');
  assert.ok(existsSync(`${agentsPath}\\kod-reviewer.md`), 'kod-reviewer.md nie istnieje');
});
