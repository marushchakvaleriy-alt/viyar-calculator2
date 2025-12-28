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
echo.
echo 📥 Отримання змін (git pull --rebase)...
git pull --rebase
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️ Помилка при отриманні оновлень. Можливо, є конфлікти.
    echo Спробуйте запустити git pull вручну в консолі.
)
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


echo 🌐 Відкриття калькулятора в браузері...
timeout /t 1 /nobreak >nul
start "" "index.html"

echo.
echo ═══════════════════════════════════════════════════════
echo    ✅ Готово! Калькулятор відкрито
echo ═══════════════════════════════════════════════════════
echo.
timeout /t 5
