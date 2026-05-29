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

Pisz po polsku. Nie modyfikuj istniejących wpisów — tylko dodawaj nowe.
