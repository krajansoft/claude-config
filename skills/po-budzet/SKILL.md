---
description: Śledzi miesięczny budżet tokenów na podstawie komentarzy /koszt-sesji w Todoist. Użyj gdy pytasz "ile wydałem w tym miesiącu", "jaki jest budżet", "po-budzet", "miesięczne koszty".
---

## Twoje zadanie

1. Pobierz WSZYSTKIE taski z projektu 6gj92jFJMwm2RmFq (wszystkie sekcje)
2. Dla każdego taska pobierz komentarze
3. Znajdź komentarze zaczynające się od "💰 Koszt sesji"
4. Filtruj tylko te z bieżącego miesiąca (na podstawie daty w komentarzu)
5. Zsumuj koszty USD i PLN
6. Oblicz dzienną średnią i prognozę do końca miesiąca

## Obliczenia
- Wydano = suma $USD ze wszystkich komentarzy /koszt-sesji z bieżącego miesiąca
- Dzienna średnia = wydano / liczba dni od początku miesiąca
- Prognoza = dzienna średnia * liczba dni w miesiącu
- Limit domyślny = $20/miesiąc (o ile użytkownik nie ustawił innego)

## Format output (max 7 linii)

```
BUDŻET MIESIĘCZNY [miesiąc YYYY]:
Limit:     $X.XX (domyślny $20 lub ustawiony)
Wydano:    $X.XX (XX% budżetu, dzień [N] z [N])
Dziennie:  $X.XX średnia | prognoza: $X.XX do końca miesiąca
Status:    [NA PLANIE / UWAGA: zbliżasz się do limitu / KRYTYCZNE: przekroczysz limit]
Sesje:     [N] sesji | [N] tasków z danymi
```

Pisz po polsku. Jeśli brak danych dla bieżącego miesiąca — napisz to wprost.
