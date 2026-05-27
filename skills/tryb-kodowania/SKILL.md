---
description: Wycisza hooki podczas aktywnego kodowania żeby oszczędzać tokeny. Używaj gdy zaczynasz intensywną pracę nad kodem. Wywołaj ponownie żeby przywrócić hooki. Użyj gdy mówisz "włącz tryb kodowania", "wycisz hooki", "zacznij kodować", "wyłącz tryb kodowania", "przywróć hooki", "skończyłem kodować".
---

> ZASADA: Odpowiadaj zwięźle. Max 3 zdania wyjaśnienia.

Uruchom skrypt toggle i odczytaj wynik:
!`powershell -File "C:\Users\adamk\.claude\hooks\hooks-toggle.ps1"`

Jeśli wynik to "PAUSED" wyświetl:
════════════════════════════════════
🔕 TRYB KODOWANIA — WŁĄCZONY
════════════════════════════════════
✅ Hooki wyciszone (formatowanie, kontekst git, linter)
🔒 Hook bezpieczeństwa nadal aktywny
💡 Tokeny: oszczędzasz ~25% per tura
════════════════════════════════════
Wpisz /tryb-kodowania gdy skończysz kodować.

Jeśli wynik to "RESUMED" wyświetl:
════════════════════════════════════
🔔 TRYB KODOWANIA — WYŁĄCZONY
════════════════════════════════════
✅ Hooki przywrócone
📊 Wpisz /koszt-sesji żeby zobaczyć oszczędności
════════════════════════════════════
