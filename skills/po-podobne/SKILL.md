---
description: Znajduje w historii taski najbardziej podobne do opisanego i pokazuje ich estymatę vs realny koszt oraz co poszło nie tak. Użyj gdy pytasz "czy robiliśmy coś podobnego", "po-podobne <opis>", przed estymatą nowego taska. Podaj opis lub nazwę: /po-podobne <opis>.
---

> ZASADA: Odpowiadaj zwięźle. Max 3 zdania wyjaśnienia.

## Twoje zadanie

Argument (opis/nazwa szukanego taska): ## Input

1. Przeczytaj C:\Users\adamk\.claude\agents\po\po-knowledge.md (sekcja "Historia estymacji")
   oraz C:\Users\adamk\.claude\agents\po\project-memory.md (taksonomia typów + wzorce kosztów).
2. Sklasyfikuj szukany task wg taksonomii (project-memory.md) i wyłuskaj słowa kluczowe z argumentu.
3. Oceń podobieństwo każdego wpisu historii. Punktacja (im więcej, tym bardziej podobny):
   - ten sam TYP z taksonomii: +3
   - wspólne słowo kluczowe (nazwa/technologia, np. analytics, skill, hook, canvas, CSV): +1 każde
   - ta sama `kategoria` błędu: +1
4. Wybierz max 3 wpisy o najwyższym wyniku (pomiń wynik 0 — brak podobieństwa).

## Format output (max 10 linii)

```
PODOBNE TASKI: [szukany opis] — typ: [typ z taksonomii]
─────────────────────────────────────
1. [nazwa] | est $X → real $Y | błąd XX% | [kategoria]
   Co poszło nie tak: [Przyczyna z historii — 1 zdanie]
2. [nazwa] | est $X → real $Y | błąd XX% | [kategoria]
   Co poszło nie tak: [...]
3. [...]
─────────────────────────────────────
Wniosek: śr. błąd [N] podobnych = XX% | sugestia: [bufor/cięcie/model]
```

Jeśli BRAK podobnych (wszystkie wyniki 0) — wyświetl:
`Brak podobnych tasków w historii — estymuj ostrożnie, to nowy typ pracy.`

Pisz po polsku.
