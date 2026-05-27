param()

$pausePath = "C:\Users\adamk\.claude\hooks\.hooks-paused"
if (Test-Path $pausePath) { exit 0 }

# Formatowanie aktywne tylko gdy istnieje flaga commit
# Flaga jest tworzona przez skill /git-commit i usuwana po jego zakończeniu
$flagPath = "C:\Users\adamk\.claude\hooks\.formatting-active"
if (-not (Test-Path $flagPath)) { exit 0 }

# Czytaj JSON z stdin
$jsonText = [Console]::In.ReadToEnd()
try {
    $data = $jsonText | ConvertFrom-Json
    $filePath = $data.tool_input.file_path
} catch {
    exit 0
}
if (-not $filePath) { exit 0 }
if (-not (Test-Path $filePath)) { exit 0 }
$ext = [System.IO.Path]::GetExtension($filePath).ToLower()

# JavaScript / TypeScript / JSON / CSS / HTML - uzyj Prettier jesli dostepny
if ($ext -in @(".js", ".jsx", ".ts", ".tsx", ".json", ".css", ".html", ".vue")) {
    $prettier = Get-Command prettier -ErrorAction SilentlyContinue
    if ($prettier) {
        prettier --write $filePath 2>&1 | Out-Null
    }
}

# Python - uzyj Black jesli dostepny
if ($ext -in @(".py")) {
    $black = Get-Command black -ErrorAction SilentlyContinue
    if ($black) {
        black $filePath 2>&1 | Out-Null
    }
}
exit 0
