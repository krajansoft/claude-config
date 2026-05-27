---
description: Główna komenda startowa sesji PO. Pobiera taski z Todoist, sprawdza budżet, szacuje koszty P1 i układa plan sesji. Użyj na początku każdej sesji kodowania lub gdy pytasz "co robić dziś", "zaplanuj sesję", "po-plan".
---

## Twoje zadanie

Wykonaj w tej kolejności:

1. Pobierz taski z Todoist — sekcje Backlog (6gj92pW5rVJc9vcq) i W trakcie (6gj92pQqwMR2C3jq), projekt 6gj92jFJMwm2RmFq
2. Sprawdź aktualną godzinę — czy jesteśmy w szczycie (14:00–20:00 PL)?
3. Dla każdego taska P1 oszacuj koszt na podstawie opisu (heurystyki z AGENT.md)
4. Ułóż plan sesji który mieści się w ~$5 (typowy budżet 5-godzinny)
5. Przeczytaj C:\Users\adamk\.claude\agents\po\po-knowledge.md przed estymacją

## Format output (max 10 linii)

```
════════════════════════════════════
PLAN SESJI — [data] [godzina] [szczyt/poza szczytem]
Budżet:  ~$5.00 dostępne szacunkowo
Zadania: [N] P1 | [N] P2 | [N] P3

1. [nazwa taska] — est. $X.XX — [model: haiku/sonnet/opus]
2. [nazwa taska] — est. $X.XX — [model]
3. [nazwa taska] — est. $X.XX — [model]

Łącznie: ~$X.XX | Ryzyko budżetu: [niskie/średnie/wysokie]
Uwaga: [1 zdanie jeśli coś wymaga uwagi]
════════════════════════════════════
```

Odpowiadaj wyłącznie w tym formacie. Pisz po polsku.
