---
description: Pokazuje co aktualnie działa w tle — którzy agenci są aktywni, jakie skille zostały użyte w tej sesji, i jakie narzędzia MCP są podłączone. Użyj gdy chcesz wiedzieć "co teraz robi Claude", "jakich agentów używasz", "które skille były użyte", "pokaż status sesji", "co jest aktywne".
---

## Twoje zadanie

Wygeneruj przejrzysty raport statusu bieżącej sesji.

### 1. AKTYWNI AGENCI
Wymień agentów (subagentów) którzy zostali wywołani w tej sesji:
- nazwa agenta
- do czego został użyty (jedno zdanie)
- czy zakończył pracę czy nadal aktywny

Jeśli żaden nie był użyty — napisz wyraźnie: "Brak aktywnych agentów w tej sesji"

### 2. UŻYTE SKILLE
Wymień skille które zostały wywołane w tej sesji:
- nazwa skilla (np. /nowa-funkcja)
- kiedy został użyty i po co
- czy wykonał się poprawnie

Jeśli żaden nie był użyty — napisz wyraźnie: "Brak użytych skilli w tej sesji"

### 3. AKTYWNE NARZĘDZIA MCP
Wymień połączenia MCP które są dostępne i aktywne:
- nazwa serwera MCP
- czy był używany w tej sesji
- ostatnia wykonana operacja (jeśli była)

### 4. PODSUMOWANIE JEDNĄ LINIĄ
Krótkie zdanie w formacie:
"Sesja używała: [lista agentów] | Skille: [lista] | MCP: [lista]"

---

## Format wyświetlania w CLI

Wyświetl raport w czytelnym formacie z separatorami, np:

════════════════════════════════════
        STATUS SESJI — [data i godzina po polsku]
════════════════════════════════════

🤖 AGENCI
  ✅ kod-reviewer — sprawdził index.html, zakończony
  ⏳ bug-hunter   — w trakcie analizy

📚 SKILLE
  ✅ /nowa-funkcja — użyty do stworzenia index.html
  ✅ /napisz-testy — użyty do testów modułu X

🔌 MCP
  ✅ Todoist — aktywny, ostatnia operacja: dodano komentarz do Etap 1

════════════════════════════════════
SESJA: kod-reviewer, bug-hunter | /nowa-funkcja, /napisz-testy | Todoist
════════════════════════════════════

---

## Aktualizacja Todoist przez MCP

Po wyświetleniu raportu w CLI — znajdź aktywne zadanie w sekcji
"W trakcie" w projekcie Mój Dashboard (ID: 6gj92jFJMwm2RmFq,
sekcja W trakcie: 6gj92pQqwMR2C3jq) i dodaj do niego komentarz
z pełnym raportem statusu.

Format komentarza:
---
🔍 Status sesji [data i godzina]

🤖 Agenci: [lista lub "brak"]
📚 Skille: [lista lub "brak"]
🔌 MCP: [lista lub "brak"]

[pełny raport]
---

Jeśli nie ma aktywnego zadania w "W trakcie" — NIE zapisuj komentarza.
Wyświetl ostrzeżenie i zakończ:

⚠️ Brak aktywnego taska w 'W trakcie' — status sesji nie został zapisany.
Uruchom /po-plan żeby wskazać task sesji przed zapisem statusu.

Nie pytaj o pozwolenie — wykonaj automatycznie.