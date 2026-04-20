#!/bin/bash

# Personal Finance & Expense Analytics App - Setup & Run Guide

echo "=================================================="
echo "Personal Finance & Expense Analytics App"
echo "=================================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
    echo ""
fi

# Display start options
echo "=================================================="
echo "Choose an option:"
echo "=================================================="
echo ""
echo "1) Development Mode (Hot Reloading)"
echo "   npm run dev"
echo ""
echo "2) Build for Production"
echo "   npm run build"
echo ""
echo "3) Preview Production Build"
echo "   npm run preview"
echo ""
echo "4) Run Linter"
echo "   npm run lint"
echo ""
echo "=================================================="
echo ""
echo "Starting development server..."
echo "The app will open at: http://localhost:5173"
echo ""

# Start development server
npm run dev
