---
description: Podsumowuje bieżącą sesję pracy. Użyj gdy chcesz wiedzieć co zrobiłeś, gdy kończysz pracę, gdy chcesz napisać wiadomość commit, lub gdy pytasz "co dzisiaj zrobiłem" / "co zrobiłem w tej sesji" / "podsumuj sesję".
---

> ZASADA: Odpowiadaj zwięźle. Max 3 zdania wyjaśnienia.

## Status projektu
!`git status --short`
## Co się zmieniło (lista plików)
!`git diff HEAD --stat`
## Ostatnie 5 commitów
!`git log --oneline -5`
## Branch i PR (claude-config)
!`git -C "C:\Users\adamk\.claude" branch --show-current`
!`git -C "C:\Users\adamk\.claude" log --oneline -1`
## Twoje zadanie
Na podstawie danych powyżej stwórz podsumowanie sesji:
1. **Co zostało zrobione** — 3-5 konkretnych punktów
2. **Zmienione pliki** — wymień najważniejsze z krótkim opisem co w nich zmieniono
3. **Uwagi** — czy widzisz coś niedokończonego, potencjalny błąd lub ryzyko?
4. **Co dalej** — 2-3 sugestie na następną sesję
5. **Propozycja commit message** — jeśli są zmiany, zaproponuj treść po angielsku w formacie: typ: opis
Pisz po polsku. Bądź konkretny, nie ogólnikowy.

## Aktualizacja Todoist przez MCP
Po wygenerowaniu podsumowania wykonaj automatycznie poniższe kroki przez Todoist MCP.
Nie pytaj o pozwolenie — zrób to bez pytania jako część podsumowania sesji.
ID projektu: 6gj92jFJMwm2RmFq
Sekcje:
- Backlog:    6gj92pW5rVJc9vcq
- W trakcie:  6gj92pQqwMR2C3jq
- Bugi:       6gj92pQjFpC8gfrH
- Zrobione:   6gj92pRv86Mh4Rvq

### Krok 0 — Zapisz koszt sesji (WYKONAJ PRZED PRZENIESIENIEM TASKA)
Znajdź aktywny task w sekcji "W trakcie" (6gj92pQqwMR2C3jq).
Pobierz jego komentarze i policz te zaczynające się od "💰 Koszt sesji".
Jeśli NIE MA żadnego komentarza kosztowego z DZISIEJSZEJ daty — dodaj go teraz.

⚠️ FORMAT OBOWIĄZKOWY — parser analytics.html (`parseCostComment`) czyta DOKŁADNIE te linie.
Nawet przy braku telemetrii podaj SZACUNKOWE liczby (z `~`), nie tekst — inaczej dashboard pokaże 0:

```
💰 Koszt sesji #[liczba+1] — [data RRRR-MM-DD]
Input: ~[in] | Output: ~[out]
Cache write: ~[cw] | Cache read: ~[cr]
Łącznie: ~[suma]
💵 Koszt: ~$[USD] (~[PLN] PLN)
🤖 Model: [pełne id, musi zawierać opus/sonnet/haiku]
📚 Skille: [/skill1, /skill2 lub: brak]
🤖 Agenci: [lista lub: brak]
```

Wartości: jeśli cache nieznane → 0; model MUSI zawierać opus/sonnet/haiku (parser dobiera cennik);
puste skille/agenci → wpisz dokładnie "brak". Koszt szacuj z zakresu sesji jeśli brak telemetrii.

Jeśli komentarz kosztowy z dzisiaj JUŻ ISTNIEJE — pomiń ten krok.
Jeśli sekcja W trakcie jest pusta — pomiń ten krok.

### Krok 1 — Zamknij aktywne zadania
Znajdź wszystkie zadania w sekcji "W trakcie" i przenieś je do sekcji "Zrobione".
Dodaj do każdego komentarz z punktu 1 podsumowania (co zostało zrobione).

### Krok 2 — Zgłoś bugi
Jeśli w punkcie 3 podsumowania (Uwagi) znalazłeś potencjalne błędy lub ryzyko —
stwórz dla każdego osobne zadanie w sekcji "Bugi" z priorytetem p1/p2/p3.
Nazwa zadania: "BUG: [krótki opis]"

Opis taska w formacie zgodnym z /zgłoś-bug:
```
Źródło: [SKILL/AGENT/HOOK/CONFIG/HUMAN — na podstawie kontekstu błędu]
Klasyfikacja: [🔴 KRYTYCZNY / 🟡 POWAŻNY / 🟢 DROBNY]
Estymata naprawy: [N]k tokenów (~$[X.XX] / ~[Y.YY] PLN)

Opis: [szczegółowy opis z punktu Uwagi]

Oczekiwane: [co powinno być]
Rzeczywiste: [co jest]
```

Estymaty orientacyjne:
- 🟢 DROBNY (prosta zmiana 1 pliku): ~5k tokenów → ~$0.10 (~0.40 PLN)
- 🟡 POWAŻNY (kilka plików, wymaga dochodzenia): ~20k tokenów → ~$0.40 (~1.60 PLN)
- 🔴 KRYTYCZNY (blokuje workflow, złożona naprawa): ~50k tokenów → ~$1.00 (~4.00 PLN)

### Krok 3 — Zaplanuj następną sesję
Na podstawie punktu 4 podsumowania (Co dalej) — stwórz zadania w sekcji "Backlog".
Każda sugestia = osobne zadanie z priorytetem p3.
Nazwa zadania powinna być konkretna i zaczynać się od czasownika, np. "Dodaj obsługę błędów w module X".

## Łączny koszt taska

Po wykonaniu kroków 1-3 — pobierz WSZYSTKIE komentarze taska (teraz już w sekcji Zrobione)
i znajdź te zaczynające się od "💰 Koszt sesji".
Zsumuj z nich łączne tokeny (input + output) i łączny koszt w USD i PLN.

Wyświetl podsumowanie w CLI:
════════════════════════════════════
📊 ŁĄCZNY KOSZT TASKA: [nazwa taska]
════════════════════════════════════
  Liczba sesji:    [X]
  Łączne tokeny:   [suma]
  Łączny koszt:    $[suma USD]  (~[suma PLN] PLN)
  Średnio/sesję:   $[średnia USD]
════════════════════════════════════

Następnie zaktualizuj opis taska w Todoist — dopisz na początku opisu:
📊 Łącznie: [X] sesji | [tokeny] tokenów | $[koszt] (~[PLN] PLN)
Jeśli linia ze statystyką już istnieje (zaczyna się od "📊 Łącznie:") — zastąp ją nową.

Nie pytaj o pozwolenie — wykonaj automatycznie.

## Automatyczne uczenie się

Po wykonaniu wszystkich kroków powyżej — dla każdego zamkniętego taska sprawdź czy ma OBIE rzeczy:
- linię `💡 ESTYMATA:` w opisie taska, ORAZ
- co najmniej jeden komentarz `💰 Koszt sesji #N`.

Jeśli OBIE istnieją — automatycznie wywołaj `/po-uczenie` (bez pytania o pozwolenie).
`/po-uczenie` porówna estymatę (środek przedziału z `💡 ESTYMATA: $min—$max`) z realnym kosztem
(suma `💰 Koszt sesji`) i dopisze wpis do `po-knowledge.md`.

Jeśli brakuje którejkolwiek — pomiń uczenie i odnotuj 1 linią dlaczego (np. "brak estymaty — task sprzed wymuszenia").