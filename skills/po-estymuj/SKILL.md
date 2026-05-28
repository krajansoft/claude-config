---
description: Szacuje koszt taska przed realizacją. Użyj gdy chcesz wiedzieć ile będzie kosztował task, jakie tokeny zużyje, jaki model wybrać. Podaj nazwę taska lub ID jako argument: /po-estymuj <nazwa lub ID>.
---

> ZASADA: Odpowiadaj zwięźle. Max 3 zdania wyjaśnienia.

## Twoje zadanie

Argument (jeśli podany): ## Input

Wykonaj w tej kolejności:
1. Jeśli podano ID taska — pobierz jego pełny opis z Todoist przez MCP
2. Przeczytaj C:\Users\adamk\.claude\agents\po\po-knowledge.md — szukaj podobnych historycznych tasków
3. Oszacuj tokeny dla każdego typu:
   - Input: rozmiar kontekstu (pliki do przeczytania) + instrukcje + historia sesji
   - Output: kod/raporty do wygenerowania
   - Cache: czy sesja będzie wznawiać kontekst?
4. Wybierz optymalny model na podstawie złożoności
5. Podaj przedział $min-$max z poziomem pewności

## Heurystyki estymacji
- Prosty task (1 plik, jasna specyfikacja): input ~20k, output ~3k → ~$0.10
- Średni task (2-4 pliki, nowa funkcja):    input ~60k, output ~8k → ~$0.30
- Duży task (wiele plików, analiza):        input ~150k, output ~15k → ~$0.68
- Sesja z kompaktowanym kontekstem:         input ~200k, output ~5k → ~$0.68

## Ceny modeli
- Haiku 4.5:   input $0.80/1M, output $4.00/1M
- Sonnet 4.6:  input $3.00/1M, output $15.00/1M
- Opus 4.7:    input $15.00/1M, output $75.00/1M

## Format output (max 8 linii)

```
ESTYMATA: [nazwa taska]
Model:    [rekomendowany] | alternatywa: [model]
Input:    ~Xk tokenów ($X.XX)
Output:   ~Xk tokenów ($X.XX)
Cache:    ~Xk tokenów ($X.XX)
Łącznie:  $X.XX — $X.XX | Pewność: XX%
Ryzyko:   [1 zdanie — co może podwyższyć koszt]
Baza:     [N] podobnych tasków w historii
```

Pisz po polsku. Nie pytaj o potwierdzenie.
