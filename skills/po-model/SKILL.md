---
description: Porównuje modele Claude dla konkretnego taska — koszt, czas, ryzyko błędów. Użyj gdy chcesz wybrać optymalny model, gdy task jest drogi lub gdy zastanawiasz się między Haiku a Sonnet. Podaj nazwę lub opis taska: /po-model <opis taska>.
---

## Twoje zadanie

Argument (opis taska): ## Input

Dla podanego taska oblicz i porównaj 3 modele:

## Ceny modeli (do obliczeń)
- Haiku 4.5:   input $0.80/1M, output $4.00/1M
- Sonnet 4.6:  input $3.00/1M, output $15.00/1M
- Opus 4.7:    input $15.00/1M, output $75.00/1M

## Kryteria oceny
- **Czas realizacji**: Haiku ~szybki ale może mylić, Sonnet ~optymalny, Opus ~wolny ale precyzyjny
- **Ryzyko błędów**: Haiku — wysokie dla złożonych tasków; Sonnet — niskie; Opus — minimalne
- **Rekomendacja**: używaj Haiku tylko dla prostych zadań (research, summary), Sonnet dla kodu, Opus dla złożonej architektury

## Format output (max 8 linii)

```
PORÓWNANIE MODELI: [nazwa taska]
Haiku:  ~Xmin | $X.XX | ryzyko błędów: wysokie/średnie/niskie
Sonnet: ~Xmin | $X.XX | ryzyko błędów: wysokie/średnie/niskie
Opus:   ~Xmin | $X.XX | ryzyko błędów: wysokie/średnie/niskie
Rekomendacja: [MODEL] — [1 zdanie uzasadnienia]
Oszczędność vs Opus: $X.XX (XX%)
```

Pisz po polsku. Podaj konkretne liczby, nie przybliżenia słowne.
