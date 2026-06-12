@echo off
cd %~dp0
if exist "public\Kimi_Agent_Build Frontend Portfolio.zip" (
    ren "public\Kimi_Agent_Build Frontend Portfolio.zip" "portfolio-cover.png"
    echo Renamed portfolio cover successfully.
) else (
    echo Portfolio cover zip not found.
)

if exist "public\skill_swap_cover_1781250495627.png" (
    ren "public\skill_swap_cover_1781250495627.png" "skill-swap-cover.png"
    echo Renamed skill swap cover successfully.
) else (
    echo Skill swap cover not found.
)
pause
