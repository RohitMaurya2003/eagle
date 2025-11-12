#!/bin/bash
# Quick Start Backend - macOS/Linux

echo "🔧 Killing any existing Node processes..."
pkill -f "node server.js" || true
sleep 2

echo "📦 Installing dependencies..."
cd backend
npm install

echo ""
echo "🚀 Starting backend server..."
npm run dev
