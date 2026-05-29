---
description: Pokazuje koszt sesji w tokenach i szacunkowej cenie USD. Użyj gdy chcesz wiedzieć "ile kosztowała ta sesja", "ile tokenów użyłem", "jaki był koszt zadania", "pokaż zużycie tokenów", "koszt sesji".
---

> ZASADA: Odpowiadaj zwięźle. Max 3 zdania wyjaśnienia.

## Twoje zadanie

Wygeneruj raport kosztów bieżącej sesji na podstawie dostępnych
danych o zużyciu tokenów.

### 1. ZBIERZ DANE O TOKENACH
Sprawdź zużycie tokenów w tej sesji z podziałem na typy:
- input tokens — to co Ty i narzędzia wysłały do Claude
- output tokens — to co Claude odpowiedział (NAJDROŻSZE)
- cache write tokens — zapisane do cache prompt cache
- cache read tokens — odczytane z cache (NAJTAŃSZE)
- łączna liczba tokenów

### 2. OBLICZ SZACUNKOWY KOSZT
Oblicz koszt w USD na podstawie aktualnych cen modeli Claude:

Ceny Claude Sonnet 4.6 (domyślny):
- input:        $3.00 za 1 milion tokenów
- output:       $15.00 za 1 milion tokenów
- cache write:  $3.75 za 1 milion tokenów
- cache read:   $0.30 za 1 milion tokenów

Ceny innych modeli (orientacyjne):
- claude-opus-4-7:   input $15/1M,   output $75/1M
- claude-haiku-4-5:  input $0.80/1M, output $4/1M

Wzór:
koszt_input       = (tokeny_input       / 1_000_000) * 3.00
koszt_output      = (tokeny_output      / 1_000_000) * 15.00
koszt_cache_write = (tokeny_cache_write / 1_000_000) * 3.75
koszt_cache_read  = (tokeny_cache_read  / 1_000_000) * 0.30
koszt_łączny      = suma wszystkich powyżej

Oblicz też:
- % udział output w koszcie = (koszt_output / koszt_łączny) * 100
- % udział cache w tokenach = (cache_read / łączne_tokeny) * 100

Przelicz na PLN (kurs: 1 USD = 4.00 PLN).

### 3. ZIDENTYFIKUJ MODELE
Aktywny model tej sesji: claude-sonnet-4-6
Jeśli były wywołania agentów — podaj jaki model każdy agent używał.
Czy były przełączenia modeli w trakcie sesji?
Jeśli nie możesz ustalić — napisz "Model nieustalony — przyjęto domyślny Sonnet 4.6".

### 4. KONTEKST — CO BYŁO ROBIONE
Na podstawie historii sesji oceń:
- które operacje zużyły najwięcej tokenów i jakiego typu (output/input/cache)
- czy były wywołania agentów (każdy agent to osobna sesja tokenów)
- ile wywołań MCP było w sesji

### 5. WSKAZÓWKA OSZCZĘDNOŚCI
Jeśli sesja była droga — podaj 1-2 konkretne wskazówki jak można
było zużyć mniej tokenów przy tym samym zadaniu.

---

## Format wyświetlania w CLI

════════════════════════════════════
KOSZT SESJI — [data]
════════════════════════════════════
Tokeny:  [in]in / [out]out / [cr]cr / [cw]cw
Koszt:   $[USD] (~[PLN] PLN) | output=[X]% kosztu
Model:   [model] | przełączenia: [X]
Sesja:   [największe zużycie — 1 zdanie]
Wskaz:   [1 zdanie jak oszczędzić]
Agenci:  [lista lub —]  Skille: [lista lub —]  MCP: [N] ops
════════════════════════════════════

---

## Ważna informacja o dokładności
Jeśli Claude Code nie udostępnia dokładnych liczb tokenów w tej
sesji — napisz wyraźnie: "Dane szacunkowe — dokładne liczby
niedostępne w CLI" i podaj przybliżenie na podstawie długości
rozmowy. Nie wymyślaj dokładnych liczb.
Dla cache write/read jeśli niedostępne — podaj 0 lub "n/d".

---

## Aktualizacja Todoist przez MCP

Po wyświetleniu raportu w CLI wykonaj automatycznie:

1. Znajdź zadanie do zapisu kosztu — w tej kolejności:
   a) Sprawdź sekcję "W trakcie" (6gj92pQqwMR2C3jq) — jeśli jest task, użyj go.
   b) Jeśli W trakcie jest puste — sprawdź sekcję "Zrobione" (6gj92pRv86Mh4Rvq)
      i użyj PIERWSZEGO taska z listy (najnowszy przeniesiony).
   c) Jeśli obie sekcje puste — wyświetl ostrzeżenie i zakończ.

2. Pobierz wszystkie komentarze tego zadania i policz te które
   zaczynają się od "💰 Koszt sesji". Numer nowej sesji = liczba + 1.

2b. **Guard anty-duplikat**: jeśli któryś komentarz "💰 Koszt sesji" ma DZISIEJSZĄ datę
    (np. zapisany już przez /podsumuj-sesje Krok 0) — NIE dodawaj nowego. Wyświetl notkę
    "koszt z dziś już zapisany — pomijam" i zakończ bez zapisu.

3. Dodaj NOWY komentarz (nigdy nie edytuj istniejących).

   ⚠️ FORMAT JEST OBOWIĄZKOWY — parser analytics.html (`parseCostComment`) czyta DOKŁADNIE
   te linie. Każde pole w osobnej linii, ze słowami kluczowymi i emoji jak niżej.
   NIE skracaj, NIE łącz pól w jedną linię — inaczej dashboard pokaże 0/puste.

💰 Koszt sesji #[numer] — [data RRRR-MM-DD]
Input: [in] | Output: [out]
Cache write: [cw] | Cache read: [cr]
Łącznie: [suma tokenów]
💵 Koszt: ~$[USD] (~[PLN] PLN)
🤖 Model: [pełne id, np. claude-opus-4-8 / claude-sonnet-4-6 — musi zawierać opus/sonnet/haiku]
📚 Skille: [/skill1, /skill2 lub: brak]
🤖 Agenci: [agent1, agent2 lub: brak]

Zasady wartości:
- Liczby tokenów: same cyfry (przecinki/spacje OK), bez "in"/"out" w środku. Jeśli szacunkowe — poprzedź `~`.
- Jeśli cache write/read nieznane — wpisz 0.
- Model MUSI zawierać "opus"/"sonnet"/"haiku" (parser po tym dobiera cennik do przeliczenia kosztu z tokenów).
- "Skille:" i "Agenci:" — pusto wpisz dokładnie "brak".

Jeśli fallback na Zrobione — dopisz na końcu pierwszej linii: "(zapisano po zamknięciu taska)"

Jeśli obie sekcje puste — NIE zapisuj komentarza. Wyświetl ostrzeżenie:

⚠️ Brak taska w 'W trakcie' i 'Zrobione' — komentarz kosztowy nie został zapisany.
Uruchom /po-plan żeby wskazać task sesji przed zapisem kosztów.

Nie pytaj o pozwolenie — wykonaj automatycznie.
