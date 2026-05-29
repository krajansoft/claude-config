---
description: Inkrementuje wersję frameworku w pliku VERSION i dopisuje wpis do CHANGELOG.md. Wywołuj po merge do master w claude-config gdy chcesz oznaczyć nową wersję. Argument: patch | minor | major.
argument-hint: [patch|minor|major]
---

> ZASADA: Odpowiadaj zwięźle. Max 3 zdania wyjaśnienia.

## Argument
$ARGUMENTS

## Twoje zadanie

Podbij wersję frameworku zgodnie z SemVer i zaktualizuj CHANGELOG.md.

### Krok 1 — Sprawdź typ podbicia
Argument musi być jednym z: `patch`, `minor`, `major`.
Jeśli pusty lub inny — zatrzymaj się i zapytaj który typ.
- `patch` — poprawka istniejącego skilla/hooka/agenta (1.0.0 → 1.0.1)
- `minor` — nowy skill lub agent (1.0.1 → 1.1.0)
- `major` — przełomowa zmiana architektury (1.1.0 → 2.0.0)

### Krok 2 — Odczytaj bieżącą wersję
Wczytaj `C:\Users\adamk\.claude\VERSION` (format X.Y.Z).
Jeśli plik nie istnieje — zatrzymaj się: "Brak pliku VERSION — uruchom inicjalizację frameworku".

### Krok 3 — Oblicz nową wersję
- `patch`: Z+1
- `minor`: Y+1, Z=0
- `major`: X+1, Y=0, Z=0

### Krok 4 — Zbierz zmiany z [Unreleased]
Wczytaj `C:\Users\adamk\.claude\CHANGELOG.md`.
Znajdź sekcję `## [Unreleased]`. Jeśli ma wpisy — przeniesiesz je do nowej wersji.
Jeśli `[Unreleased]` jest pusta — zapytaj użytkownika 1 zdaniem co się zmieniło (Dodano/Zmieniono/Naprawiono).

### Krok 5 — Zapisz
1. Nadpisz `VERSION` nową wersją.
2. W CHANGELOG.md:
   - zostaw pustą sekcję `## [Unreleased]` na górze,
   - pod nią wstaw `## [nowa-wersja] — [YYYY-MM-DD]` z przeniesioną/uzupełnioną treścią
     pogrupowaną w `### Dodano` / `### Zmieniono` / `### Naprawiono`.
   - NIE usuwaj wcześniejszych wersji.

### Krok 6 — Potwierdź
```
════════════════════════════════════
FRAMEWORK BUMP: [stara] → [nowa] ([typ])
════════════════════════════════════
VERSION:    zaktualizowany
CHANGELOG:  wpis [nowa] dodany
Następnie:  git commit + (opcjonalnie) git tag v[nowa]
════════════════════════════════════
```

Nie commituj automatycznie — to robi `/git-commit`. Pisz po polsku.
