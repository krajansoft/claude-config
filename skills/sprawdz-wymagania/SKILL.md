---
description: Sprawdza Definition of Ready dla taska Todoist (cel, zakres, kryteria akceptacji, estymata, zależności). Wywoływany przez /po-plan przed przeniesieniem taska do W trakcie. Argument: ID taska Todoist.
argument-hint: [taskId]
---

> ZASADA: Odpowiadaj zwięźle. Max 3 zdania wyjaśnienia.

## Argument
$ARGUMENTS

## Twoje zadanie

Weryfikacja Definition of Ready dla taska wskazanego argumentem.

### Krok 1 — Pobierz task
Przez Todoist MCP `fetch-object` (type: task, id: $ARGUMENTS) pobierz opis taska.
Jeśli ID nieznane lub task nie istnieje — zwróć `⚠️ Task [$ARGUMENTS] nie znaleziony` i zakończ.

### Krok 2 — Pobierz komentarze
Przez `find-comments` (taskId: $ARGUMENTS) pobierz komentarze.
Szukaj komentarza z linią `💡 ESTYMATA:` (estymata) i `🎯 RYZYKO:` (ryzyko).

### Krok 3 — Sprawdź 6 elementów DoR (zgodnie z QUALITY.md sekcja 2)

Dla każdego elementu zwróć ✅ lub 🔴 BRAK:

1. **Cel** — czy opis zawiera frazę "Po to robimy" lub "żeby" lub sekcję `## Cel` / `## CEL`?
2. **Zakres** — czy opis ma sekcję `## Zakres` lub `## Co [zbudować|dodać|zrobić]` z punktami "co wchodzi/nie wchodzi"?
3. **Kryteria akceptacji** — czy opis ma `## Definicja ukończenia` lub `## GOTOWE GDY` z min. 3 checkboxami `- [ ]`?
4. **Zależności** — czy opis wspomina inne taski (`po [task]`, `wymaga`, `zależy od`) lub stan systemu (`jeśli`)?
5. **Estymata** — czy komentarz `💡 ESTYMATA:` istnieje w komentarzach lub w opisie?
6. **Ryzyko** — czy komentarz `🎯 RYZYKO:` istnieje w komentarzach lub opis ma sekcję `## Ryzyko`?

### Krok 4 — Wyświetl wynik

Format wyniku (max 12 linii):

```
════════════════════════════════════
DOR CHECK — [nazwa taska]
════════════════════════════════════
Cel:               [✅/🔴]
Zakres:            [✅/🔴]
Kryteria akcept.:  [✅/🔴] ([N] punktów)
Zależności:        [✅/🔴]
Estymata:          [✅/🔴]
Ryzyko:            [✅/🔴]
────────────────────────────────────
WYNIK: [✅ GOTOWY DO STARTU / ⚠️ NIEGOTOWY]
[jeśli niegotowy:]
Brakuje: [lista elementów]
Akcja:   [konkretna sugestia np. "wywołaj /po-estymuj"]
════════════════════════════════════
```

### Krok 5 — Reguła decyzyjna
- Wszystkie 6 ✅ → wynik `✅ GOTOWY DO STARTU`
- Brakuje 1-2 elementów → `⚠️ NIEGOTOWY` + konkretne sugestie
- Brakuje 3+ elementów → `🔴 NIEGOTOWY — KRYTYCZNE braki` + sugestia rozbicia taska

Pisz po polsku. Nie modyfikuj taska — tylko raportuj.
