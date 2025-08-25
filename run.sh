#!/bin/bash

echo "🎮 Gaming Website - Full Stack Setup"
echo "===================================="

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js and npm first."
    exit 1
fi

# Check if python is installed
if ! command -v python &> /dev/null && ! command -v python3 &> /dev/null; then
    echo "❌ Python is not installed. Please install Python first."
    exit 1
fi

# Use python3 if available, otherwise use python
PYTHON_CMD="python3"
if ! command -v python3 &> /dev/null; then
    PYTHON_CMD="python"
fi

echo "📦 Installing frontend dependencies..."
npm install

echo "🏗️  Building React frontend..."
npm run build

echo "🐍 Installing Python dependencies..."
pip install -r requirements.txt

echo "🗄️  Running Django migrations..."
$PYTHON_CMD manage.py migrate

echo "🚀 Starting Django server..."
echo "   Frontend: React app built and ready"
echo "   Backend:  Django server at http://localhost:8000"
echo "   API:      http://localhost:8000/api/status/"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

$PYTHON_CMD manage.py runserver