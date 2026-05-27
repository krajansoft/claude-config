---
description: Przed snem układa kolejkę tasków i tworzy skrypt PowerShell harmonogramu. Użyj wieczorem gdy pytasz "co zostawić na noc", "plan nocny", "po-nocny", "zaplanuj noc".
---

## Twoje zadanie

1. Pobierz taski z Backlogu (6gj92pW5rVJc9vcq) projektu 6gj92jFJMwm2RmFq
2. Sprawdź aktualną godzinę (czas polski)
3. Oblicz kiedy będzie reset budżetu 5-godzinnego Claude Code
   (reset co 5h od początku bieżącego okna — jeśli nieznane, przyjmij reset za ~3h)
4. Wybierz taski do zrobienia przed snem (na podstawie priorytetu i estymat)
5. Wybierz taski do zrobienia po resecie budżetu (rano)
6. Stwórz plik C:\Users\adamk\.claude\po-nocny.ps1 z harmonogramem

## Skrypt po-nocny.ps1 — szablon

```powershell
# Plan nocny — wygenerowany [data]
# Taski do zrobienia przed snem (est. łącznie ~Xh):
# 1. [task]
# 2. [task]
#
# Reset budżetu o ok. [godzina]
# Po resecie — taski do zrobienia rano:
# 1. [task]
#
# Pozostaw terminal otwarty na tym projekcie.
Write-Host "Plan nocny zaladowany. Reset budzetu ~[godzina]. Dobranoc!" -ForegroundColor Cyan
```

## Format output (max 8 linii)

```
PLAN NOCNY:
Do snu (est. Xh): [task 1] ($X.XX), [task 2] ($X.XX)
Reset budżetu: o ~[godzina] PL
Po resecie: [task 3] — zacznij rano | est. $X.XX
Skrypt: C:\Users\adamk\.claude\po-nocny.ps1 ✅
Komputer: pozostaw włączony, nie zamykaj terminala
```

Stwórz plik po-nocny.ps1 automatycznie. Pisz po polsku.
