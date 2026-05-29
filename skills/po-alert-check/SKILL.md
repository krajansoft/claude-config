---
description: Sprawdza 4 wyzwalacze i tworzy alerty w Todoist (push na telefon) gdy próg spełniony — budżet 80%, seria błędów estymy, brak commitów, droga sesja. Wywoływany automatycznie przez /podsumuj-sesje lub ręcznie "po-alert-check".
---

> ZASADA: Odpowiadaj zwięźle. Max 3 zdania wyjaśnienia.

## Twoje zadanie

Sprawdź 4 wyzwalacze. Dla każdego spełnionego — utwórz task-alert w Backlogu (6gj92pW5rVJc9vcq)
przez Todoist MCP, z terminem `dziś` (dueString: "today"). Jeśli próg NIE spełniony — pomiń.
Jeśli brak danych do oceny wyzwalacza — pomiń (graceful skip), nie zgaduj.

### Anty-duplikat (WAŻNE)
Przed utworzeniem alertu pobierz taski z Backlogu i sprawdź czy NIE istnieje już task
zaczynający się od tej samej nazwy `🔔 ALERT: [typ]` z terminem dziś. Jeśli istnieje — pomiń.

### Wyzwalacz 1 — Budżet miesięczny ≥80% (priorytet p1)
Źródło: miesięczny limit budżetu (jeśli zdefiniowany — np. w project.config.md lub przez /po-budzet).
Jeśli limit NIE jest nigdzie zdefiniowany — POMIŃ ten wyzwalacz (nie wymyślaj limitu).
Jeśli zdefiniowany i wydano ≥80%:
```
🔔 ALERT: Budżet miesięczny [X]% wykorzystany
Opis: Wydano $[X] z $[limit]. Zostaje $[Z]. Przy obecnym tempie limit skończy się [data].
```

### Wyzwalacz 2 — Seria błędów estymy >50% (priorytet p2)
Źródło: C:\Users\adamk\.claude\agents\po\po-knowledge.md, sekcja "Historia estymacji".
Weź 3 OSTATNIE wpisy. Jeśli WSZYSTKIE trzy mają błąd >50% — utwórz:
```
🔔 ALERT: PO myli się 3x z rzędu >50%
Opis: Ostatnie 3 estymaty: [%, %, %]. Estymaty nierzetelne — wywołaj /po-retro.
```
Jeśli <3 wpisów lub którykolwiek z 3 ostatnich ≤50% — pomiń.

### Wyzwalacz 3 — Brak commitów 7 dni (priorytet p2)
Źródło: `git -C "C:\Users\adamk\.claude" log -1 --format=%cd --date=short` (i analogicznie repo projektu).
Jeśli ostatni commit starszy niż 7 dni od dziś:
```
🔔 ALERT: Brak postępów od [N] dni
Opis: Ostatni commit: [data]. Co blokuje?
```

### Wyzwalacz 4 — Droga sesja >$2.00 (priorytet p3)
Źródło: najnowszy komentarz "💰 Koszt sesji" w sekcji W trakcie lub (jeśli pusto) ostatnio
zamkniętym tasku w Zrobione (6gj92pRv86Mh4Rvq). Parsuj koszt USD z linii "💵 Koszt: ~$X".
Jeśli koszt jednej sesji > $2.00:
```
🔔 ALERT: Droga sesja — $[X]
Opis: Sesja [data] kosztowała $[X]. Największe zużycie: [opis z komentarza].
```

## Format output (max 8 linii)

```
🔔 ALERT-CHECK — [data]
Budżet:   [✅ ok / ⚠️ alert / — brak limitu]
Estymaty: [✅ ok / ⚠️ 3x >50% / — za mało danych]
Commity:  [✅ ok (N dni) / ⚠️ brak od N dni]
Sesja:    [✅ ok / ⚠️ droga $X]
─────────────────────────
Utworzono alertów: [N]  (lub: brak — wszystko w normie)
```

Nie pytaj o pozwolenie — twórz alerty automatycznie gdy próg spełniony.
Pisz po polsku.
