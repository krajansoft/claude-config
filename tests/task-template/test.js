import { test } from 'node:test';
import assert from 'node:assert/strict';

// Szablon testów per task — skopiuj do tests/task-[ID]/test.js
// Zmień [ID] na pierwsze 8 znaków ID taska z Todoist

test('Opis co ten test sprawdza', () => {
  // arrange
  const input = 'przykład';
  // act
  const result = input.toUpperCase();
  // assert
  assert.equal(result, 'PRZYKŁAD');
});
