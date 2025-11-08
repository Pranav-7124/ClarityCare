#!/bin/bash

echo ""
echo "🏥 ClarityCare Healthcare Transparency Platform"
echo "=================================================="
echo ""
echo "Starting development server..."
echo ""

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Try different Python commands
if command_exists python3; then
    echo "✅ Using python3"
    python3 run_server.py
elif command_exists python; then
    # Check if it's Python 3
    python_version=$(python --version 2>&1)
    if [[ $python_version == *"Python 3"* ]]; then
        echo "✅ Using python (Python 3)"
        python run_server.py
    else
        echo "❌ Error: Python 2 detected, but Python 3 is required!"
        echo ""
        echo "Please install Python 3 or use 'python3' command."
        exit 1
    fi
else
    echo "❌ Error: Python not found!"
    echo ""
    echo "Please install Python 3:"
    echo "  • Ubuntu/Debian: sudo apt install python3"
    echo "  • macOS: brew install python3 (or download from python.org)"
    echo "  • CentOS/RHEL: sudo yum install python3"
    echo ""
    exit 1
fi

echo ""
echo "Server stopped."