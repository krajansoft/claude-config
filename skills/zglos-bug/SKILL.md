---
description: Tworzy nowy task BUG w sekcji Bugi z klasyfikacją i estymatą. Użyj gdy znajdziesz błąd w skillach, agentach, hookach lub konfiguracji. Argument: /zgłoś-bug <opis błędu>.
argument-hint: [opis błędu]
---

> ZASADA: Odpowiadaj zwięźle. Max 3 zdania wyjaśnienia.

## Opis błędu
$ARGUMENTS

## Twoje zadanie

### Krok 1 — Klasyfikacja
Na podstawie $ARGUMENTS oceń wagę i źródło:

**Waga:**
- 🔴 KRYTYCZNY (P1) — blokuje workflow, skill/agent nie działa w ogóle
- 🟡 POWAŻNY (P2) — degraduje funkcjonalność, działa z błędami
- 🟢 DROBNY (P3) — kosmetyczny, działa ale niedoskonale

**Źródło:**
- SKILL — błąd w pliku SKILL.md
- AGENT — błąd w agencie .md
- HOOK — błąd w hookach .ps1
- CONFIG — błąd w konfiguracji
- HUMAN — błąd użytkownika

### Krok 2 — Estymata kosztu naprawy (orientacyjne)
- DROBNY P3:    ~5k tokenów   → ~$0.10  (~0.40 PLN)
- POWAŻNY P2:   ~20k tokenów  → ~$0.40  (~1.60 PLN)
- KRYTYCZNY P1: ~50k tokenów  → ~$1.00  (~4.00 PLN)

### Krok 2b — Sprawdź duplikat
Przez MCP find-tasks searchText="BUG:" w sekcji Bugi (6gj92pQjFpC8gfrH).
Jeśli znaleziono podobny bug (zbliżony opis) — poinformuj: "Podobny bug już istnieje: [nazwa]" i zapytaj "Zgłosić nowy mimo to?"

### Krok 3 — Utwórz task w Todoist
Przez MCP utwórz task:
- Sekcja: Bugi (6gj92pQjFpC8gfrH), projekt: 6gj92jFJMwm2RmFq
- Nazwa: "BUG: [krótki opis z $ARGUMENTS]"
- Priorytet: p1/p2/p3 odpowiednio do wagi

Opis taska w formacie:
```
Źródło: [SKILL/AGENT/HOOK/CONFIG/HUMAN]
Klasyfikacja: [🔴/🟡/🟢] [KRYTYCZNY/POWAŻNY/DROBNY]
Estymata naprawy: [N]k tokenów (~$[X.XX])

Opis: [szczegółowy opis błędu z $ARGUMENTS]

Oczekiwane: [co powinno być]
Rzeczywiste: [co jest]
```

### Krok 4 — Wyświetl potwierdzenie
```
════════════════════════════════════
BUG ZGŁOSZONY
════════════════════════════════════
ID:      [id taska]
Nazwa:   BUG: [opis]
Waga:    [🔴/🟡/🟢] [klasyfikacja]
Źródło:  [źródło]
Est.:    ~$[X.XX]
════════════════════════════════════
```
