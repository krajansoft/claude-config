---
description: Szacuje koszt i ryzyko naprawy buga przed rozpoczęciem pracy. Użyj przed naprawą żeby wiedzieć ile może kosztować. Argument: /po-ryzyko-bug <ID taska lub opis buga>.
argument-hint: [ID taska BUG lub opis]
---

> ZASADA: Odpowiadaj zwięźle. Max 3 zdania wyjaśnienia.

## Bug do oceny
$ARGUMENTS

## Twoje zadanie

### Krok 1 — Pobierz dane
Jeśli $ARGUMENTS wygląda jak ID (ciąg znaków bez spacji) — pobierz task przez MCP fetch-object.
Jeśli $ARGUMENTS to opis — użyj go bezpośrednio do oceny.

### Krok 2 — Oceń 4 czynniki ryzyka (każdy 1-3)
- Złożoność kodu: 1=proste (jedna linia), 2=średnie (jeden plik), 3=złożone (wiele plików)
- Ryzyko regresji: 1=brak, 2=możliwa, 3=wysokie (zmiany w shared skillach/hookach)
- Niejasność przyczyny: 1=jasna, 2=wymaga dochodzenia, 3=nieznana
- Zależności zewnętrzne: 1=brak, 2=Todoist MCP, 3=gh/git/PS hooks

Suma punktów → ryzyko ogólne:
- 4-6:  NISKIE
- 7-9:  ŚREDNIE
- 10-12: WYSOKIE

### Krok 3 — Estymata tokenów
- NISKIE:   ~5-15k tokenów  ($0.10-$0.30) — NAPRAW TERAZ
- ŚREDNIE:  ~15-40k tokenów ($0.30-$0.80) — ZAPLANUJ W SESJI
- WYSOKIE:  ~40-100k tokenów ($0.80-$2.00) — ODŁÓŻ NA OSOBNĄ SESJĘ

### Krok 4 — Wyświetl raport
```
════════════════════════════════════
RYZYKO NAPRAWY BUGA
════════════════════════════════════
Bug:     [nazwa]
Ryzyko:  [NISKIE/ŚREDNIE/WYSOKIE]
Est.:    ~$[min]-$[max]
Decyzja: [NAPRAW TERAZ / ZAPLANUJ / ODŁÓŻ]
Uwaga:   [1 zdanie jeśli ryzyko regresji > 1]
════════════════════════════════════
```
