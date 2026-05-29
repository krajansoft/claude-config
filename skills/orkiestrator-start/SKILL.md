---
description: Uruchamia agenta orkiestratora dla aktywnego taska — dzieli pracę między subagentów (test-writer, bug-hunter, kod-reviewer) i zbiera wyniki. Użyj gdy task jest średni (2-5 plików) i chcesz równoległość w jednej sesji. Wywoływany ręcznie lub przez /po-plan.
argument-hint: [opcjonalnie ID taska]
---

> ZASADA: Odpowiadaj zwięźle. Max 3 zdania wyjaśnienia.

## Argument
$ARGUMENTS — opcjonalne ID taska. Jeśli puste, użyj aktywnego z sekcji „W trakcie".

## Twoje zadanie

### Krok 0 — Sprawdź wykonalność
Orkiestracja wymaga, by subagenci mieli dostęp do narzędzi. Jeśli środowisko blokuje
narzędzia agentów w tle — zatrzymaj się i poinformuj: „Orkiestracja niedostępna w tym
środowisku (subagenci bez uprawnień) — wykonaj task sekwencyjnie." Zakończ.

### Krok 1 — Ustal task
Pobierz aktywny task z „W trakcie" (6gj92pQqwMR2C3jq) lub task o ID `$ARGUMENTS`.
Jeśli brak — poinformuj i zakończ.

### Krok 2 — Utwórz agent-state.json
Skopiuj `C:\Users\adamk\.claude\agents\orkiestrator\agent-state.template.json`
do katalogu projektu jako `agent-state.json` i uzupełnij `task_id`, `task_name`, `started_at`.

### Krok 3 — Uruchom orkiestratora
Wywołaj agenta `orkiestrator` (Agent tool), przekazując ID i nazwę taska oraz ścieżkę do `agent-state.json`.
Orkiestrator przeprowadzi Fazy 1-4 (analiza → równoległa → sekwencyjna → raport).

### Krok 4 — Pokaż raport
Wyświetl raport końcowy orkiestratora i potwierdź zapis do Todoist.

Pisz po polsku.
