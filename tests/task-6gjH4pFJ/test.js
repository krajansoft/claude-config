import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const CLAUDE_DIR = process.env.CLAUDE_DIR_OVERRIDE || 'C:\\Users\\adamk\\.claude';
const read = (...p) => readFileSync(join(CLAUDE_DIR, ...p), 'utf8');

test('Agent orkiestrator istnieje z frontmatterem name/description', () => {
  const path = join(CLAUDE_DIR, 'agents', 'orkiestrator', 'AGENT.md');
  assert.ok(existsSync(path), 'AGENT.md orkiestratora powinien istnieć');
  const c = readFileSync(path, 'utf8');
  assert.match(c, /^---\r?\n[\s\S]*?name:\s*orkiestrator[\s\S]*?---/, 'Brak frontmatter name: orkiestrator');
  assert.match(c, /description:/, 'Brak description w frontmatter');
});

test('AGENT.md opisuje fazy 1-4 i regułę 2x kosztu', () => {
  const c = read('agents', 'orkiestrator', 'AGENT.md');
  for (const phase of ['Faza 1', 'Faza 2', 'Faza 3', 'Faza 4']) {
    assert.match(c, new RegExp(phase), `Brak ${phase} w AGENT.md`);
  }
  assert.match(c, /2× koszt|2x koszt/, 'Brak reguły kosztu orkiestratora');
});

test('agent-state.template.json jest poprawnym JSON-em i ma pole lock + 3 agentów', () => {
  const path = join(CLAUDE_DIR, 'agents', 'orkiestrator', 'agent-state.template.json');
  assert.ok(existsSync(path), 'Szablon agent-state.json powinien istnieć');
  const data = JSON.parse(readFileSync(path, 'utf8'));
  assert.ok('lock' in data, 'Brak pola "lock" (pod Model 3)');
  for (const a of ['test-writer', 'bug-hunter', 'kod-reviewer']) {
    assert.ok(data.agents[a], `Brak agenta ${a} w szablonie`);
    assert.ok('status' in data.agents[a], `Agent ${a} bez pola status`);
  }
});

test('Skill /orkiestrator-start istnieje z frontmatterem', () => {
  const path = join(CLAUDE_DIR, 'skills', 'orkiestrator-start', 'SKILL.md');
  assert.ok(existsSync(path), 'SKILL.md orkiestrator-start powinien istnieć');
  const c = readFileSync(path, 'utf8');
  assert.match(c, /^---\r?\n[\s\S]*?description:[\s\S]*?---/, 'Brak frontmatter description');
  assert.match(c, /agent-state\.json/, 'Skill nie wspomina agent-state.json');
});

test('/po-rownolegle ma logikę wyboru trybu (orkiestrator)', () => {
  const c = read('skills', 'po-rownolegle', 'SKILL.md');
  assert.match(c, /orkiestrator/i, '/po-rownolegle nie wspomina orkiestratora');
  assert.match(c, /Tryb:/, '/po-rownolegle nie dodaje linii Tryb do outputu');
});
