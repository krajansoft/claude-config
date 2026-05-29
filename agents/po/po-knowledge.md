# PO Knowledge Base
# Agent PO uczy się na podstawie historii tasków.
# Nie edytuj ręcznie — aktualizowany przez /po-uczenie i /po-retro.

## Historia estymacji

2026-05-29 | Sortowanie tabeli analytics (klikalne nagłówki) | est: $0.30 | real: $0.18 | błąd: 40% | kategoria: Inne
Przyczyna: Prosta zmiana CSS/JS w istniejącym pliku — mniej iteracji niż zakładano, brak trudnych edge-case'ów.
Korekta: dla małych UI/JS tasków w istniejącym pliku (1-2 funkcje) mnóż estymację ×0.6

2026-05-29 | Etap 4 — szlif wizualny kanban | est: $0.43 | real: $0.21 | błąd: 51% | kategoria: Inne
Przyczyna: Większość ficzerów była już zaimplementowana (liczniki, responsive grid) — faktyczny zakres był 4× mniejszy.
Korekta: przed estymatą sprawdź co już istnieje w pliku — „szlif wizualny" bywa 60% tańszy gdy baza jest dobra

## Współczynniki korekcyjne

### Małe UI/JS zmiany w istniejącym pliku (1-3 funkcje, Sonnet 4.6)
Współczynnik: **×0.65** (tj. estymuj 35% taniej niż intuicja)
Obserwacja (2 taski): przeszacowanie śr. 46% — PO zakłada więcej iteracji i edge-case'ów niż jest w praktyce.
Przykłady: sortowanie tabeli ($0.30→$0.18), szlif CSS/animacje ($0.43→$0.21).

### Taski typu "szlif wizualny / polish" 
Przed estymatą sprawdź aktualny stan pliku — jeśli baza istnieje, odetnij 40-60% kosztu.
Pułapka: stary opis zadania ("dodaj liczniki") może opisywać rzeczy już gotowe.

## Historia błędów

### 2026-05-27 — BUG: git-commit zapisuje placeholder zamiast message
Źródło: SKILL | Klasyfikacja: 🟡 POWAŻNY
Przyczyna: prefiks `!` w Krok 6 SKILL.md wykonuje komendę dosłownie przy ładowaniu skilla
Naprawa: usunięto `!`, zastąpiono instrukcją Bash tool z HEREDOC
Estymata: ~15k | Rzeczywisty koszt: ~3k — **estymata 5x zawyżona**
Wniosek: `!` tylko do poleceń kontekstowych (status, branch) — NIE do kroków z dynamicznym inputem
