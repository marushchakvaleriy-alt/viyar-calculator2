@echo off
chcp 65001 >nul
title Калькулятор - Запуск
color 0A

echo ═══════════════════════════════════════════════════════
echo    🚀 Запуск калькулятора Vpoint
echo ═══════════════════════════════════════════════════════
echo.

echo 🔄 Оновлення коду з GitHub...
git --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Помилка: Git не знайдено! Переконайтеся, що Git встановлено.
    pause
    exit /b
)
git pull

echo.
echo 📡 Синхронізація локальних змін...
python --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Помилка: Python не знайдено! Переконайтеся, що Python встановлено.
    pause
    exit /b
)
python auto_push.py initial_sync_on_start
echo.

:: Перевірка, чи вже запущений local_saver.py
echo 🔍 Перевірка сервера збереження...
tasklist /FI "IMAGENAME eq python.exe" /V | find /I "Local Saver" >nul
if "%ERRORLEVEL%"=="0" (
    echo ✅ Local Saver вже запущений
) else (
    echo 📡 Запуск Local Saver у фоновому вікні...
    start "Local Saver - Port 5005" /MIN python local_saver.py
    timeout /t 2 /nobreak >nul
    echo ✅ Local Saver запущено
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
