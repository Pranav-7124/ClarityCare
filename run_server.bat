@echo off
echo.
echo 🏥 ClarityCare Healthcare Transparency Platform
echo ==================================================
echo.
echo Starting development server...
echo.

REM Try Python 3 first
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Using Python 3
    python run_server.py
    goto :end
)

REM Try python3 command
python3 --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Using python3
    python3 run_server.py
    goto :end
)

REM Try py launcher
py --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Using py launcher
    py run_server.py
    goto :end
)

REM If no Python found
echo ❌ Error: Python not found!
echo.
echo Please install Python 3 from https://python.org
echo Make sure to add Python to your PATH during installation.
echo.
pause
goto :end

:end
pause