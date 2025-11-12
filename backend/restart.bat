@echo off
echo Killing existing Node processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak
echo.
echo Starting backend server...
npm run dev
pause
