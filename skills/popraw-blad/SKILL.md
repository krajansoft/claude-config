---
description: Diagnozuje i naprawia błędy w kodzie. Użyj gdy masz błąd, coś nie działa, widzisz error w konsoli lub szukasz przyczyny problemu. Możesz podać treść błędu jako argument: /popraw-blad <opis błędu lub error message>.
argument-hint: [opis błędu lub wklejony error]
---

## Błąd do naprawienia

$ARGUMENTS

## Procedura naprawy

Wykonaj kroki w tej kolejności:

### Krok 1: Zrozum problem
- Przeczytaj dokładnie opis błędu lub error message powyżej
- Jeśli $ARGUMENTS jest puste — zapytaj użytkownika o szczegóły błędu
- Ustal: co miało się wydarzyć, a co się wydarzyło?

### Krok 2: Znajdź przyczynę
- Zlokalizuj plik i linię gdzie błąd powstaje
- Sprawdź czy to błąd logiki, literówka, brakujący import lub zła nazwa zmiennej
- Sprawdź czy problem nie pochodzi z innego miejsca w kodzie

### Krok 3: Zaproponuj naprawę
- Pokaż dokładnie co zmienić: stary kod i nowy kod obok siebie
- Wyjaśnij prostym językiem DLACZEGO to naprawia błąd
- Oceń ryzyko: czy ta zmiana może coś innego zepsuć?

### Krok 4: Sprawdź efekty uboczne
- Czy zmiana wpływa na inne pliki lub funkcje?
- Czy potrzebne są dodatkowe zmiany w innych miejscach?
- Czy warto napisać test który zabezpieczy przed podobnym błędem w przyszłości?

Pisz po polsku. Bądź konkretny — podawaj numery linii i nazwy plików.
