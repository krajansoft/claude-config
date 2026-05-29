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
2026-05-29 | skill-md | wzorzec: zakres trafny, koszt napędził model — est $0.40→real $1.10 przez Opus zamiast Sonnet (1 punkt, brak współczynnika typu)
2026-05-30 | skill-md | wzorzec: baseline ~$1.0–1.2 na Opus za 2-3 edycje skilli + nowy skill + test (3 punkty: $1.10, $1.15, $1.15). Estymata wg modelu wykonania = trafna (błąd 5%, 5%, 4.5%) — SOLIDNA BAZA
2026-05-29 | UI/JS-duże | wzorzec: duży plik (3233 linie) na Opus → bardzo drogi input; est $0.53→real $2.10 (1 punkt, koszt zdominowany przez model nie typ)
2026-05-30 | UI/JS-przebudowa | wzorzec: refaktor istniejącej sekcji (renderBugs→helpery + loadData + HTML) na Opus ≈ $1.3-1.4; refaktor psuje testy zależne od starej struktury — DOLICZ bufor na ich naprawę (est $1.15→real $1.36, błąd 18%)

## Wzorce czasowe
# Format: `[data] | [okno czasowe] | [wpływ na błąd estymy]`
# Brak danych — wymaga ≥3 sesji z odnotowaną godziną startu. /po-uczenie dopisze gdy pojawi się korelacja.

## Wnioski o projekcie
# Format: `[data] | [wniosek jednozdaniowy]`
2026-05-29 | Background agenci nie mają dostępu do narzędzi w tym setupie — równoległość realizuj przez git worktree + pracę sekwencyjną głównym agentem
2026-05-29 | Przed estymatą "szlifu wizualnego" sprawdź co już działa w pliku — stary opis często opisuje rzeczy gotowe
2026-05-29 | Na Windows git autocrlf zamienia LF→CRLF — regexy frontmatter w testach muszą używać `^---\r?\n`
2026-05-29 | Dominantą kosztu bywa wybór modelu, nie złożoność — Opus 4.8 ≈ ×4-5 vs Sonnet; dopasuj model do estymaty albo estymuj wg modelu wykonania
2026-05-30 | Lekcja o modelu zadziałała: estymata robiona od razu wg modelu wykonania (Opus) dała błąd 5% (vs 175-300% gdy estymowano dla Sonnet a robiono na Opus)
2026-05-30 | Wzorzec potwierdzony 3× z rzędu: estymata wg modelu wykonania → błąd <10% (skill-md 5%, UI/JS-małe deep-linking 1%). To NAJWAŻNIEJSZA dźwignia trafności estymat w tym projekcie.
