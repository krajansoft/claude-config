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

1. Znajdź aktywne zadanie w sekcji "W trakcie" w projekcie
   Mój Dashboard (ID: 6gj92jFJMwm2RmFq, sekcja: 6gj92pQqwMR2C3jq).

2. Pobierz wszystkie komentarze tego zadania i policz te które
   zaczynają się od "💰 Koszt sesji". Numer nowej sesji = liczba + 1.

3. Dodaj NOWY komentarz (nigdy nie edytuj istniejących), max 5 linii:

💰 Koszt sesji #[numer] — [data]
Tokeny: [in]in/[out]out/[cr]cr | $[USD] (~[PLN]PLN) | Output=[X]%
Model: [model] | Agenci: [lista|—]
Skille: [lista|—] | MCP: [N] ops
Wskaz: [1 zdanie]

Jeśli nie ma aktywnego zadania w "W trakcie" — NIE zapisuj komentarza.
Wyświetl ostrzeżenie i zakończ:

⚠️ Brak aktywnego taska w 'W trakcie' — komentarz kosztowy nie został zapisany.
Uruchom /po-plan żeby wskazać task sesji przed zapisem kosztów.

Nie pytaj o pozwolenie — wykonaj automatycznie.
