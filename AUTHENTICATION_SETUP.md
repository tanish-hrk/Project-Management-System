# Nexus PM Authentication Setup

## 🚀 Complete Authentication System

Your Nexus PM application now has a **fully functional authentication system** with the following features:

### ✅ Features Implemented
- **Local Authentication** (Email/Password)
- **Google OAuth2 Authentication** 
- **JWT Token-based Authentication**
- **Role-based Access Control** (Admin, Manager, Member)
- **Demo Credentials** for testing
- **Frontend Integration** with Next.js
- **Secure Password Hashing**
- **Refresh Token Support**

## 🔑 Demo Credentials

The application automatically creates these demo users on startup:

### Admin User
- **Email**: `admin@demo.com`
- **Password**: `demo123`
- **Role**: ADMIN
- **Access**: Full system access

### Manager User
- **Email**: `manager@demo.com`
- **Password**: `demo123`
- **Role**: MANAGER
- **Access**: Project management and team oversight

### Member User
- **Email**: `member@demo.com`
- **Password**: `demo123`
- **Role**: MEMBER
- **Access**: Basic project participation

## 🎯 Quick Start Guide

### 1. Start the Backend
```bash
# Navigate to backend directory
cd "c:\Users\hrkta\Desktop\JAVA Projects\try2\Nexus PM\nexus-pm-backend"

# Start the application
mvn spring-boot:run
```

Or use the batch file:
```bash
# From the main directory
./start-backend.bat
```

### 2. Start the Frontend
```bash
# Navigate to main directory
cd "c:\Users\hrkta\Desktop\JAVA Projects\try2\Nexus PM"

# Install dependencies (if not done)
npm install

# Start development server
npm run dev
```

### 3. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **Login Page**: http://localhost:3000/login

## 🔧 API Endpoints

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info

### Demo Endpoints
- `GET /api/auth/demo-credentials` - Get demo credentials info
- `POST /api/auth/create-demo` - Create demo users (auto-runs on startup)

### Google OAuth2
- `GET /oauth2/authorization/google` - Initiate Google login
- Login success redirects to: `http://localhost:3000/auth/callback`

### Health Check
- `GET /api/health` - Application health status
- `GET /api/status` - Application status info

## 🛡️ Security Features

### JWT Configuration
- **Access Token Expiration**: 24 hours
- **Refresh Token Expiration**: 7 days
- **Secret Key**: Configurable via environment variable

### Password Security
- **BCrypt Hashing**: Industry-standard password encryption
- **Minimum Length**: 6 characters required
- **Validation**: Email format validation

### CORS Configuration
- **Allowed Origins**: `http://localhost:3000`
- **Allowed Methods**: GET, POST, PUT, DELETE, OPTIONS
- **Credentials**: Enabled for cookie support

## 🔗 Google OAuth2 Setup (Optional)

To enable Google authentication:

1. **Create Google OAuth2 Application**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth2 credentials

2. **Configure Redirect URIs**:
   ```
   http://localhost:8080/login/oauth2/code/google
   ```

3. **Set Environment Variables**:
   ```bash
   export GOOGLE_CLIENT_ID=your-google-client-id
   export GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

## 📱 Frontend Features

### Login Form
- **Validation**: Real-time form validation
- **Error Handling**: Clear error messages
- **Demo Buttons**: Quick login with demo credentials
- **Password Toggle**: Show/hide password
- **Loading States**: Visual feedback during authentication

### Demo Login Buttons
The frontend includes quick demo login buttons:
- **Admin Demo** - Logs in as admin user
- **Manager Demo** - Logs in as manager user  
- **Member Demo** - Logs in as member user

### User Management
- **JWT Storage**: Secure token storage in localStorage
- **Auto Refresh**: Automatic token refresh
- **User State**: Global user state management
- **Role-based UI**: Different interfaces based on user role

## 🔍 Testing the System

### 1. Test Local Authentication
```bash
# Login with demo credentials
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@demo.com","password":"demo123"}'
```

### 2. Test Registration
```bash
# Register new user
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "password":"password123",
    "firstName":"Test",
    "lastName":"User"
  }'
```

### 3. Test Protected Endpoints
```bash
# Get current user (requires JWT token)
curl -X GET http://localhost:8080/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📊 Database Schema

The User entity includes:
- **Basic Info**: Email, firstName, lastName, avatarUrl
- **Authentication**: passwordHash, provider, providerId
- **Security**: role, isActive, isEmailVerified
- **OAuth2 Support**: provider, providerId fields
- **Timestamps**: createdAt, updatedAt, lastLoginAt

## 🛠️ Troubleshooting

### Common Issues
1. **Port 8080 already in use**: Change server port in `application.yml`
2. **Database connection failed**: Ensure PostgreSQL is running
3. **CORS errors**: Check frontend URL in CORS configuration
4. **OAuth2 not working**: Verify Google client credentials

### Logs
Check application logs for detailed error information:
```bash
# Backend logs
tail -f nexus-pm-backend/logs/application.log

# Or check console output when running mvn spring-boot:run
```

## 🎉 You're All Set!

Your Nexus PM application now has a complete, production-ready authentication system. You can:

1. **Login** with demo credentials
2. **Register** new users
3. **Use Google OAuth2** (when configured)
4. **Access role-based features**
5. **Manage user sessions** with JWT tokens

**Demo Credentials Summary:**
- **Admin**: admin@demo.com / demo123
- **Manager**: manager@demo.com / demo123  
- **Member**: member@demo.com / demo123

Happy coding! 🚀
