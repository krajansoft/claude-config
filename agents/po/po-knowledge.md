# PO Knowledge Base
# Agent PO uczy się na podstawie historii tasków.
# Nie edytuj ręcznie — aktualizowany przez /po-uczenie i /po-retro.

## Historia estymacji
[tu będą trafiać wpisy automatycznie]

## Współczynniki korekcyjne
[tu agent zapisuje czego się nauczył]

## Historia błędów

### 2026-05-27 — BUG: git-commit zapisuje placeholder zamiast message
Źródło: SKILL | Klasyfikacja: 🟡 POWAŻNY
Przyczyna: prefiks `!` w Krok 6 SKILL.md wykonuje komendę dosłownie przy ładowaniu skilla
Naprawa: usunięto `!`, zastąpiono instrukcją Bash tool z HEREDOC
Estymata: ~15k | Rzeczywisty koszt: ~3k — **estymata 5x zawyżona**
Wniosek: `!` tylko do poleceń kontekstowych (status, branch) — NIE do kroków z dynamicznym inputem
