---
description: Ocenia ryzyko taska przed realizacją w 3 wymiarach: definicja, zależności, technologia. Użyj przed każdym większym taskiem gdy pytasz "czy task jest gotowy", "oceń ryzyko", "po-ryzyko". Podaj nazwę lub ID: /po-ryzyko <nazwa lub ID>.
---

## Twoje zadanie

Argument (nazwa lub ID taska): ## Input

1. Jeśli podano ID — pobierz pełny opis taska z Todoist przez MCP
2. Przeczytaj C:\Users\adamk\.claude\agents\po\po-knowledge.md oraz
   C:\Users\adamk\.claude\agents\po\project-memory.md (dane do 4. wymiaru i predykcji)
3. Oceń task w 4 wymiarach ryzyka (poniżej)
4. Wygeneruj blok 🔮 PREDYKCJA jeśli znalazłeś ≥2 podobne taski (zasady niżej)

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

### Historia (🟢/🟡/🔴) — 4. wymiar
Porównaj task z historią z po-knowledge.md (sekcja "Historia estymacji") i project-memory.md
("Wzorce kosztów", "Współczynniki korekcyjne"). Dopasuj po: TYPIE z taksonomii
(project-memory.md), słowach kluczowych w nazwie/opisie, technologii.
- 🟢 — brak podobnych w historii LUB podobne miały błąd estymaty <25%
- 🟡 — ≥2 podobne ze średnim błędem 25–60% (w jedną stronę)
- 🔴 — ≥2 podobne ze średnim błędem >60% LUB typ ma współczynnik korekcyjny daleki od 1 (≤0.6 lub ≥1.5)

## Predykcja (🔮) — gdy ≥2 podobne taski w historii
Policz na podstawie dopasowanych wpisów `est: $X | real: $Y | błąd: XX%`:
- N = liczba podobnych
- średnie przekroczenie = średnia z (real−est)/est × 100 (znak: + niedoszacowanie / − przeszacowanie)
- kwota = średnia z |real−est|
- najczęstszy problem = dominująca `kategoria` lub powtarzająca się `Przyczyna`
- bufor = zaokrąglone średnie przekroczenie (jeśli dodatnie); jeśli przeszacowanie → sugeruj cięcie

Wyświetl blok (max 5 linii) PO bloku RYZYKO. Jeśli <2 podobnych — NIE wyświetlaj predykcji.

## Format output

```
RYZYKO: [nazwa taska]
Definicja:    🟢/🟡/🔴 [1 zdanie]
Zależności:   🟢/🟡/🔴 [1 zdanie]
Technologia:  🟢/🟡/🔴 [1 zdanie]
Historia:     🟢/🟡/🔴 [1 zdanie — ile podobnych, jaki średni błąd]
Wynik: [GOTOWY DO REALIZACJI / WYMAGA DOPRECYZOWANIA]
Akcja: [konkretna rekomendacja jeśli 🔴 — co zrobić zanim zaczniesz]

🔮 PREDYKCJA:                              ← tylko gdy ≥2 podobne taski
Podobne taski w historii: [N]
Średnio przekroczenie: [+/−]XX% (~$X.XX vs estymacja)
Najczęstszy problem: [opis / kategoria]
Rekomendacja: dodaj +XX% bufora | uważaj na [co]
```

Pisz po polsku. Max 8 linii dla bloku RYZYKO + max 5 dla PREDYKCJA.
