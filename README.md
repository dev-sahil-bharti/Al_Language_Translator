# Language Translator

This project consists of a Python FastAPI backend and a React frontend.

## Structure

- `backend/`: FastAPI application
- `frontend/`: React application

## Prerequisites

- **Python 3.8+**
- **Node.js 14+**

## Running the Project

### Quick Start (Windows)

Simply double-click the `start_servers.bat` file in the root directory. This will open two terminal windows: one for the backend and one for the frontend.

### Manual Startup

#### Backend (Windows)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment (Recommended):
   ```bash
   python -m venv venv
   .\venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the server:
   ```bash
   python -m uvicorn main:app --reload
   ```
   The backend will start at `http://localhost:8000`.

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   The frontend will start at `http://localhost:5173`.
