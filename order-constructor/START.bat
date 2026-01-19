@echo off
chcp 65001 >nul
title Konstruktor Zamovlen - Start
color 0A

echo ===================================================
echo    Konstruktor Zamovlen - Zapusk
echo ===================================================
echo.

echo [INFO] Vidkryvayu Constructor Zamovlen v brauzeri...

:: Otkryt index.html v brauzere po umolchaniyu
start "" "%~dp0index.html"

echo.
echo [OK] Constructor Zamovlen vidkryto!
echo.
echo ===================================================
echo    Gotovo! Mozhete zakriti ce vikno.
echo ===================================================
echo.

timeout /t 3 >nul
