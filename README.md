# Moja struktura Claude Code

Przewodnik po tym co zostało zbudowane i jak tego używać na co dzień.

---

## Co zostało zbudowane i po co

To jest Twoja osobista baza narzędzi dla Claude Code — dostępna we wszystkich projektach na tym komputerze.

Zamiast za każdym razem tłumaczyć Claude'owi co ma zrobić, masz gotowe:
- **Skille** — instrukcje które możesz wywołać komendą `/nazwa`
- **Agentów** — wyspecjalizowanych asystentów do konkretnych zadań
- **Hooki** — automatyczne akcje które działają bez Twojego udziału

---

## Struktura folderów

```
C:\Users\adamk\.claude\
├── skills\
│   ├── nowa-funkcja\SKILL.md       ← tworzenie nowych funkcji i komponentów
│   ├── popraw-blad\SKILL.md        ← diagnoza i naprawa błędów
│   ├── napisz-testy\SKILL.md       ← pisanie testów dla kodu
│   └── podsumuj-sesje\SKILL.md     ← podsumowanie sesji pracy
├── agents\
│   ├── kod-reviewer.md             ← recenzja kodu (model Haiku, tylko czyta)
│   ├── bug-hunter.md               ← łowca błędów (model Sonnet, czyta + bash)
│   └── test-writer.md              ← pisarz testów (model Sonnet, czyta + pisze)
├── hooks\
│   ├── blokada-bezpieczenstwo.ps1  ← blokuje niebezpieczne komendy
│   ├── kontekst-sesji.ps1          ← wczytuje stan git na starcie
│   └── formatowanie.ps1            ← formatuje pliki po zmianach
└── settings.json                   ← konfiguracja hooków
```

---

## Jak używać na co dzień

### Skille — wywołujesz przez `/nazwa`

| Komenda | Kiedy użyć | Przykład |
|---|---|---|
| `/nowa-funkcja` | Chcesz dodać nową funkcję lub komponent | `/nowa-funkcja koszyk - obsługa zakupów` |
| `/popraw-blad` | Masz błąd lub coś nie działa | `/popraw-blad Cannot read property of undefined` |
| `/napisz-testy` | Chcesz przetestować kod | `/napisz-testy utils.js` |
| `/podsumuj-sesje` | Kończysz pracę lub chcesz wiedzieć co zrobiłeś | `/podsumuj-sesje` |
| `/git-status` | Chcesz wiedzieć co dzieje się z gitem | `/git-status` |
| `/git-commit` | Chcesz zacommitować swoją pracę | `/git-commit` |

**Wskazówka:** `/nowa-funkcja` możesz wywołać tylko ręcznie. Pozostałe skille Claude może też uruchomić sam gdy uzna że pasują.

### Agenci — prosisz Claude żeby ich użył

```
użyj kod-reviewer żeby sprawdzić plik src/auth.js
użyj bug-hunter żeby znaleźć przyczynę błędu w konsoli
użyj test-writer żeby napisać testy dla modułu payments
```

**Czym różni się agent od skilla:**
- Skill działa w Twojej głównej rozmowie
- Agent pracuje osobno i zwraca tylko wynik — Twoja rozmowa nie zapycha się szczegółami

### Hooki — działają automatycznie, nic nie musisz robić

- **Przy starcie sesji:** Claude automatycznie widzi gałąź git i ostatnie zmiany
- **Po każdej edycji pliku:** formatter uruchomi się w tle (jeśli zainstalowany)
- **Przed każdą komendą:** niebezpieczne komendy są blokowane

---

## Typowy dzień pracy

```
1. Otwórz terminal w folderze projektu
2. Wpisz: claude
3. Claude automatycznie wczyta stan projektu (hook SessionStart)
4. Zacznij pracę normalnie

W trakcie pracy:
- Nowa funkcja?     → /nowa-funkcja nazwa - opis
- Błąd w kodzie?    → /popraw-blad [opis błędu]
- Chcesz review?    → "użyj kod-reviewer żeby sprawdzić [plik]"
- Kończysz?         → /podsumuj-sesje
```

---

## Jak dodać nowy skill

1. Utwórz folder w `C:\Users\adamk\.claude\skills\nazwa-skilla\`
2. Utwórz plik `SKILL.md` w tym folderze
3. Wpisz nagłówek i instrukcje według wzoru:

```markdown
---
description: Co robi ten skill i kiedy Claude ma go użyć.
---

## Instrukcje

Napisz tutaj co Claude ma zrobić krok po kroku.
```

4. Skill jest dostępny od razu w nowej sesji — nie trzeba restartować Claude Code

**Wzór do skopiowania** — zajrzyj do dowolnego istniejącego SKILL.md po przykład.

---

## Jak dodać nowego agenta

1. Utwórz plik `C:\Users\adamk\.claude\agents\nazwa-agenta.md`
2. Wpisz konfigurację według wzoru:

```markdown
---
name: nazwa-agenta
description: Kiedy Claude ma delegować zadanie do tego agenta.
tools: Read, Glob, Grep
model: haiku
color: blue
---

Opis jak agent ma się zachowywać i co robić.
```

3. **Uwaga:** agenci ładują się przy starcie sesji — po dodaniu nowego agenta uruchom nową sesję Claude Code

**Dostępne modele:** `haiku` (szybki, tani), `sonnet` (mądrzejszy), `opus` (najmądrzejszy)
**Dostępne kolory:** red, blue, green, yellow, purple, orange, pink, cyan

---

## Co zrobić gdy coś przestanie działać

### Skill nie reaguje na `/nazwa`
- Sprawdź czy folder ma dokładnie tę samą nazwę co komenda (np. `/popraw-blad` → folder `popraw-blad`)
- Sprawdź czy plik nazywa się dokładnie `SKILL.md` (wielkie litery)
- Uruchom nową sesję Claude Code

### Agent nie jest używany przez Claude
- Sprawdź czy pole `description` jest jasne i konkretne — Claude decyduje na jego podstawie
- Uruchom nową sesję Claude Code (agenci ładują się przy starcie)
- Możesz też poprosić wprost: "użyj agenta [nazwa] żeby..."

### Hook nie działa
- Otwórz `settings.json` i sprawdź czy ścieżka do skryptu jest poprawna
- Sprawdź czy plik skryptu `.ps1` istnieje w `C:\Users\adamk\.claude\hooks\`
- Uruchom nową sesję (hooki ładują się przy starcie)
- Wpisz `/hooks` w sesji Claude Code żeby zobaczyć czy hook jest widoczny

### Blokada niebezpiecznych komend nie działa
- Upewnij się że otwierasz **nową** sesję Claude Code po każdej zmianie w `settings.json`
- Wpisz `/hooks` żeby sprawdzić czy hook `PreToolUse` jest na liście

### Coś jest kompletnie zepsute — reset
Nie kasuj niczego. Zamiast tego otwórz nową sesję i napisz:
```
sprawdź plik C:\Users\adamk\.claude\settings.json i powiedz czy jest poprawny
```

---

## Planowane rozszerzenia (do dodania w przyszłości)

- `/jira-task` — tworzenie i aktualizacja zadań w Jira przez MCP
- Więcej hooków dopasowanych do konkretnych projektów
- Agenci specyficzni dla projektów (w `.claude/agents/` wewnątrz projektu)

---

## Historia zmian

| Data | Co dodano |
|---|---|
| 2026-05-26 | Pierwsza wersja — 6 skilli, 3 agenci, 3 hooki |
