# Changelog frameworku

Wszystkie istotne zmiany frameworku Claude Code są dokumentowane w tym pliku.

Format oparty na [Keep a Changelog](https://keepachangelog.com/pl/1.1.0/),
wersjonowanie zgodne z [SemVer](https://semver.org/lang/pl/):

- **X (major)** — przełomowa zmiana w architekturze (niekompatybilna wstecz)
- **Y (minor)** — nowy skill lub agent (kompatybilna wstecz)
- **Z (patch)** — poprawka istniejącego skilla/hooka/agenta

Wpisy poniżej `[Unreleased]` są dodawane automatycznie przez `/framework-bump`.

## [Unreleased]

## [1.1.0] — 2026-05-29

### Dodano

- Agent `orkiestrator` (`agents/orkiestrator/AGENT.md`) — koordynacja subagentów w jednej sesji (4 fazy), protokół `agent-state.json` z polem `lock` pod Model 3
- Skill `/orkiestrator-start` — uruchamia orkiestratora dla aktywnego taska
- Sekcja „Jak uczy się PO" w `analytics.html` (repo moj-dashboard) — wykres błędu estymat z trendem, grouped bar estymata vs realne, tabela z filtrem/sortowaniem, donut wzorców błędów, timeline per tydzień

### Zmieniono

- `/po-plan` wymusza `💡 ESTYMATA` w KROK 0 (wywołuje `/po-estymuj` gdy brak)
- `/po-estymuj` zapisuje estymatę w kanonicznym formacie `$min—$max (pewność: X%) | YYYY-MM-DD`
- `/podsumuj-sesje` automatycznie wywołuje `/po-uczenie` gdy task ma estymatę i koszt
- `/po-uczenie` zapisuje kategorię błędu (5 kategorii) parsowalną przez analytics
- `/po-rownolegle` dobiera tryb pracy (bez orkiestratora / orkiestrator / równoległe terminale)

### Naprawiono

- Regresja: regex frontmattera `^---\n` → `^---\r?\n` (CRLF na Windows powodował czerwony master)

## [1.0.0] — 2026-05-29

### Dodano

- Kompletny zestaw skilli workflow (`/po-plan`, `/po-pr`, `/git-commit`, `/koszt-sesji`, `/podsumuj-sesje` i in.)
- Agent PO z zestawem skilli planowania, estymacji, ryzyka i retrospektywy
- Agenci pomocniczy: `kod-reviewer`, `bug-hunter`, `test-writer`
- System zarządzania błędami (`/zglos-bug`, `/zamknij-bug`, klasyfikacja P1/P2/P3)
- Workflow Git z branchami `task/[ID]-[slug]` i automatycznym PR (`/po-pr`)
- Hooki: blokada bezpieczeństwa, kontekst sesji, formatowanie (z flagą), pauza hooków
- `QUALITY.md` — zasady jakości (Definition of Ready / Definition of Done)
- `TESTING.md` — trzywarstwowa strategia testów (smoke / regresja / per-task)
- Skill `/sprawdz-wymagania` — automatyczna weryfikacja Definition of Ready
- Przenoszalność: `/nowy-projekt`, `/framework-bump`, `/framework-update`, `VERSION`, `GETTING-STARTED.md`
