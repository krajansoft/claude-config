---
description: Retrospektywa sprintu — podsumowanie ukończonych tasków, analiza dokładności estymacji, wnioski. Wywołuj po ukończeniu grupy tasków lub gdy pytasz "jak poszedł sprint", "po-retro", "retrospektywa".
---

> ZASADA: Odpowiadaj zwięźle. Max 3 zdania wyjaśnienia.

## Twoje zadanie

1. Pobierz taski z sekcji Zrobione (6gj92pRv86Mh4Rvq) projektu 6gj92jFJMwm2RmFq
   — skup się na tasach ukończonych w ostatnich 7 dniach
2. Dla każdego taska pobierz komentarze z Todoist i znajdź "💰 Koszt sesji" — wyciągnij koszt
3. Przeczytaj C:\Users\adamk\.claude\agents\po\po-knowledge.md — sprawdź poprzednie retro
4. Oblicz średni błąd estymacji dla tasków gdzie były estymaty
5. Wyciągnij wnioski i zaktualizuj po-knowledge.md (sekcja "## Współczynniki korekcyjne")

## Obliczenia
- Łączny koszt sprintu = suma kosztów ze wszystkich komentarzy /koszt-sesji
- Średni błąd = średnia z |real - est| / est * 100% (tylko dla tasków z estymacją)
- Najlepszy task = najmniejszy błąd estymacji
- Najgorszy task = największy błąd estymacji

## Format output (max 10 linii)

```
RETRO [data]:
Taski: [N] ukończono | koszt: $X.XX łącznie
Estymacja: średni błąd XX% [lepsza/gorsza/brak danych vs poprzednio]
Najlepszy task: [nazwa] — błąd tylko XX%
Najgorszy task: [nazwa] — błąd XX%, przyczyna: [1 zdanie]
Wniosek: [1 konkretna zmiana na następny sprint]
Zapis do: po-knowledge.md ✅
```

Pisz po polsku. Po wyświetleniu — dopisz wniosek do po-knowledge.md.

## Aktualizacja QUALITY.md (sekcja 9 — Retrospektywa procesu)

Po zapisaniu do po-knowledge.md — zaktualizuj `C:\Users\adamk\.claude\QUALITY.md`:

1. Wczytaj zawartość pliku QUALITY.md.
2. Znajdź markery `<!-- po-retro:start -->` i `<!-- po-retro:end -->`.
3. Wstaw nowy blok BEZPOŚREDNIO PRZED `<!-- po-retro:end -->`, zachowując całą wcześniejszą historię między markerami (poprzednie wpisy zostają, dopisujesz tylko najnowszy na końcu):

```
### Retro [data YYYY-MM-DD]
Sprint: [N] tasków | koszt: $X.XX | śr. błąd: XX%
Wzorzec: [1 zdanie — co się powtarza]
Zmiana procesu: [1 konkretna zmiana w workflow / DoR / DoD]
```

4. Zapisz plik. Nie modyfikuj reszty QUALITY.md — tylko sekcję po-retro:start/end.

Jeśli markery nie istnieją — wyświetl ostrzeżenie i pomiń krok (nie psuj pliku).
