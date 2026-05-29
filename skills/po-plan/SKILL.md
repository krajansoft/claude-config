---
description: Główna komenda startowa sesji PO. Pobiera taski z Todoist, sprawdza budżet, szacuje koszty P1 i układa plan sesji. Użyj na początku każdej sesji kodowania lub gdy pytasz "co robić dziś", "zaplanuj sesję", "po-plan".
---

> ZASADA: Odpowiadaj zwięźle. Max 3 zdania wyjaśnienia.

## KROK 0 — Weryfikacja aktywnego taska (WYKONAJ PIERWSZY)

Przed wygenerowaniem planu sprawdź czy sesja ma kontekst kosztowy:

1. Sprawdź przez Todoist MCP sekcję 'W trakcie' (ID: 6gj92pQqwMR2C3jq)
2. Jeśli TAK (jest task) — kontynuuj normalnie do "Twoje zadanie" poniżej
3. Jeśli NIE — zatrzymaj się:
   a. Pobierz taski P1 i P2 z Backlogu (ID: 6gj92pW5rVJc9vcq)
   b. Wyświetl listę numerowaną: numer, nazwa taska, priorytet
   c. Zapytaj użytkownika: "Który task zaczynamy? (podaj numer lub ID)"
   d. Poczekaj na odpowiedź użytkownika
   d2. **Definition of Ready check** — wywołaj `/sprawdz-wymagania [ID wybranego taska]` i wyświetl wynik.
       - Jeśli wynik `✅ GOTOWY DO STARTU` — kontynuuj do e.
       - Jeśli wynik `⚠️ NIEGOTOWY` (1-2 braki) — pokaż braki i zapytaj "Uzupełnić teraz czy startować mimo to? (uzupełnić/start)". Czekaj na odpowiedź.
       - Jeśli wynik `🔴 NIEGOTOWY — KRYTYCZNE braki` (3+ braków) — zatrzymaj się: "Task wymaga uzupełnienia opisu zanim startujemy. Sugerowane akcje: [lista z /sprawdz-wymagania]". Nie przenoś taska.
   e. Przenieś wskazany task do sekcji 'W trakcie' przez MCP (sectionId: 6gj92pQqwMR2C3jq)
   e2. **Wymuszenie estymaty** — sprawdź czy opis taska ma linię zaczynającą się od `💡 ESTYMATA:`.
       - Jeśli JEST — kontynuuj do f.
       - Jeśli NIE MA — automatycznie wywołaj `/po-estymuj [ID]`, a następnie dopisz wynik do opisu taska w Todoist w formacie:
         `💡 ESTYMATA: $[min]—$[max] (pewność: [XX]%) | [YYYY-MM-DD]`
         (dokładnie ten format — parser analytics.html go szuka). Potem kontynuuj do f.
   f. Utwórz branch dla taska w repo claude-config (użyj Bash tool):
      Format: task/[pierwsze-8-znaków-ID]-[slug-nazwy-max-30]
      Slug: tytuł lowercase, spacje i znaki specjalne → myślniki
      Przykład ID 6gjGGWxHJfWrMCFq → task/6gjGGWxH-workflow-git-branch-pr
      Uruchom: git -C "C:\Users\adamk\.claude" checkout master
      Uruchom: git -C "C:\Users\adamk\.claude" checkout -b task/[ID8]-[slug]
      Jeśli branch istnieje: git -C "C:\Users\adamk\.claude" checkout task/[ID8]-[slug]
      Wyświetl: "🌿 Branch: task/[ID8]-[slug]"
   g. Dodaj komentarz do taska przez MCP: "🌿 Branch: task/[ID8]-[slug]"
   h. Kontynuuj do generowania planu

---

## Twoje zadanie

Wykonaj w tej kolejności:

1. Pobierz taski z Todoist — sekcje Backlog (6gj92pW5rVJc9vcq), W trakcie (6gj92pQqwMR2C3jq) i **Bugi (6gj92pQjFpC8gfrH)**, projekt 6gj92jFJMwm2RmFq
2. Sprawdź KRYTYCZNE bugi (P1) w sekcji Bugi — jeśli są, umieść je NA POCZĄTKU listy tasków oznaczone jako 🔴 KRYTYCZNY BUG
3. Sprawdź aktualną godzinę — czy jesteśmy w szczycie (14:00–20:00 PL)?
4. Dla każdego taska P1 oszacuj koszt na podstawie opisu (heurystyki z po-knowledge.md)
5. Ułóż plan sesji który mieści się w ~$5 (typowy budżet 5-godzinny)
6. Przeczytaj C:\Users\adamk\.claude\agents\po\po-knowledge.md przed estymacją
7. Przeczytaj C:\Users\adamk\.claude\agents\po\project-memory.md — wybierz 1-2 najważniejsze
   pozycje (współczynnik korekcyjny pasujący do dzisiejszych tasków LUB świeży wniosek)
   i pokaż je w linii `🧬 Pamięć:` w output

## Format output (max 10 linii)

```
════════════════════════════════════
PLAN SESJI — [data] [godzina] [szczyt/poza szczytem]
Budżet:  ~$5.00 dostępne szacunkowo
🧬 Pamięć: [1-2 wnioski/współczynniki z project-memory.md — pomiń linię jeśli plik pusty]
Zadania: [N] P1 | [N] P2 | [N] P3[jeśli bugi > 0: | Bugi: [N]🔴 [N]🟡 [N]🟢]

[tylko jeśli są P1 bugi w sekcji Bugi:]
0. 🔴 KRYTYCZNY BUG: [nazwa] — est. $X.XX — sonnet
1. [nazwa taska] — est. $X.XX — [model: haiku/sonnet/opus]
2. [nazwa taska] — est. $X.XX — [model]

Łącznie: ~$X.XX | Ryzyko budżetu: [niskie/średnie/wysokie]
Uwaga: [1 zdanie jeśli coś wymaga uwagi]
════════════════════════════════════
```

Odpowiadaj wyłącznie w tym formacie. Pisz po polsku.
