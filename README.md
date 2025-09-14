# MERN Authentication & CRUD Application

A full-stack web application built with MongoDB, Express.js, React, and Node.js featuring user authentication, role-based access control, and student management functionality.

## Features

### Authentication
- ✅ User registration and login with email/password
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Protected routes and middleware

### User Roles
- ✅ **Admin**: Full access to all features
- ✅ **Student**: Limited access to own profile

### Role-based Dashboards

#### Admin Dashboard
- ✅ View all students with pagination and search
- ✅ Add new students
- ✅ Edit student information
- ✅ Delete student records
- ✅ View student statistics
- ✅ Manage student enrollment

#### Student Dashboard
- ✅ View own profile information
- ✅ Update personal details (name, email, course)
- ✅ View enrollment date
- ✅ Manage account settings

### Student Entity
- ✅ Fields: name, email, course, enrollmentDate
- ✅ Data validation and error handling
- ✅ MongoDB Atlas integration

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (Atlas)
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Joi** - Data validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API protection

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **React Hook Form** - Form management
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Hot Toast** - Notifications
- **Vite** - Build tool

## Project Structure

```
mern-auth-crud-app/
│
├── backend/
│   ├── src/
│   │   ├── config/              # Database, JWT configuration
│   │   ├── controllers/         # Request handlers
│   │   ├── middlewares/         # Auth, error handling, rate limiting
│   │   ├── models/              # Mongoose schemas
│   │   ├── routes/              # API routes
│   │   ├── services/            # Business logic
│   │   ├── utils/               # Helper functions
│   │   ├── validations/         # Request validation
│   │   ├── constants/           # Constants and messages
│   │   ├── app.js               # Express app setup
│   │   └── server.js            # Server entry point
│   ├── package.json
│   └── env.example              # Environment variables template
│
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── layouts/             # Layout components
│   │   ├── pages/               # Page components
│   │   ├── services/             # API services
│   │   ├── context/             # React Context
│   │   ├── routes/              # Route components
│   │   ├── utils/               # Utility functions
│   │   ├── styles/              # Global styles
│   │   ├── App.jsx              # Main app component
│   │   └── main.jsx             # Entry point
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── env.example              # Environment variables template
│
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mern-auth-crud-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**

   **Backend (.env)**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-auth-crud?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
   JWT_EXPIRE=7d
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

   **Frontend (.env)**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server will run on http://localhost:5000

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/logout` - User logout

### Students (Admin Only)
- `GET /api/students/admin/all` - Get all students (with pagination & search)
- `GET /api/students/admin/stats` - Get student statistics
- `GET /api/students/admin/:id` - Get student by ID
- `POST /api/students/admin/create` - Create new student
- `PUT /api/students/admin/:id` - Update student
- `DELETE /api/students/admin/:id` - Delete student

### Students (Student Role)
- `GET /api/students/profile` - Get own profile
- `PUT /api/students/profile` - Update own profile

## Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Rate limiting on authentication endpoints
- ✅ CORS configuration
- ✅ Helmet security headers
- ✅ Input validation and sanitization
- ✅ Role-based access control
- ✅ Protected routes

## Error Handling

- ✅ Comprehensive error handling middleware
- ✅ Validation error responses
- ✅ Authentication error handling
- ✅ Database error handling
- ✅ Client-side error notifications

## Testing

The application includes comprehensive error handling and validation. To test the functionality:

1. Register a new user (defaults to student role)
2. Login with credentials
3. Test role-based access:
   - Students can only access their profile
   - Admins can manage all students
4. Test CRUD operations
5. Test form validation
6. Test error scenarios

## Deployment

### Backend Deployment
1. Set up MongoDB Atlas cluster
2. Configure environment variables
3. Deploy to platforms like Heroku, Railway, or Vercel

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or GitHub Pages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.
