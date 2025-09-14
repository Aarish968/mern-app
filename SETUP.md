# Setup Guide for MERN Auth CRUD Application

This guide will help you set up and run the MERN authentication and CRUD application locally.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB Atlas account** - [Sign up here](https://www.mongodb.com/atlas)

## Quick Setup

### Option 1: Automated Setup (Recommended)
```bash
# Clone the repository
git clone <your-repo-url>
cd mern-auth-crud-app

# Run the setup script
npm run setup
```

### Option 2: Manual Setup

1. **Install Dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

2. **Set up MongoDB Atlas**
   - Create a new cluster on MongoDB Atlas
   - Create a database user
   - Whitelist your IP address
   - Get your connection string

3. **Configure Environment Variables**

   **Backend (.env)**
   ```bash
   cd backend
   cp env.example .env
   ```
   
   Edit `.env` with your values:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-auth-crud?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
   JWT_EXPIRE=7d
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

   **Frontend (.env)**
   ```bash
   cd frontend
   cp env.example .env
   ```
   
   Edit `.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

## Running the Application

### Development Mode (Both Frontend and Backend)

From the root directory:
```bash
npm run dev
```

This will start both the backend server (port 5000) and frontend development server (port 3000).

### Running Separately

**Backend only:**
```bash
cd backend
npm run dev
```

**Frontend only:**
```bash
cd frontend
npm run dev
```

## Seeding Test Data

To populate your database with test data:

```bash
cd backend
npm run seed
```

This will create:
- 1 admin user: `admin@example.com` / `admin123`
- 3 student users: `john@example.com`, `jane@example.com`, `bob@example.com` / `student123`

## Testing

Run the backend tests:
```bash
cd backend
npm test
```

## Project Structure

```
mern-auth-crud-app/
├── backend/                 # Node.js/Express backend
│   ├── src/
│   │   ├── config/         # Database and JWT config
│   │   ├── controllers/     # Route handlers
│   │   ├── middlewares/    # Auth, error handling
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Helper functions
│   │   ├── validations/    # Input validation
│   │   ├── constants/      # Constants and messages
│   │   ├── app.js          # Express app setup
│   │   └── server.js       # Server entry point
│   ├── tests/              # Test files
│   ├── scripts/            # Utility scripts
│   └── package.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── layouts/        # Layout components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── context/        # React Context
│   │   ├── routes/         # Route components
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── public/             # Static assets
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/logout` - User logout

### Students (Admin Only)
- `GET /api/students/admin/all` - Get all students
- `GET /api/students/admin/stats` - Get student statistics
- `GET /api/students/admin/:id` - Get student by ID
- `POST /api/students/admin/create` - Create new student
- `PUT /api/students/admin/:id` - Update student
- `DELETE /api/students/admin/:id` - Delete student

### Students (Student Role)
- `GET /api/students/profile` - Get own profile
- `PUT /api/students/profile` - Update own profile

## Features

### ✅ Authentication
- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes

### ✅ User Roles
- **Admin**: Full access to all features
- **Student**: Limited access to own profile

### ✅ Admin Dashboard
- View all students with pagination and search
- Add/edit/delete student records
- View student statistics
- Manage student enrollment

### ✅ Student Dashboard
- View and update own profile
- View course information
- Manage account settings

### ✅ Security Features
- Password hashing
- JWT authentication
- Rate limiting
- CORS configuration
- Input validation
- Role-based access control

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Verify your MongoDB Atlas connection string
   - Check if your IP is whitelisted
   - Ensure the database user has proper permissions

2. **Port Already in Use**
   - Change the PORT in backend/.env
   - Or kill the process using the port

3. **CORS Errors**
   - Verify FRONTEND_URL in backend/.env matches your frontend URL
   - Check if both servers are running

4. **Authentication Issues**
   - Verify JWT_SECRET is set in backend/.env
   - Check if token is being sent in Authorization header

### Getting Help

If you encounter issues:
1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Check the README.md for additional information

## Next Steps

1. **Customize the application** to fit your specific needs
2. **Add more features** like email verification, password reset, etc.
3. **Deploy to production** using platforms like Heroku, Vercel, or Railway
4. **Add more tests** to ensure code quality
5. **Implement additional security measures** as needed

## Production Deployment

### Backend Deployment
1. Set up a production MongoDB Atlas cluster
2. Configure production environment variables
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or GitHub Pages

Remember to update the API URL in your production environment!
