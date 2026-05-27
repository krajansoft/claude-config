---
description: Tworzy Pull Request dla aktywnego brancha taska. Wywołuj po /git-commit gdy kończysz task. Pushuje branch i otwiera PR do master w repo claude-config.
---

> ZASADA: Odpowiadaj zwięźle. Max 3 zdania wyjaśnienia.

## Twoje zadanie

Utwórz Pull Request dla aktywnego brancha w repo claude-config.

### Krok 1: Sprawdź branch
!`cd C:\Users\adamk\.claude && git branch --show-current`
Jeśli wynik to "master" lub "main" — poinformuj użytkownika:
"Brak aktywnego brancha taska — nie ma co PR-ować. Przejdź na branch taska."
Zakończ.

### Krok 2: Sprawdź niezacommitowane zmiany
!`cd C:\Users\adamk\.claude && git status --short`
Jeśli są zmiany — przypomnij: "Najpierw wywołaj /git-commit."
Zakończ.

### Krok 3: Push brancha
!`cd C:\Users\adamk\.claude && git push -u origin [nazwa-brancha]`

### Krok 4: Utwórz PR przez gh CLI
Tytuł PR: zamień myślniki w nazwie brancha na spacje, usuń prefiks "task/", capitalize.
!`cd C:\Users\adamk\.claude && gh pr create --base master --title "[tytuł]" --body "$(cat <<'EOF'
## Co zostało zrobione
[opis z nazwy brancha / aktywnego taska Todoist]

## Test plan
- [ ] Wywołaj powiązany skill i sprawdź output
- [ ] Sprawdź czy hooki działają poprawnie
- [ ] Brak regresji w innych skillach

🤖 Generated with [Claude Code](https://claude.ai/claude-code)
EOF
)"`

### Krok 5: Pobierz URL PR
!`cd C:\Users\adamk\.claude && gh pr view --json url -q .url`

### Krok 6: Zapisz PR w Todoist
Znajdź aktywne zadanie w sekcji "W trakcie" (ID: 6gj92pQqwMR2C3jq).
Dodaj komentarz przez MCP: "🔗 PR: [URL]"

### Krok 7: Wyświetl podsumowanie
════════════════════════════════════
PR UTWORZONY
════════════════════════════════════
Branch: [nazwa-brancha]
PR URL: [url]
Status: oczekuje na review — wywołaj /code-review po merge
════════════════════════════════════
