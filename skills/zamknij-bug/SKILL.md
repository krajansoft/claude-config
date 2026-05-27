---
description: Zamyka naprawionego buga — dodaje raport naprawy i aktualizuje wiedzę PO. Wywołaj po naprawieniu buga, przed /po-pr. Argument: /zamknij-bug <ID taska lub opis co naprawiono>.
argument-hint: [ID taska BUG lub opis naprawy]
---

> ZASADA: Odpowiadaj zwięźle. Max 3 zdania wyjaśnienia.

## Naprawiony bug
$ARGUMENTS

## Twoje zadanie

### Krok 1 — Znajdź task buga
Jeśli $ARGUMENTS wygląda jak ID — pobierz task przez MCP fetch-object.
Jeśli $ARGUMENTS to opis — znajdź przez MCP find-tasks w sekcji Bugi (6gj92pQjFpC8gfrH).

### Krok 2 — Dodaj komentarz z raportem naprawy
Przez MCP add-comments dodaj do taska buga:

```
✅ Naprawiono — [data]
Przyczyna: [1 zdanie — root cause]
Naprawa: [1 zdanie — co zmieniono i w jakim pliku]
Koszt naprawy: [pobierz kwotę z ostatniego komentarza "💰 Koszt sesji" w aktywnym tasku sekcji W trakcie (6gj92pQqwMR2C3jq) lub wpisz "nieznany"]
Wniosek: [1 zdanie — jak zapobiec podobnym błędom]
```

### Krok 3 — Zamknij task
Przez MCP complete-tasks: [ID taska buga].

### Krok 4 — Zaktualizuj po-knowledge.md
Przeczytaj C:\Users\adamk\.claude\agents\po\po-knowledge.md.
Dopisz wniosek w sekcji "## Historia błędów" (utwórz jeśli nie istnieje):

```
### [data] [SKILL/AGENT/HOOK/CONFIG]
Błąd: [1 zdanie]
Przyczyna: [1 zdanie]
Koszt naprawy: [kwota lub "nieznany"]
Wniosek: [1 zdanie jak zapobiec]
```

### Krok 4b — Sprawdź czy kontynuować workflow
Po zamknięciu buga — jeśli naprawiałeś w ramach aktywnego taska (W trakcie), przypomnij:
"Następny krok: /po-pr żeby zamknąć branch z naprawą."

### Krok 5 — Wyświetl potwierdzenie
```
════════════════════════════════════
BUG ZAMKNIĘTY
════════════════════════════════════
Task:    [nazwa taska]
Naprawa: [1 zdanie]
Koszt:   [kwota]
Wniosek: [1 zdanie]
po-knowledge.md: aktualizacja dodana
════════════════════════════════════
```
