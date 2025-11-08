#!/bin/bash

# ClarityCare Setup Script
echo "🏥 Setting up ClarityCare - Clinical-Tech Transparency Platform"
echo "=============================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ npm found: $(npm --version)"

# Install Firebase CLI if not present
if ! command -v firebase &> /dev/null; then
    echo "📦 Installing Firebase CLI..."
    npm install -g firebase-tools
else
    echo "✅ Firebase CLI found: $(firebase --version)"
fi

# Install project dependencies
echo "📦 Installing project dependencies..."
npm install

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Configure Firebase:"
echo "   firebase login"
echo "   firebase init"
echo ""
echo "2. Update firebase-config.js with your project settings"
echo ""
echo "3. Start development server:"
echo "   npm run dev"
echo ""
echo "4. Deploy to production:"
echo "   npm run deploy"
echo ""
echo "🚀 Ready to build transparent healthcare with ClarityCare!"