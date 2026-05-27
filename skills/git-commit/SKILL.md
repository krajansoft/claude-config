---
description: Przegląda zmiany i tworzy commit z dobrym opisem. Wywołuj ręcznie gdy chcesz zacommitować swoją pracę.
---
## Zmiany do zacommitowania
!`git status --short`
!`git diff HEAD --stat`
## Procedura commitowania
Wykonaj kroki w tej kolejności:
### Krok 1: Sprawdź czy jest co commitować
Jeśli `git status` pokazuje "nothing to commit" — poinformuj użytkownika i zakończ.
### Krok 2: Pokaż podsumowanie zmian
Wylistuj co zostało zmienione w czytelny sposób:
- Jakie pliki dodano, zmieniono lub usunięto
- Krótki opis co się zmieniło w każdym pliku
### Krok 3: Zaproponuj commit message
Napisz commit message według formatu Conventional Commits:
- `feat: opis` — nowa funkcja
- `fix: opis` — naprawa błędu
- `docs: opis` — zmiany w dokumentacji
- `refactor: opis` — reorganizacja kodu bez zmiany działania
- `test: opis` — dodanie lub zmiana testów
- `chore: opis` — inne zmiany (konfiguracja, zależności)
Opis pisz po angielsku, małymi literami, bez kropki na końcu.
Przykład: `feat: add user login form with validation`
### Krok 4: Zapytaj o potwierdzenie
Zapytaj: "Czy zacommitować z tym opisem, czy chcesz go zmienić?"
Poczekaj na odpowiedź użytkownika.
### Krok 5: Włącz formatowanie
Przed commitem aktywuj flagę formatowania:
!`powershell -File "C:\Users\adamk\.claude\hooks\flag-on.ps1"`
Poczekaj 2 sekundy aż formatowanie się zakończy.
### Krok 6: Wykonaj commit
Po potwierdzeniu uruchom:
!`git add -A && git commit -m "zatwierdzony message"`
Pokaż wynik i potwierdź że commit się udał.
### Krok 7: Wyłącz formatowanie
Po commicie natychmiast usuń flagę formatowania:
!`powershell -File "C:\Users\adamk\.claude\hooks\flag-off.ps1"`
Formatowanie automatyczne jest teraz wyłączone do następnego commita.