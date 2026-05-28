# QUALITY.md — Zasady jakości frameworku

> Żywy dokument. Sekcja 9 aktualizowana automatycznie przez `/po-retro`.
> Powiązany: [TESTING.md](TESTING.md) — strategia testów.

## 1. Filozofia jakości

1. **Nie ma pracy bez taska. Nie ma taska bez wymagań.**
2. **Master jest zawsze działający. Nie ma merge bez zielonych testów.**
3. **Każdy błąd uczy. Każdy koszt jest widoczny.**

## 2. Definition of Ready (DoR)

Task może wejść do "W trakcie" tylko gdy spełnia wszystkie warunki:

- [ ] **Cel** opisany (po co, nie tylko co) — zdanie z "Po to robimy X, żeby Y"
- [ ] **Zakres** określony (co wchodzi i co NIE wchodzi)
- [ ] **Kryteria akceptacji** — min. 3 konkretne, testowalne punkty
- [ ] **Zależności** zidentyfikowane (inne taski, pliki, narzędzia)
- [ ] **Estymata** z `/po-estymuj` zrobiona
- [ ] **Ryzyko** z `/po-ryzyko` ocenione

Sprawdzane automatycznie przez `/sprawdz-wymagania` — wywoływane przez `/po-plan` przed przeniesieniem taska do "W trakcie". Niespełniony DoR blokuje start.

## 3. Definition of Done (DoD)

Task idzie do "Zrobione" tylko gdy:

- [ ] Testy jednostkowe napisane i zielone
- [ ] Regresja zielona (`node tests/regression/suite.js`)
- [ ] PR z review przez agenta `kod-reviewer` — wynik: ✅ GOTOWE
- [ ] Komentarz kosztowy w Todoist (`💰 Koszt sesji`)
- [ ] `/zamknij-bug` jeśli task naprawiał błąd
- [ ] README zaktualizowane jeśli zmieniła się obsługa
- [ ] Pole "Dostarczona wartość" wypełnione w opisie taska

## 4. Workflow tasków

```
Backlog
   ↓  /po-plan + /sprawdz-wymagania (DoR check)
W trakcie
   ↓  kodowanie + /git-commit (na branchu task/[ID]-[slug])
   ↓  testy (per-task + regresja)
   ↓  /po-pr + review agenta kod-reviewer
   ↓  DoD check
PR na GitHub
   ↓  merge do master
Zrobione + komentarz kosztowy + retro
```

## 5. Zarządzanie wymaganiami

Każdy task MUSI mieć w opisie sekcje:

- **Cel** — 1 zdanie "Po to robimy X, żeby Y"
- **Zakres** — co wchodzi / co nie wchodzi
- **Kryteria akceptacji** — testowalne punkty (Definicja ukończenia)
- **Wartość** — Oszczędność czasu / Redukcja kosztów / Jakość / Wiedza
- **Estymata** — komentarz z `/po-estymuj` (`💡 ESTYMATA: $X.XX–$X.XX`)

Brakujący element → `/sprawdz-wymagania` blokuje task w fazie DoR.

## 6. Zarządzanie błędami

**Klasyfikacja:** 🔴 KRYTYCZNY (P1) | 🟡 POWAŻNY (P2) | 🟢 DROBNY (P3)
**Źródła:** SKILL | AGENT | HOOK | CONFIG | HUMAN

**Cykl życia:** `/zgłoś-bug` → estymacja → naprawa → `/zamknij-bug` → wpis do `po-knowledge.md`

- Koszt znalezienia → komentarz w tasku macierzystym (gdzie błąd się wydarzył)
- Koszt naprawy → osobny task BUG w sekcji Bugi
- Każdy naprawiony bug MUSI mieć test (patrz [TESTING.md](TESTING.md#5-reguła-dla-bugów))

## 7. Śledzenie kosztów i estymat

Per task: **Estymata → Realne → Błąd% → Wniosek** (zapisywane przez `/po-uczenie`).

**KPI projektu** (mierzone przez `/po-retro`):

- Accuracy estymat: cel < 20% błędu średniego
- % budżetu na bugi: cel < 15%
- Koszt per feature: trend malejący

**Reguły decyzyjne:**

| Sytuacja | Akcja |
|----------|-------|
| Błąd estymy > 30% przez 3 taski z rzędu | Sesja kalibracyjna `/po-retro` |
| % budżetu na bugi > 25% | Przegląd skilli generujących bugi |
| Output > 70% kosztu sesji | Włącz `/tryb-kodowania` częściej, krótsze odpowiedzi |
| Cache read < 10% tokenów | Sprawdź dlaczego nie ma reusu kontekstu |

## 8. Dashboard

**Live data:** `C:\Users\adamk\AIProjects\Dokumenty\moj-dashboard\analytics.html`

Reguły decyzyjne z sekcji 7 są wizualizowane:
- ⚠️ alert w tabeli gdy output > 70% kosztu
- 5. karta "Struktura kosztów" — proporcje input/output/cache
- Wykres trendów — czy koszty maleją po wdrożeniu optymalizacji

## 9. Retrospektywa procesu

Co 10 ukończonych tasków `/po-retro` zadaje pytania:

- Czy DoR był przestrzegany (% tasków bez `/sprawdz-wymagania`)?
- Czy bugi mają wzorzec (źródło, typ skilla)?
- Czy jakiś skill generuje nieproporcjonalne koszty?
- Co zmienić w procesie?

Wynik retro **dopisywany automatycznie poniżej** (sekcja generowana przez `/po-retro`):

<!-- po-retro:start -->
<!-- po-retro:end -->

## 10. Wartość vs koszt

Każdy task ma pole **"Oczekiwana wartość"** (jedna z 4 kategorii):

- **Oszczędność czasu** — ile godzin/sesji ten task oszczędzi w przyszłości
- **Redukcja kosztów** — ile $ na sesję oszczędzi
- **Jakość** — ile bugów uniknie / ile zwiększy zaufanie do procesu
- **Wiedza** — co się nauczymy / czego pewność zwiększy

Po ukończeniu wypełniane jest **"Dostarczona wartość"** — porównanie z oczekiwaniem. Niedostarczona wartość → wniosek do `po-knowledge.md`.
