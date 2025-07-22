# Servedi - Service Marketplace Platform

Servedi is a full-stack MERN (MongoDB, Express.js, React, Node.js) application that connects service providers with clients. It features a modern, responsive design with secure authentication and role-based access control.

## 🚀 Features

### Authentication & Authorization
- JWT-based authentication with access and refresh tokens
- Role-based access control (Client and Provider roles)
- Secure password hashing with bcrypt
- HTTP-only cookies for refresh tokens
- Automatic token refresh functionality

### User Management
- User registration with role selection
- User profile management
- Provider-specific business information
- Location-based provider listings

### Frontend Features
- Modern React application built with Vite
- Responsive design with Tailwind CSS
- Beautiful UI components with Heroicons
- Client-side routing with React Router
- Comprehensive form validation
- Loading states and error handling

### Backend Features
- RESTful API with Express.js
- MongoDB integration with Mongoose
- Input validation and sanitization
- Rate limiting for security
- CORS configuration
- Security headers with Helmet
- Request logging with Morgan

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Heroicons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security headers
- **Morgan** - Request logging

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **MongoDB** (v4.4 or higher)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd servedi
```

### 2. Install Dependencies

Install all dependencies for both frontend and backend:

```bash
npm run install:all
```

Or install them separately:

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### 3. Environment Configuration

Create a `.env` file in the `backend` directory with the following variables:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/servedi
JWT_ACCESS_SECRET=your_jwt_access_secret_key_here_make_it_long_and_secure
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here_make_it_different_and_long
JWT_ACCESS_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

**Important:** Replace the JWT secrets with your own secure, randomly generated strings.

### 4. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Ubuntu/Debian
sudo systemctl start mongod

# Or run directly
mongod
```

### 5. Run the Application

Start both the frontend and backend servers:

```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend development server on http://localhost:3000

### Individual Server Commands

```bash
# Start backend only
npm run backend:dev

# Start frontend only
npm run frontend:dev

# Start backend in production mode
npm run backend:start
```

## 📁 Project Structure

```
servedi/
├── backend/                 # Backend Express.js application
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── .env               # Environment variables
│   ├── package.json       # Backend dependencies
│   └── server.js          # Entry point
├── frontend/               # Frontend React application
│   ├── public/            # Public assets
│   ├── src/               # Source code
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React contexts
│   │   ├── hooks/         # Custom hooks
│   │   ├── pages/         # Page components
│   │   ├── utils/         # Utility functions
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── index.html         # HTML template
│   ├── package.json       # Frontend dependencies
│   ├── tailwind.config.js # Tailwind configuration
│   └── vite.config.js     # Vite configuration
├── package.json           # Root package.json
└── README.md             # This file
```

## 🔗 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `POST /refresh-token` - Refresh access token
- `POST /logout` - User logout
- `GET /profile` - Get user profile (protected)

### User Routes (`/api/users`)
- `GET /` - Get all users (protected)
- `GET /:id` - Get user by ID
- `GET /providers` - Get service providers with filtering
- `PUT /profile` - Update user profile (protected)
- `DELETE /account` - Deactivate user account (protected)

### Health Check
- `GET /api/health` - Server health check

## 👥 User Roles

### Client
- Register and login
- Browse service providers
- Search and filter providers
- View provider profiles
- Manage personal profile

### Provider
- Register with business information
- Manage business profile
- List services offered
- Set location and contact details
- View business dashboard

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt with salt rounds
- **Rate Limiting** - Prevent API abuse
- **CORS Protection** - Cross-origin request protection
- **Security Headers** - Helmet.js for security headers
- **Input Validation** - Mongoose schema validation
- **HTTP-Only Cookies** - Secure refresh token storage

## 🎨 Frontend Features

### Components
- **Navbar** - Responsive navigation with user menu
- **ProtectedRoute** - Route protection for authenticated users
- **Loading States** - Spinner components for async operations
- **Form Validation** - Client-side validation with error handling

### Pages
- **Home** - Landing page with features and CTA
- **Login/Register** - Authentication forms
- **Dashboard** - Role-specific user dashboard
- **Providers** - Provider listing with search and filters
- **Profile** - User profile management

## 🚀 Deployment

### Frontend Build

```bash
npm run build
```

### Environment Variables for Production

Update the `.env` file for production:

```env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
JWT_ACCESS_SECRET=your_production_access_secret
JWT_REFRESH_SECRET=your_production_refresh_secret
CORS_ORIGIN=your_production_frontend_url
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the `MONGODB_URI` in your `.env` file

2. **Port Already in Use**
   - Change the `PORT` in your `.env` file
   - Kill any processes using the ports

3. **CORS Errors**
   - Verify `CORS_ORIGIN` matches your frontend URL
   - Check that credentials are included in requests

4. **JWT Token Issues**
   - Ensure JWT secrets are properly set
   - Check token expiration times

### Getting Help

If you encounter any issues, please check the console logs for error messages and ensure all prerequisites are installed correctly.

## 🎯 Future Enhancements

- Real-time messaging between clients and providers
- Payment integration
- Review and rating system
- Advanced search with geolocation
- Mobile app development
- Email verification
- File upload for profile images
- Admin dashboard
- Analytics and reporting