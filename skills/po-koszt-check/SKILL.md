---
description: Sprawdza stan budżetu 5-godzinnego Claude Code i daje rekomendację. Użyj gdy pytasz "ile mam budżetu", "czy mogę zacząć task", "sprawdź budżet", "po-koszt-check".
---

## Twoje zadanie

Sprawdź stan budżetu sesji Claude Code i daj rekomendację.

Budżet 5-godzinny Claude Code: ~$5-20 (zależy od planu).
Cykl resetuje co 5 godzin od pierwszego użycia w danym oknie.

Sprawdź:
1. Aktualną godzinę (czas polski UTC+1/UTC+2)
2. Czy jesteśmy w szczycie (14:00–20:00 PL = większe obciążenie)
3. Ile tasków jest W trakcie — czy sesja dopiero się zaczyna czy trwa już długo?
4. Przeczytaj ostatnie komentarze /koszt-sesji z aktywnych tasków w Todoist
   (sekcja W trakcie: 6gj92pQqwMR2C3jq) żeby ocenić wydatki sesji

## Format output (max 6 linii)

```
BUDŻET 5H:
Wydano dziś:   ~$X.XX (szacunek z komentarzy /koszt-sesji)
Godzina:       [HH:MM] PL | Szczyt: [TAK/NIE]
Status:        [OK / UWAGA: dużo wydano / KRYTYCZNE]
Rekomendacja:  [zacznij task / poczekaj na reset / kończ sesję]
```

Jeśli brak danych z komentarzy — napisz "brak danych historycznych, szacunek niedostępny".
Pisz po polsku.
