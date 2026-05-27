param()

# Czytaj JSON z stdin
$jsonText = [Console]::In.ReadToEnd()

try {
    $data = $jsonText | ConvertFrom-Json
    $command = $data.tool_input.command
} catch {
    exit 0
}

if (-not $command) { exit 0 }

# Lista niebezpiecznych wzorcow
$wzorce = @(
    "rm -rf",
    "git push --force",
    "git push -f",
    "remove-item -recurse -force c:",
    "format c:"
)

foreach ($wzorzec in $wzorce) {
    if ($command.ToLower().Contains($wzorzec.ToLower())) {
        $odpowiedz = @{
            hookSpecificOutput = @{
                hookEventName = "PreToolUse"
                permissionDecision = "deny"
                permissionDecisionReason = "ZABLOKOWANO: Komenda zawiera niebezpieczny wzorzec '$wzorzec'. Jesli na pewno chcesz to wykonac, zrob to recznie w terminalu."
            }
        } | ConvertTo-Json -Depth 5
        Write-Output $odpowiedz
        exit 0
    }
}

exit 0
