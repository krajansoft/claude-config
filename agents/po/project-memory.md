# Pamięć projektu: claude-config
# Aktualizowana automatycznie przez /po-uczenie i /po-retro
# Nie edytuj ręcznie — to baza wzorców specyficznych dla TEGO projektu.
#
# Różnica względem po-knowledge.md:
#   po-knowledge.md  = surowa historia pojedynczych estymat (wpis per task)
#   project-memory.md = wydestylowane WZORCE i współczynniki (wniosek z wielu tasków)

## Taksonomia typów tasków
# Wspólny słownik dla /po-estymuj, /po-uczenie i /po-plan.
# Klasyfikuj task po jego dominującej naturze (jedna etykieta).
#
# UI/JS-małe   — zmiany w istniejącym pliku HTML/JS, 1-3 funkcje, bez nowego layoutu
# UI/JS-duże   — nowa sekcja dashboardu, canvas, wiele funkcji/wykresów
# hook-PS      — skrypty PowerShell w hooks/ (też naprawy bugów w hookach)
# skill-md     — tworzenie/edycja skilli i agentów (markdown + frontmatter)
# dokumentacja — README, CHANGELOG, GETTING-STARTED, opisy
# optymalizacja— refactor/skracanie istniejącego kodu lub skilla
# inne         — nie pasuje do powyższych

## Współczynniki korekcyjne per typ taska
# Format (parsowany): `typ: ×N.NN | podstawa: [N tasków, śr. błąd XX%] | [krótkie uzasadnienie]`
# REGUŁA: współczynnik dodawaj dopiero gdy ≥2 taski tego typu miały błąd >25% w tę samą stronę.
# ×<1 = PO przeszacowuje (tnij). ×>1 = PO niedoszacowuje (dolicz bufor).
UI/JS-małe: ×0.65 | podstawa: 2 taski, śr. błąd 46% | PO zakłada więcej iteracji i edge-case'ów niż jest w istniejącym, działającym pliku

## Wzorce kosztów
# Format: `[data] | [typ] | wzorzec: [opis]`
2026-05-29 | UI/JS-małe | wzorzec: systematyczne przeszacowanie ~46% (sortowanie tabeli 40%, szlif kanban 51%) — baza już istniała, faktyczny zakres mniejszy
2026-05-27 | hook-PS | wzorzec: naprawa pojedynczego buga w hooku przeszacowana ~5× (est ~15k, real ~3k tokenów) — 1 punkt danych, za mało na współczynnik

## Wzorce czasowe
# Format: `[data] | [okno czasowe] | [wpływ na błąd estymy]`
# Brak danych — wymaga ≥3 sesji z odnotowaną godziną startu. /po-uczenie dopisze gdy pojawi się korelacja.

## Wnioski o projekcie
# Format: `[data] | [wniosek jednozdaniowy]`
2026-05-29 | Background agenci nie mają dostępu do narzędzi w tym setupie — równoległość realizuj przez git worktree + pracę sekwencyjną głównym agentem
2026-05-29 | Przed estymatą "szlifu wizualnego" sprawdź co już działa w pliku — stary opis często opisuje rzeczy gotowe
2026-05-29 | Na Windows git autocrlf zamienia LF→CRLF — regexy frontmatter w testach muszą używać `^---\r?\n`
