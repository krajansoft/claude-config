---
description: Tworzy Pull Request dla aktywnego brancha taska. Wywołuj po /git-commit gdy kończysz task. Pushuje branch, uruchamia PR review, otwiera PR do master w repo claude-config.
---

> ZASADA: Odpowiadaj zwięźle. Max 3 zdania wyjaśnienia.

## Twoje zadanie

Utwórz Pull Request dla aktywnego brancha w repo claude-config.

### Krok 1: Sprawdź branch
Użyj Bash tool: `git -C "C:\Users\adamk\.claude" branch --show-current`
Jeśli wynik to "master" lub "main" — poinformuj:
"Brak aktywnego brancha taska — nie ma co PR-ować."
Zakończ.

### Krok 2: Sprawdź niezacommitowane zmiany
Użyj Bash tool: `git -C "C:\Users\adamk\.claude" status --short`
Jeśli są zmiany — przypomnij: "Najpierw wywołaj /git-commit."
Zakończ.

### Krok 3: PR Review
Pobierz diff przez Bash tool:
`git -C "C:\Users\adamk\.claude" diff master...HEAD --stat`
`git -C "C:\Users\adamk\.claude" diff master...HEAD`

Wywołaj agenta kod-reviewer przekazując pobrany diff w treści:
"Tryb PR review. Branch: [nazwa-brancha]. Diff: [pełny tekst difu]. Sprawdź checklist 12 punktów i zwróć raport."

Jeśli WYNIK to 🔴 BLOKUJĄCE — zatrzymaj się i pokaż raport. Nie twórz PR.
Jeśli WYNIK to ⚠️ WYMAGA POPRAWEK — pokaż raport i zapytaj: "Kontynuować mimo uwag?"

### Krok 4: Push brancha
Użyj Bash tool: `git -C "C:\Users\adamk\.claude" push -u origin [nazwa-brancha]`

### Krok 5: Utwórz PR
Tytuł: zamień myślniki w nazwie brancha na spacje, usuń prefiks "task/", capitalize.
Użyj Bash tool:
`gh pr create --repo krajansoft/claude-config --base master --head [nazwa-brancha] --title "[tytuł]" --body "Zmiany z brancha [nazwa-brancha]. Review: kod-reviewer PR checklist zaliczony."`

### Krok 6: Pobierz URL PR
Użyj Bash tool: `gh pr view --repo krajansoft/claude-config [nazwa-brancha] --json url -q .url`

### Krok 7: Zapisz PR w Todoist
Znajdź aktywne zadanie w sekcji "W trakcie" (ID: 6gj92pQqwMR2C3jq).
Dodaj komentarz przez MCP: "PR: [URL]"

### Krok 8: Wyświetl podsumowanie

```
════════════════════════════════════
PR UTWORZONY
════════════════════════════════════
Branch: [nazwa-brancha]
Review: ✅ GOTOWE DO MERGE
PR URL: [url]
════════════════════════════════════
```
