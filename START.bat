@echo off
chcp 65001 >nul
title Kalkulyator - Zapusk
color 0A

echo ===================================================
echo    Zapusk kalkulyatora Vpoint
echo ===================================================
echo.

echo [INFO] Perevirka Git...
git --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git ne znajdeno! Propuskayemo onovlennya.
    goto skip_git
)

echo [INFO] Otrimannya zmin (git pull)...
git pull --rebase
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Pomilka pri onovlenni. Prodovzhuyemo...
)
echo.

:skip_git
echo [INFO] Perevirka Python...
python --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Python ne znajdeno!
    echo Vidkrivayemo index.html napryamu...
    start "" "index.html"
    timeout /t 3
    exit /b
)

echo [INFO] Zapusk Local Saver servera...
start "Local Saver - Port 5005" /MIN python tools\local_saver.py
timeout /t 2 /nobreak >nul

echo.
echo [INFO] Vidkrittya brauzera (http://localhost:5005)...
timeout /t 1 /nobreak >nul
start "" "http://localhost:5005"

echo.
echo ===================================================
echo    Gotovo! Kalkulyator vidkrito
echo ===================================================
echo.
echo Shchob zupinity Local Saver, zakriyte vikno "Local Saver - Port 5005"
echo.
timeout /t 5
