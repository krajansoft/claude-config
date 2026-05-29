---
description: Uczy się na podstawie różnicy między estymacją a rzeczywistym kosztem i zapisuje wnioski do po-knowledge.md. Wywołuj po każdym /podsumuj-sesje lub gdy pytasz "zapisz wnioski", "po-uczenie", "zaktualizuj wiedzę PO".
---

> ZASADA: Odpowiadaj zwięźle. Max 3 zdania wyjaśnienia.

## Twoje zadanie

Wykonaj w tej kolejności:

1. Pobierz wszystkie taski z sekcji Zrobione (6gj92pRv86Mh4Rvq) które były modyfikowane w tej sesji
2. Dla każdego taska:
   a. Przeczytaj opis taska — znajdź linię `💡 ESTYMATA: $min—$max`. Estymata = środek przedziału ((min+max)/2).
      Jeśli brak linii `💡 ESTYMATA:` — pomiń task (nie da się policzyć błędu).
   b. Pobierz komentarze taska z Todoist
   c. Znajdź komentarze zaczynające się od "💰 Koszt sesji" — realny koszt = suma wszystkich sesji
   d. Oblicz błąd estymacji: `błąd = abs(real - est) / est * 100`
3. Przeczytaj C:\Users\adamk\.claude\agents\po\po-knowledge.md
4. Dopisz nowe wpisy na końcu sekcji "## Historia estymacji"
5. Jeśli błąd > 25% — zaktualizuj sekcję "## Współczynniki korekcyjne"
6. Zaktualizuj pamięć projektu — patrz sekcja "## Zapis wzorców do project-memory.md" niżej

## Format wpisu w po-knowledge.md (parsowany przez analytics.html)

```
[YYYY-MM-DD] | [nazwa taska] | est: $X.XX | real: $X.XX | błąd: XX% | kategoria: [kategoria]
Przyczyna: [1 zdanie — dlaczego była różnica]
Korekta: [np. "dla tasków UI mnóż estymację x1.5"]
```

`kategoria` MUSI być jedną z (parser pie chart na nich polega):
`Długa sesja` | `Nieznana technologia` | `Iteracje bugów` | `Złe wymagania` | `Inne`

## Kiedy aktualizować współczynniki
- Jeśli ten sam typ taska był stale niedoszacowany (>3 wpisy z błędem >25%) — dodaj/zaktualizuj współczynnik korekcyjny
- Jeśli estymacja była trafna (błąd <10%) — zanotuj "typ [X] — estymacja OK"

## Zapis wzorców do project-memory.md
Po zaktualizowaniu po-knowledge.md przeczytaj C:\Users\adamk\.claude\agents\po\project-memory.md
i dla każdego policzonego taska:

1. **Sklasyfikuj typ** wg sekcji "Taksonomia typów tasków" w project-memory.md (jedna etykieta).
2. **Współczynnik korekcyjny** — jeśli ten sam typ ma teraz ≥2 taski z błędem >25% w TĘ SAMĄ stronę
   (oba przeszacowane → ×<1, oba niedoszacowane → ×>1):
   - policz średni błąd tych tasków, ustal współczynnik (np. śr. przeszacowanie 46% → ×0.65 ≈ 1−0.35; nie tnij poniżej rzeczywistej średniej)
   - dodaj/zaktualizuj linię w sekcji "## Współczynniki korekcyjne per typ taska" w formacie:
     `typ: ×N.NN | podstawa: [N tasków, śr. błąd XX%] | [uzasadnienie]`
   - jeśli tylko 1 punkt danych — NIE dodawaj współczynnika, tylko wpis we "Wzorce kosztów".
3. **Wzorzec kosztów** — dopisz do "## Wzorce kosztów": `[YYYY-MM-DD] | [typ] | wzorzec: [opis 1 zdanie]`
4. **Wzorzec czasowy** — jeśli błąd koreluje z godziną sesji (z komentarza 💰 Koszt sesji), dopisz do "## Wzorce czasowe".
5. **Wniosek** — jeśli błąd wynikał z nieznanej technologii lub złych wymagań, dopisz 1 linię do "## Wnioski o projekcie".

Nie modyfikuj nagłówków/komentarzy (#) ani taksonomii. Tylko dodawaj/aktualizuj wpisy danych.

Pisz po polsku. Nie modyfikuj istniejących wpisów w po-knowledge.md — tylko dodawaj nowe.
