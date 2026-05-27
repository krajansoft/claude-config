$flagPath = "C:\Users\adamk\.claude\hooks\.hooks-paused"

if (Test-Path $flagPath) {
    Remove-Item -Force $flagPath -ErrorAction SilentlyContinue
    Write-Output "════════════════════════════════════"
    Write-Output "TRYB KODOWANIA — WYLACZONY"
    Write-Output "════════════════════════════════════"
    Write-Output "Hooki przywrocone"
    Write-Output "Wpisz /koszt-sesji zeby zobaczyc oszczednosci"
    Write-Output "════════════════════════════════════"
} else {
    New-Item -ItemType File -Force $flagPath | Out-Null
    Write-Output "════════════════════════════════════"
    Write-Output "TRYB KODOWANIA — WLACZONY"
    Write-Output "════════════════════════════════════"
    Write-Output "Hooki wyciszone (formatowanie, kontekst git, linter)"
    Write-Output "Hook bezpieczenstwa nadal aktywny"
    Write-Output "Tokeny: oszczedzasz ~25% per tura"
    Write-Output "════════════════════════════════════"
    Write-Output "Wpisz /tryb-kodowania gdy skonczysz kodowac."
}
