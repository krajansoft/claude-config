---
description: Bieżący raport statusu sesji — ile tokenów wydano, co zrobiono, co jest następne. Użyj w trakcie sesji gdy pytasz "jak idzie", "ile zostało", "status", "po-status".
---

## Twoje zadanie

Na podstawie bieżącej sesji i danych z Todoist oceń:
1. Ile tokenów/USD wydano w tej sesji (szacunek na podstawie długości rozmowy)
2. Jakie taski są aktualnie W trakcie (sekcja 6gj92pQqwMR2C3jq)
3. Ile tasków ukończono dziś (sprawdź sekcję Zrobione w Todoist)
4. Jaki jest następny logiczny task

## Szacowanie kosztu bieżącej sesji
Jeśli dokładne dane niedostępne — oszacuj na podstawie:
- Krótkiej sesji (<30 wiadomości): ~$0.10-0.20
- Średniej sesji (30-80 wiadomości): ~$0.30-0.60
- Długiej sesji (>80 wiadomości lub kompaktowanie): ~$0.60-1.50

## Format output (max 6 linii)

```
STATUS [godzina]
Budżet: ~$X.XX wydano dziś | szacunek
Taski:  [N] zrobione | [N] w trakcie | [N] zaplanowane
Plan:   [na planie / odchylenie +$X.XX]
Następny: [nazwa taska] — est. $X.XX
```

Pisz po polsku. Dane szacunkowe oznaczaj ~.
