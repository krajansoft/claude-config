---
description: Uruchamia pełną suite regresji — smoke testy + testy per task. Wywołuj przed każdym PR lub gdy pytasz "uruchom testy", "regresja", "czy testy przechodzą". Zwraca GOTOWE DO MERGE lub BLOKUJĄCE.
---

> ZASADA: Odpowiadaj zwięźle. Max 3 zdania wyjaśnienia.

Uruchom suite przez Bash tool:
`node "C:\Users\adamk\.claude\tests\regression\suite.js"`

Jeśli wynik zawiera "GOTOWE DO MERGE" — wyświetl wynik i kontynuuj.
Jeśli wynik zawiera "BLOKUJĄCE" — wyświetl wynik i zatrzymaj się. Nie twórz PR.
