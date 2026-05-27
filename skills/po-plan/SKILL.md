---
description: Główna komenda startowa sesji PO. Pobiera taski z Todoist, sprawdza budżet, szacuje koszty P1 i układa plan sesji. Użyj na początku każdej sesji kodowania lub gdy pytasz "co robić dziś", "zaplanuj sesję", "po-plan".
---

## KROK 0 — Weryfikacja aktywnego taska (WYKONAJ PIERWSZY)

Przed wygenerowaniem planu sprawdź czy sesja ma kontekst kosztowy:

1. Sprawdź przez Todoist MCP sekcję 'W trakcie' (ID: 6gj92pQqwMR2C3jq)
2. Jeśli TAK (jest task) — kontynuuj normalnie do "Twoje zadanie" poniżej
3. Jeśli NIE — zatrzymaj się:
   a. Pobierz taski P1 i P2 z Backlogu (ID: 6gj92pW5rVJc9vcq)
   b. Wyświetl listę numerowaną: numer, nazwa taska, priorytet
   c. Zapytaj użytkownika: "Który task zaczynamy? (podaj numer lub ID)"
   d. Poczekaj na odpowiedź użytkownika
   e. Przenieś wskazany task do sekcji 'W trakcie' przez MCP (sectionId: 6gj92pQqwMR2C3jq)
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

## Format output (max 10 linii)

```
════════════════════════════════════
PLAN SESJI — [data] [godzina] [szczyt/poza szczytem]
Budżet:  ~$5.00 dostępne szacunkowo
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
