# Claude Code Framework — Jak zacząć

Przewodnik dla każdego (w tym dla Ciebie za 6 miesięcy), kto chce używać tego frameworku
do prowadzenia projektów z Claude Code: workflow, jakość, koszty i przenoszalność.

> Powiązane: [QUALITY.md](QUALITY.md) · [TESTING.md](TESTING.md) · [CHANGELOG.md](CHANGELOG.md)

---

## Wymagania

- Claude Code (claude.ai/code)
- Windows 10/11
- Git
- Node.js 18+
- GitHub CLI (`gh`) — zalogowane (`gh auth login`)
- Todoist (darmowe konto) — przez MCP

---

## Instalacja frameworku

1. `git clone https://github.com/krajansoft/claude-config`
2. Skopiuj zawartość `.claude/` do `C:\Users\[twoja-nazwa]\.claude\`
3. Sprawdź `settings.json` — uprawnienia i ścieżki hooków
4. Uruchom nową sesję Claude Code i wpisz `/hooks` żeby potwierdzić że hooki są widoczne

---

## Nowy projekt

```
1. Otwórz terminal w folderze gdzie trzymasz projekty
2. claude
3. /nowy-projekt [nazwa]
4. Odpowiedz na pytania konfiguracyjne (technologia, repo, budżet, język)
5. /po-plan — gotowe do pracy
```

`/nowy-projekt` tworzy strukturę folderów, `project.config.md`, inicjalizuje git,
zakłada projekt w Todoist (Backlog / W trakcie / Bugi / Zrobione), kopiuje hooki
i generuje dokumentację — wszystko jedną komendą.

---

## Codzienny workflow

```
/po-plan        ← zacznij sesję: plan, budżet, wybór taska (+ Definition of Ready)
[praca...]      ← kodowanie na branchu task/[ID]-[slug]
/git-commit     ← commituj postęp
/po-pr          ← skończ task: regresja, review agenta, PR do master
/koszt-sesji    ← sprawdź ile kosztowała sesja
/podsumuj-sesje ← podsumowanie + aktualizacja Todoist
```

Zasady jakości (Definition of Ready / Definition of Done) opisuje [QUALITY.md](QUALITY.md).
Strategię testów (smoke / regresja / per-task) opisuje [TESTING.md](TESTING.md).

---

## Wersjonowanie frameworku

- Bieżąca wersja: plik [`VERSION`](VERSION) (format SemVer X.Y.Z)
- Po merge zmian do master: `/framework-bump [patch|minor|major]` — podbija wersję i dopisuje do CHANGELOG
- Aktualizacja istniejącego projektu do nowszego frameworku: `/framework-update` (w katalogu projektu)
- Historia zmian: [CHANGELOG.md](CHANGELOG.md)

---

## Gdy coś nie działa

- Skill nie reaguje na `/nazwa` → sprawdź nazwę folderu i plik `SKILL.md`, uruchom nową sesję
- Hook nie działa → `/hooks` w sesji, sprawdź `settings.json`
- Szczegółowy troubleshooting: [README.md](README.md)
