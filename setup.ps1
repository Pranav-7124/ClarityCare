# ClarityCare Setup Script for Windows PowerShell
Write-Host "🏥 Setting up ClarityCare - Clinical-Tech Transparency Platform" -ForegroundColor Cyan
Write-Host "==============================================================" -ForegroundColor Cyan

# Check if Node.js is installed
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js is not installed. Please install Node.js v16 or higher." -ForegroundColor Red
    Write-Host "Download from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

$nodeVersion = node --version
Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green

# Check if npm is installed
if (!(Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "❌ npm is not installed. Please install npm." -ForegroundColor Red
    exit 1
}

$npmVersion = npm --version
Write-Host "✅ npm found: $npmVersion" -ForegroundColor Green

# Install Firebase CLI if not present
if (!(Get-Command firebase -ErrorAction SilentlyContinue)) {
    Write-Host "📦 Installing Firebase CLI..." -ForegroundColor Yellow
    npm install -g firebase-tools
} else {
    $firebaseVersion = firebase --version
    Write-Host "✅ Firebase CLI found: $firebaseVersion" -ForegroundColor Green
}

# Install project dependencies
Write-Host "📦 Installing project dependencies..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "🎉 Setup completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Configure Firebase:" -ForegroundColor White
Write-Host "   firebase login" -ForegroundColor Gray
Write-Host "   firebase init" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Update firebase-config.js with your project settings" -ForegroundColor White
Write-Host ""
Write-Host "3. Start development server:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Deploy to production:" -ForegroundColor White
Write-Host "   npm run deploy" -ForegroundColor Gray
Write-Host ""
Write-Host "🚀 Ready to build transparent healthcare with ClarityCare!" -ForegroundColor Green