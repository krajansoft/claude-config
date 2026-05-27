param()

$pausePath = "C:\Users\adamk\.claude\hooks\.hooks-paused"
if (Test-Path $pausePath) { exit 0 }

# Czytaj JSON z stdin
$jsonText = [Console]::In.ReadToEnd()

# Sprawdz czy jestesmy w repozytorium git
$gitCheck = git rev-parse --git-dir 2>&1
if ($LASTEXITCODE -ne 0) {
    exit 0
}

# Pobierz informacje o projekcie
$branch = git branch --show-current 2>&1
$statusCount = (git status --short 2>&1 | Measure-Object -Line).Lines
$lastCommits = (git log --oneline -3 2>&1) -join "`n"

$warning = ""
try {
    $jsonData = $jsonText | ConvertFrom-Json -ErrorAction SilentlyContinue
    if ($null -ne $jsonData -and $jsonData.PSObject.Properties['messages']) {
        $turnCount = $jsonData.messages.Count
        if ($turnCount -gt 15) {
            $warning = "`n⚠️  UWAGA: Długa sesja ($turnCount tur) — rozważ /podsumuj-sesje i restart.`nKażda tura kosztuje więcej przez narastający kontekst."
        }
    }
} catch {}

$context = "=== Stan projektu na start sesji ===`nGalaz: $branch`nNiezacommitowane pliki: $statusCount`nOstatnie commity:`n$lastCommits`n==================================$warning"

$odpowiedz = @{
    hookSpecificOutput = @{
        hookEventName = "SessionStart"
        additionalContext = $context
    }
} | ConvertTo-Json -Depth 5

Write-Output $odpowiedz
exit 0
