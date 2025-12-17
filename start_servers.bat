@echo off
echo ===================================================
echo Starting Language Translator Application
echo ===================================================

echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && venv\Scripts\activate && python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000"

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo ===================================================
echo Application started! 
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:8000
echo ===================================================
pause
