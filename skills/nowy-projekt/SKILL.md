---
description: Inicjalizuje nowy projekt z całego frameworku claude-config jedną komendą — struktura folderów, konfiguracja, git, projekt Todoist, hooki, dokumentacja i pierwszy commit. Użyj gdy zaczynasz nowy projekt. Argument: nazwa projektu.
argument-hint: [nazwa-projektu]
---

> ZASADA: Odpowiadaj zwięźle. Max 3 zdania wyjaśnienia.

## Argument
$ARGUMENTS — nazwa nowego projektu.

## Cel
Uruchomienie nowego projektu z pełnym dorobkiem frameworku, bez ręcznego kopiowania.

## Przed startem
- Jeśli `$ARGUMENTS` puste — zapytaj o nazwę projektu i zakończ jeśli brak.
- Odczytaj wersję frameworku z `C:\Users\adamk\.claude\VERSION` (użyj jej w configu i commicie).
- Ustal katalog docelowy: zapytaj gdzie utworzyć projekt (domyślnie `C:\Users\adamk\AIProjects\[nazwa]`).
- Jeśli katalog już istnieje i nie jest pusty — zatrzymaj się i zapytaj.

## Krok 1 — Struktura folderów
Utwórz w katalogu projektu:
```
[nazwa]/
  .claude/
    CLAUDE.md           ← kontekst projektu dla Claude
    project.config.md   ← konfiguracja per projekt
  src/
  tests/
    smoke/critical.js
    regression/suite.js
    run-all.js
    run-smoke.js
  docs/GETTING-STARTED.md
  README.md
  .gitignore
```
`tests/regression/suite.js` skopiuj jako szablon z frameworku (dostosuj ścieżkę CLAUDE_DIR do projektu).
`CLAUDE.md` — krótki kontekst: nazwa, technologia, jak uruchomić, gdzie szukać dokumentacji.

## Krok 2 — Wygeneruj project.config.md
Zadaj użytkownikowi pytania i zapisz odpowiedzi:
- Jaka technologia? (JS / Python / inne)
- Jaki typ projektu? (aplikacja / skrypt / biblioteka)
- Repozytorium GitHub? (podaj URL lub „utwórz nowe")
- Budżet miesięczny na tokeny? (w PLN)
- Język projektu? (PL / EN)

Format pliku `.claude\project.config.md`:
```
# Konfiguracja projektu: [nazwa]
Technologia:        [JS/Python/inne]
Typ:                [aplikacja/skrypt/biblioteka]
Repo:               [URL]
Budżet:             [X PLN/mies]
Język:              [PL/EN]
Wersja frameworku:  [X.Y.Z]
Data inicjalizacji: [YYYY-MM-DD]
# Todoist (uzupełniane w Kroku 4)
Projekt ID:  [id]
Backlog:     [id]
W trakcie:   [id]
Bugi:        [id]
Zrobione:    [id]
```

## Krok 3 — Inicjalizuj git
W katalogu projektu:
- `git init`
- jeśli podano URL repo: `git remote add origin [URL]`
Utwórz `.gitignore` z wykluczeniami:
```
node_modules/
.env
*.log
.formatting-active
.hooks-paused
```

## Krok 4 — Utwórz projekt w Todoist
Przez Todoist MCP utwórz projekt o nazwie `🖥️ [nazwa]`.
Dodaj 4 sekcje w kolejności: `Backlog`, `W trakcie`, `Bugi`, `Zrobione`.
Zapisz ID projektu i każdej sekcji do `project.config.md` (Krok 2).
Poproś użytkownika o potwierdzenie zanim utworzysz projekt (to akcja zewnętrzna).

## Krok 5 — Skopiuj hooki
Skopiuj z `C:\Users\adamk\.claude\hooks\` do `[projekt]\.claude\hooks\` te które istnieją:
- blokada-bezpieczenstwo.ps1
- kontekst-sesji.ps1
- formatowanie.ps1
- flag-on.ps1, flag-off.ps1
- hooks-pause.ps1, hooks-resume.ps1, hooks-toggle.ps1
Zaktualizuj w skopiowanych hookach wszystkie ścieżki `C:\Users\adamk\.claude` na ścieżkę projektu tam gdzie dotyczą projektu.
Wygeneruj `[projekt]\.claude\settings.json` rejestrujący skopiowane hooki (wzór: settings.json frameworku).

## Krok 6 — Wygeneruj GETTING-STARTED.md projektu
Na podstawie `project.config.md` zapisz `docs/GETTING-STARTED.md`:
```
# [nazwa] — Jak zacząć

## Wymagania
- Claude Code
- [technologia + wersja]
- Git

## Uruchomienie
1. git clone [URL]
2. cd [nazwa]
3. claude
4. /po-plan

## Workflow
[skrót z QUALITY.md frameworku]

## Framework
Wersja: [X.Y.Z]
Aktualizacja: /framework-update
```

## Krok 7 — Pierwszy commit
Wywołaj `/git-commit` (lub git bezpośrednio) z message:
`chore: initialize project from framework v[X.Y.Z]`

## Krok 8 — Potwierdź
```
════════════════════════════════════
NOWY PROJEKT: [nazwa]
════════════════════════════════════
✅ Struktura folderów
✅ project.config.md
✅ Git zainicjalizowany
✅ Todoist: 4 sekcje
✅ Hooki skopiowane ([N])
✅ GETTING-STARTED.md
✅ Pierwszy commit
Framework: v[X.Y.Z]
Rozpocznij: /po-plan
════════════════════════════════════
```

## Zasady
- Akcje zewnętrzne (utworzenie projektu Todoist, `git remote`) — potwierdzaj przed wykonaniem.
- Kopiuj tylko hooki które realnie istnieją; brakujące pomiń i odnotuj.
- Pisz po polsku.
