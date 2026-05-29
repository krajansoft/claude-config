$flagPath = "C:\Users\adamk\.claude\hooks\.hooks-paused"

if (Test-Path $flagPath) {
    Remove-Item -Force $flagPath -ErrorAction SilentlyContinue
    Write-Output "RESUMED"
} else {
    New-Item -ItemType File -Force $flagPath | Out-Null
    Write-Output "PAUSED"
}
