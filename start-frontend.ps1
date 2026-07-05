# Start Mini CRM frontend (run in Terminal 2)
$ErrorActionPreference = "Stop"

Set-Location "$PSScriptRoot\frontend"

if (-not (Test-Path .env)) {
    Copy-Item .env.example .env
    Write-Host "Created .env from .env.example. VITE_API_URL defaults to http://localhost:5000/api." -ForegroundColor Yellow
}

if (-not (Test-Path node_modules)) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
    npm install
}

Write-Host "Starting frontend on http://localhost:5173 ..." -ForegroundColor Green
npm run dev
