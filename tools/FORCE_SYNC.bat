@echo off
title GitHub Force Push (ASCII)

echo -----------------------------------------------------------
echo    GITHUB FORCE SYNC (FIX)
echo -----------------------------------------------------------
echo.
echo Fixing syncing issues by forcing a push.
echo.

cd /d "%~dp0.."

echo [Step 1] Adding files...
git add .
git commit -m "Force sync: Structure cleanup"

echo.
echo [Step 2] Pushing to GitHub (Force)...
echo       Please enter your credentials if asked.
echo.

git push origin main --force

echo.
echo -----------------------------------------------------------
if %ERRORLEVEL% EQU 0 (
    echo    SUCCESS! GitHub is now updated.
) else (
    echo    ERROR. Please check your internet or permissions.
)
echo -----------------------------------------------------------
echo.
pause
