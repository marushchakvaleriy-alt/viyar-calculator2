@echo off
chcp 65001 >nul
title Калькулятор V3 - Запуск
color 0B

echo ═══════════════════════════════════════════════════════
echo    🚀 Запуск калькулятора Vpoint V3 (BETA)
echo ═══════════════════════════════════════════════════════
echo.

:: Повертаємося на рівень вище, де лежить local_saver.py
cd /d "%~dp0"

:: Запуск local_saver.py з v2 (він універсальний)
tasklist /FI "WINDOWTITLE eq Local Saver*" 2>NUL | find /I /N "python.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo ✅ Local Saver вже працює
) else (
    echo 📡 Запуск сервісу збереження...
    start "Local Saver - Port 5005" /MIN python local_saver.py
    timeout /t 2 /nobreak >nul
)

echo.
echo 🌐 Відкриття Dashboard V3...
start "" "v3/index.html"

echo.
echo ═══════════════════════════════════════════════════════
echo    ✅ V3 запущено!
echo ═══════════════════════════════════════════════════════
echo.
timeout /t 5
