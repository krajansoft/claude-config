# TESTING.md — Strategia testów frameworku

> Dokument techniczny. Powiązany: [QUALITY.md](QUALITY.md) — zasady jakości.

## 1. Filozofia testów

```
Każdy task = testy. Nie ma PR bez zielonych testów.
Test mówi CO robi kod, nie JAK to robi.
```

Test jest dokumentacją zachowania. Jeśli test brakuje — zachowanie nie jest zdefiniowane i może niezauważenie zniknąć.

## 2. Trzy warstwy

### Warstwa 1 — Smoke (5-10 testów, zawsze)

**Pytanie:** Czy projekt żyje? Skille widoczne? Hooki aktywne?

- Plik: `tests/smoke/critical.js`
- Uruchamiane: przy każdym PR (lokalnie przed pushem)
- Czas wykonania: < 5 sekund
- Cel: szybka detekcja katastrofy (frontmatter zniknął, skill plik usunięty)

### Warstwa 2 — Regresja (rośnie z projektem)

**Pytanie:** Czy nowy task nie zepsuł poprzednich?

- Plik: `tests/regression/suite.js`
- Uruchamiane: przy każdym PR przed merge (`/po-pr` Krok 3)
- Czas wykonania: < 30 sekund
- Cel: testy dla wszystkich naprawionych bugów + krytycznych ścieżek
- Każdy bug naprawiony → test trafia tutaj na zawsze

### Warstwa 3 — Per task (nowe przy każdym tasku)

**Pytanie:** Czy ten konkretny task robi to co ma robić?

- Plik: `tests/task-[ID8]/test.js` (szablon w `tests/task-template/test.js`)
- Uruchamiane: podczas pracy (TDD) + przy PR
- Cel: weryfikacja kryteriów akceptacji z DoD
- Po merge — przeniesione do `tests/regression/` jeśli weryfikuje ścieżkę krytyczną

## 3. Konwencja

- **Język:** JavaScript (Node.js 18+)
- **Framework:** wbudowany `node:test` (bez zewnętrznych zależności)
- **Nazewnictwo:** opisowe po polsku — `test("powinien blokować task bez celu", ...)`
- **Mocki:** Todoist MCP nigdy nie wołane na żywo w testach — zawsze fixture/mock

**Zasady:**

- Jeden test = jedna konkretna rzecz (jeden `assert`)
- Test nie zależy od innych testów (kolejność dowolna)
- Brak side effects (nie modyfikuje plików poza `tests/`)
- Czas pełnej regresji < 30 sekund — jeśli przekracza, dziel na grupy

## 4. Skille testowe

| Skill | Zastosowanie |
|-------|-------------|
| `/napisz-testy` | Pisze testy per-task na podstawie kryteriów akceptacji |
| `/regresja` | Uruchamia pełną suite regresji + smoke |

`/po-pr` automatycznie uruchamia regresję przed utworzeniem PR (Krok 3). Jeśli wynik zawiera "BLOKUJĄCE" — PR nie jest tworzony.

## 5. Reguła dla bugów

**Każdy naprawiony błąd MUSI mieć test**, który:

1. **Wykrywa błąd przed naprawą** (test czerwony na pre-fix kodzie)
2. **Przechodzi po naprawie** (test zielony po commitcie fixa)

To gwarantuje że błąd nie wróci. Test dla buga trafia od razu do `tests/regression/suite.js` (nie per-task) — bo musi działać zawsze, nie tylko podczas naprawy.

**Przepływ:** `/zgłoś-bug` → estymacja → napisz test (czerwony) → fix → test zielony → `/zamknij-bug` → wpis do `po-knowledge.md`.

## 6. Struktura katalogów

```
tests/
  smoke/
    critical.js         ← 5-10 testów najważniejszych ścieżek
  regression/
    suite.js            ← wszystkie testy regresji (rośnie z projektem)
  task-template/
    test.js             ← szablon dla nowych tasków
  task-[ID8]/
    test.js             ← testy aktywnego taska (przenoszone do regression po merge)
```

Wszystkie pliki w `tests/` są wersjonowane w `claude-config`. `.gitignore` wyklucza tylko `node_modules/` jeśli kiedyś pojawi.
