@echo off
chcp 65001 >nul
title Калькулятор - Запуск
color 0A

echo ═══════════════════════════════════════════════════════
echo    🚀 Запуск калькулятора Vpoint
echo ═══════════════════════════════════════════════════════
echo.

:: Перевірка, чи вже запущений local_saver.py
tasklist /FI "WINDOWTITLE eq Local Saver*" 2>NUL | find /I /N "python.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo ✅ Local Saver вже запущений
) else (
    echo 📡 Запуск Local Saver...
    start "Local Saver - Port 5005" /MIN python local_saver.py
    timeout /t 2 /nobreak >nul
    echo ✅ Local Saver запущено на порту 5005
)

echo.
echo 🌐 Відкриття калькулятора в браузері...
timeout /t 1 /nobreak >nul
start "" "index.html"

echo.
echo ═══════════════════════════════════════════════════════
echo    ✅ Готово! Калькулятор відкрито
echo ═══════════════════════════════════════════════════════
echo.
echo 💡 Щоб зупинити Local Saver, закрийте вікно "Local Saver - Port 5005"
echo.
timeout /t 5
