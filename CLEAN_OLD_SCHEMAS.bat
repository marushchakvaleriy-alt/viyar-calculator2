@echo off
chcp 65001 >nul
title Очищення зайвих файлів
color 0E

echo ═══════════════════════════════════════════════════════
echo    🧹 Очищення зайвих schema файлів
echo ═══════════════════════════════════════════════════════
echo.

cd /d "%~dp0data"

echo 📋 Файли, які будуть ВИДАЛЕНІ:
echo.
dir /b schema_1766508374521.js 2>nul
dir /b schema_1766527647185.js 2>nul
dir /b schema_1766581267258.js 2>nul
dir /b schema_1766581596679.js 2>nul
dir /b schema_1766581633503.js 2>nul
dir /b schema_1766581706192.js 2>nul
dir /b schema_1766606590258.js 2>nul
dir /b schema_1766606757406.js 2>nul

echo.
echo ⚠️  УВАГА! Ці файли буде видалено назавжди!
echo.
pause

:: Видалення файлів
del /F schema_1766508374521.js 2>nul
del /F schema_1766527647185.js 2>nul
del /F schema_1766581267258.js 2>nul
del /F schema_1766581596679.js 2>nul
del /F schema_1766581633503.js 2>nul
del /F schema_1766581706192.js 2>nul
del /F schema_1766606590258.js 2>nul
del /F schema_1766606757406.js 2>nul

echo.
echo ═══════════════════════════════════════════════════════
echo    ✅ Очищення завершено!
echo ═══════════════════════════════════════════════════════
echo.
echo 📁 Залишилися тільки потрібні файли:
echo    • config_calculators.js
echo    • config_dashboard.js
echo    • schema_kitchen.js
echo    • schema_wardrobe.js
echo    • schema_1766609404147.js (апапапапап)
echo    • schema_1766610229916.js (віаіваіваіва)
echo.
pause
