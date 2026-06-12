$publicDir = Join-Path $PSScriptRoot "public"

$file1 = Join-Path $publicDir "Kimi_Agent_Build Frontend Portfolio.zip"
$dest1 = Join-Path $publicDir "portfolio-cover.png"
if (Test-Path $file1) {
    Rename-Item -Path $file1 -NewName "portfolio-cover.png" -Force
    Write-Host "Renamed portfolio cover."
}

$file2 = Join-Path $publicDir "skill_swap_cover_1781250495627.png"
$dest2 = Join-Path $publicDir "skill-swap-cover.png"
if (Test-Path $file2) {
    Rename-Item -Path $file2 -NewName "skill-swap-cover.png" -Force
    Write-Host "Renamed skill swap cover."
}
