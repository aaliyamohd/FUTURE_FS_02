# Start Mini CRM backend (run in Terminal 1)
$ErrorActionPreference = "Stop"

Set-Location "$PSScriptRoot\backend"

if (-not (Test-Path .env)) {
    Copy-Item .env.example .env
    Write-Host "Created .env from .env.example. Edit backend\.env if needed (MongoDB URI, JWT secret)." -ForegroundColor Yellow
}

if (-not (Test-Path node_modules)) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Cyan
    npm install
}

Write-Host "Starting backend on http://localhost:5000 ..." -ForegroundColor Green
npm run dev
