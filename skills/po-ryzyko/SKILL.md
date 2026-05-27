---
description: Ocenia ryzyko taska przed realizacją w 3 wymiarach: definicja, zależności, technologia. Użyj przed każdym większym taskiem gdy pytasz "czy task jest gotowy", "oceń ryzyko", "po-ryzyko". Podaj nazwę lub ID: /po-ryzyko <nazwa lub ID>.
---

## Twoje zadanie

Argument (nazwa lub ID taska): ## Input

1. Jeśli podano ID — pobierz pełny opis taska z Todoist przez MCP
2. Oceń task w 3 wymiarach ryzyka

## Kryteria oceny

### Definicja (🟢/🟡/🔴)
- 🟢 — task ma jasny cel, konkretne kroki i definicję ukończenia
- 🟡 — task jest opisany ale brakuje detali technicznych lub kryteriów sukcesu
- 🔴 — cel jest niejasny, brak specyfikacji, wymaga doprecyzowania

### Zależności (🟢/🟡/🔴)
- 🟢 — task niezależny lub wszystkie zależności już ukończone
- 🟡 — task zależy od czegoś W trakcie lub wymaga danych zewnętrznych
- 🔴 — task wymaga ukończenia innego taska który jest w Backlogu lub ma blokery

### Technologia (🟢/🟡/🔴)
- 🟢 — używa znanych narzędzi (HTML/CSS/JS, Todoist API, PowerShell, Claude SDK)
- 🟡 — wymaga integracji z nowym API lub nieznaną biblioteką
- 🔴 — wymaga technologii której projekt jeszcze nie używał, ryzyko długiego research

## Format output

```
RYZYKO: [nazwa taska]
Definicja:    🟢/🟡/🔴 [1 zdanie]
Zależności:   🟢/🟡/🔴 [1 zdanie]
Technologia:  🟢/🟡/🔴 [1 zdanie]
Wynik: [GOTOWY DO REALIZACJI / WYMAGA DOPRECYZOWANIA]
Akcja: [konkretna rekomendacja jeśli 🔴 — co zrobić zanim zaczniesz]
```

Pisz po polsku. Max 8 linii.
