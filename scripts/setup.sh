#!/bin/bash

echo "🚀 Setting up MERN Auth CRUD Application..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed successfully"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install
if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed successfully"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

cd ..

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Set up your MongoDB Atlas cluster"
echo "2. Copy env.example to .env in both backend and frontend directories"
echo "3. Update the environment variables with your MongoDB connection string and JWT secret"
echo "4. Run 'npm run dev' in the backend directory to start the server"
echo "5. Run 'npm run dev' in the frontend directory to start the client"
echo ""
echo "🔗 Backend will run on http://localhost:5000"
echo "🔗 Frontend will run on http://localhost:3000"
echo ""
echo "📚 Check the README.md for detailed setup instructions"
echo "🔧 If you encounter issues, check TROUBLESHOOTING.md"
echo "🧪 Test files available: backend/test-db.js and backend/test-register.js"
