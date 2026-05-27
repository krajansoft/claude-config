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
!`cd C:\Users\adamk\.claude && git branch --show-current`
!`cd C:\Users\adamk\.claude && gh pr view --json url,title,state --jq '"PR: \(.title) | \(.state) | \(.url)"' 2>$null || echo "Brak aktywnego PR"`
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

### Krok 1 — Zamknij aktywne zadania
Znajdź wszystkie zadania w sekcji "W trakcie" i przenieś je do sekcji "Zrobione".
Dodaj do każdego komentarz z punktu 1 podsumowania (co zostało zrobione).

### Krok 2 — Zgłoś bugi
Jeśli w punkcie 3 podsumowania (Uwagi) znalazłeś potencjalne błędy lub ryzyko —
stwórz dla każdego osobne zadanie w sekcji "Bugi" z priorytetem p2.
Nazwa zadania: "BUG: [krótki opis]"
Opis zadania: szczegółowy opis z punktu Uwagi.

### Krok 3 — Zaplanuj następną sesję
Na podstawie punktu 4 podsumowania (Co dalej) — stwórz zadania w sekcji "Backlog".
Każda sugestia = osobne zadanie z priorytetem p3.
Nazwa zadania powinna być konkretna i zaczynać się od czasownika, np. "Dodaj obsługę błędów w module X".

## Łączny koszt taska

Po wykonaniu kroków 1-3 — pobierz WSZYSTKIE komentarze aktywnego taska
(przed przeniesieniem do Zrobione) i znajdź te zaczynające się od "💰 Koszt sesji".
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