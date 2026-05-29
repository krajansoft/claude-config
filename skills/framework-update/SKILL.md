---
description: Synchronizuje istniejący projekt z nowszą wersją frameworku claude-config. Pokazuje diff między wersją projektu a frameworku i aplikuje wybrane zmiany. Użyj w projekcie który chcesz zaktualizować do najnowszego frameworku.
argument-hint: (uruchom w katalogu projektu)
---

> ZASADA: Odpowiadaj zwięźle. Max 3 zdania wyjaśnienia.

## Twoje zadanie

Zaktualizuj bieżący projekt do nowszej wersji frameworku claude-config.

### Krok 1 — Odczytaj wersję frameworku
Wczytaj `C:\Users\adamk\.claude\VERSION` (np. 1.2.0).

### Krok 2 — Odczytaj wersję projektu
Znajdź `.claude\project.config.md` w bieżącym projekcie i odczytaj linię `Wersja frameworku:`.
Jeśli brak pliku — to nie jest projekt z frameworku: zatrzymaj się i zaproponuj `/nowy-projekt`.
Jeśli wersja projektu == wersja frameworku — poinformuj "Projekt aktualny (v[X.Y.Z])" i zakończ.

### Krok 3 — Pokaż diff między wersjami
Wczytaj `C:\Users\adamk\.claude\CHANGELOG.md`.
Wypisz wszystkie wpisy z wersji NOWSZYCH niż wersja projektu — co Dodano/Zmieniono/Naprawiono.
Pogrupuj według tego co dotyka projektu (skille, hooki, agenci, dokumentacja).

### Krok 4 — Zapytaj co zastosować
Dla każdej grupy zmian zapytaj użytkownika czy zastosować (tak/nie/pokaż szczegóły).
Domyślnie sugeruj zastosowanie wszystkiego, ale szanuj lokalne modyfikacje projektu —
jeśli plik w projekcie był ręcznie zmieniony, ostrzeż przed nadpisaniem.

### Krok 5 — Aplikuj wybrane zmiany
Skopiuj/zaktualizuj wybrane pliki z `C:\Users\adamk\.claude\` do projektu.
Aktualizuj ścieżki w hookach na ścieżki projektu (analogicznie jak `/nowy-projekt`).

### Krok 6 — Zaktualizuj wersję projektu
W `.claude\project.config.md` ustaw `Wersja frameworku:` na wersję frameworku.

### Krok 7 — Potwierdź
```
════════════════════════════════════
FRAMEWORK UPDATE: [wersja-projektu] → [wersja-frameworku]
════════════════════════════════════
Zastosowano:  [lista grup zmian]
Pominięto:    [lista | —]
project.config.md: zaktualizowany
Następnie:    przejrzyj zmiany i /git-commit
════════════════════════════════════
```

Nie commituj automatycznie. Pisz po polsku.
