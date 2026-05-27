---
description: Analizuje Backlog pod kątem równoległej pracy w dwóch terminalach. Użyj gdy chcesz pracować szybciej, masz dużo niezależnych tasków, lub pytasz "co można zrównoleglić", "praca równoległa".
---

## Twoje zadanie

1. Pobierz wszystkie taski z Backlogu (sekcja 6gj92pW5rVJc9vcq) projektu 6gj92jFJMwm2RmFq
2. Zidentyfikuj pary tasków które są od siebie niezależne (nie dzielą plików, nie mają zależności)
3. Sprawdź czy łączny koszt obu tasków się opłaca vs sekwencyjne wykonanie
4. Podaj konkretne instrukcje: co do którego terminala

## Zasady niezależności
Taski są niezależne jeśli:
- Dotyczą różnych plików
- Nie ma między nimi zależności logicznej (task B nie wymaga wyniku A)
- Jeden nie modyfikuje konfiguracji której używa drugi

## Uwaga o budżecie
Każdy terminal zużywa osobny budżet 5h. Dwa terminale = dwa budżety.
Opłaca się tylko gdy zysk czasowy > koszt dodatkowego kontekstu.

## Format output (max 8 linii)

```
RÓWNOLEGŁA PRACA:
Terminal 1: [task] — est. $X.XX — [model]
Terminal 2: [task] — est. $X.XX — [model]
Łączny koszt: $X.XX | Zysk czasowy: ~XX%
Niezależność: [TAK — opis / NIE — przyczyna]
Uwaga: każdy terminal zużywa osobny budżet 5h
```

Jeśli brak niezależnych par — napisz to wprost. Pisz po polsku.
