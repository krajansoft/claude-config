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

2026-05-29 | Pamięć kontekstu projektu (project-memory.md) | est: $0.40 | real: $1.10 | błąd: 175% | kategoria: Inne
Przyczyna: Zakres trafny, ale estymata zakładała Sonnet 4.6 a wykonanie poszło na Opus 4.8 (~5× droższy I/O). Koszt szacunkowy (brak telemetrii CLI).
Korekta: jeśli sesja idzie na Opus — mnóż estymatę Sonnet ×~4-5; estymuj wg modelu wykonania, nie domyślnego.

2026-05-29 | Velocity projektu (sekcja analytics.html) | est: $0.53 | real: $2.10 | błąd: 300% | kategoria: Inne
Przyczyna: Jw. (Opus zamiast Sonnet) + czytanie dużego pliku 3233 linii podbiło input. Koszt szacunkowy.
Korekta: duże pliki na Opus = bardzo drogi input — czytaj selektywnie (Grep/offset) albo edytuj na Sonnet.

2026-05-30 | Predykcja problemów (3 skille PO + test) | est: $1.10 | real: $1.15 | błąd: 5% | kategoria: Inne
Przyczyna: TRAFNA — pierwsza estymata zrobiona od razu wg modelu wykonania (Opus), nie domyślnego Sonnet. Lekcja o modelu zadziałała.
Korekta: typ skill-md na Opus — estymacja OK (~$1.1 za 2-3 edycje skilli + nowy skill + test). Trzymaj tę bazę.

2026-05-30 | Deep linking błędów (analytics.html) | est: $0.70 | real: $0.71 | błąd: 1% | kategoria: Inne
Przyczyna: TRAFNA — UI/JS-małe (link+CSS+tooltip+test) estymowane od razu dla Opus. 3. trafna estymata z rzędu odkąd estymujemy wg modelu.
Korekta: UI/JS-małe na Opus ≈ $0.6-0.8. Wzorzec potwierdzony: estymata wg modelu wykonania = błąd <10%.

2026-05-30 | Powiadomienia Todoist (/po-alert-check + 2 integracje + test) | est: $1.10 | real: $1.15 | błąd: 5% | kategoria: Inne
Przyczyna: TRAFNA — skill-md na Opus, 4. trafna z rzędu. Estymacja wg modelu wykonania = stabilnie <10%.
Korekta: skill-md na Opus baseline ~$1.1-1.15 (nowy skill + 2 edycje + test) — potwierdzony 3 punktami (Pamięć, Predykcja, Powiadomienia).

## Współczynniki korekcyjne

### Wybór modelu: Sonnet 4.6 vs Opus 4.8 (NAJWAŻNIEJSZE)
Estymaty bazowe zakładają Sonnet. Wykonanie na Opus 4.8 ≈ **×4-5 koszt** (input i output ~5× droższe).
Obserwacja (2 taski, 2026-05-29): est $0.40→real $1.10, est $0.53→real $2.10 — oba przez przełączenie na Opus, nie przez zakres.
Wniosek: dopasuj model do estymaty LUB estymuj wg modelu wykonania. Dla tasków rutynowych trzymaj się Sonnet.

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
