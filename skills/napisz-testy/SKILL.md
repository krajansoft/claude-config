---
description: Pisze testy dla istniejącego kodu. Użyj gdy chcesz przetestować funkcję, komponent lub moduł. Możesz podać nazwę pliku lub funkcji jako argument: /napisz-testy <nazwa pliku lub funkcji>.
argument-hint: [nazwa pliku lub funkcji do przetestowania]
---

## Co testować

$ARGUMENTS

## Procedura pisania testów

Wykonaj kroki w tej kolejności:

### Krok 1: Zrozum kod
- Przeczytaj kod który ma być przetestowany
- Jeśli $ARGUMENTS jest puste — zapytaj użytkownika co chce przetestować
- Zidentyfikuj: co każda funkcja przyjmuje, co zwraca, jakie są możliwe błędy

### Krok 2: Sprawdź projekt
- Czy projekt ma już testy? Znajdź istniejące pliki testowe
- Jakiego frameworka używa? (Jest, Mocha, Vitest, pytest, unittest itd.)
- Jeśli brak frameworka — zaproponuj najprostszy dla tej technologii

### Krok 3: Napisz testy
Dla każdej funkcji napisz testy pokrywające:
- **Przypadek normalny** — typowe dane wejściowe, oczekiwany wynik
- **Przypadki graniczne** — zero, pusty string, bardzo duża liczba, null
- **Przypadek błędu** — nieprawidłowe dane wejściowe

### Krok 4: Wyjaśnij testy
Po każdym teście dodaj komentarz po polsku: co ten test sprawdza i dlaczego jest ważny.

### Krok 5: Powiedz jak uruchomić
Podaj dokładną komendę do uruchomienia testów w tym projekcie.

Pisz po polsku (komentarze i opisy). Kod testów pisz w języku odpowiednim dla projektu.
