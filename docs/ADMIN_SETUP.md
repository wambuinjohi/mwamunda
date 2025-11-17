# Admin System Setup Guide

## Overview

The Mwamunda Investment Limited application includes an admin system for user management and dashboard functionality. The system is connected to an external API at `https://mwamunda.ziratech.com/api.php`.

## System Architecture

- **Frontend**: React-based admin pages (Login, Register, Dashboard)
- **Backend**: Express.js API routes that proxy requests to the external API
- **Database**: Remote MySQL database via Ziratech API
- **Authentication**: Email/password-based with SHA256 hashing

## Initial Setup

### 1. Create Users Table

Before the first login, you need to initialize the users table:

```bash
# Option A: Using curl
curl -X POST http://localhost:8080/api/auth/init-users-table \
  -H "Content-Type: application/json"

# Option B: Visit the admin register page and the system will create the table on first registration
```

### 2. Access Admin Pages

- **Login**: `http://localhost:3000/admin/login`
- **Register**: `http://localhost:3000/admin/register`
- **Dashboard**: `http://localhost:3000/admin/dashboard`

### 3. Create First Admin Account

1. Navigate to `/admin/register`
2. Fill in the registration form with:
   - Full Name
   - Email Address
   - Password (minimum 6 characters)
   - Confirm Password
3. Click "Create Account"
4. Login with your credentials at `/admin/login`

## Features

### Admin Login Page

Located at `/admin/login`, allows existing administrators to:

- Enter email and password
- Toggle password visibility
- Create new account (redirect to register)
- Return to home page

### Admin Register Page

Located at `/admin/register`, allows creating new admin accounts:

- Full name input
- Email address
- Password with confirmation
- Password strength validation
- Automatic redirect to login after successful registration

### Admin Dashboard

Located at `/admin/dashboard`, provides:

- Welcome greeting with current user name
- Statistics cards:
  - Total Users count
  - Admin count
  - Last Updated timestamp
- User Management Table:
  - View all users
  - View user details in modal
  - Add new user button
  - Delete user functionality (ready to implement)
- Logout functionality

## API Endpoints

All endpoints are prefixed with `/api/auth/`:

### Initialize Users Table

```
POST /api/auth/init-users-table
```

### Register User

```
POST /api/auth/register
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123",
  "name": "Admin Name"
}
```

Response:

```json
{
  "success": true,
  "message": "User registered successfully",
  "userId": 1
}
```

### Login User

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "admin@example.com",
    "name": "Admin Name",
    "role": "user",
    "created_at": "2024-01-01T12:00:00Z",
    "updated_at": "2024-01-01T12:00:00Z"
  },
  "token": "base64encodedtoken"
}
```

### Get All Users

```
GET /api/auth/users
```

### Get Single User

```
GET /api/auth/user/:id
```

## Database Schema

The `users` table has the following structure:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Fields

- **id**: Unique user identifier (auto-increment)
- **email**: User email address (must be unique)
- **password**: SHA256 hashed password
- **name**: User's full name
- **role**: User role (default: 'user', can be 'admin')
- **created_at**: Account creation timestamp
- **updated_at**: Last update timestamp

## Authentication Flow

1. User submits email/password via login form
2. Backend receives request at `/api/auth/login`
3. Backend queries external API for all users
4. Password is compared using SHA256 hash
5. If match found:
   - User data (without password) is returned
   - A base64 encoded token is generated
   - User is stored in localStorage
6. User is redirected to dashboard

## Storage

User authentication data is stored in browser's localStorage:

```javascript
// Stored as
localStorage.user = JSON.stringify({
  id: 1,
  email: "admin@example.com",
  name: "Admin Name",
  role: "user",
  created_at: "2024-01-01T12:00:00Z",
  updated_at: "2024-01-01T12:00:00Z",
});
```

## Security Considerations

### Current Implementation

- ✅ Passwords are hashed using SHA256
- ✅ Unique email constraint at database level
- ✅ User data (without password) only sent to frontend
- ✅ CORS headers configured on external API

### Future Enhancements

- [ ] Implement JWT tokens for session management
- [ ] Add HTTPS/TLS requirement
- [ ] Implement rate limiting on auth endpoints
- [ ] Add password strength requirements
- [ ] Add account lockout after failed attempts
- [ ] Implement refresh token mechanism
- [ ] Add email verification for registration
- [ ] Implement password reset functionality

## Troubleshooting

### Users table not created

- Visit `/admin/register` to trigger table creation
- Or manually call POST `/api/auth/init-users-table`

### Login fails with "Invalid email or password"

- Verify email exists in database
- Check password is correct
- Ensure users table was created

### CORS errors

- External API has CORS headers enabled
- If issues persist, check network tab for actual error

### Session lost on page refresh

- Data is stored in localStorage, should persist
- Check browser's localStorage storage limit
- Clear browser cache if needed

## File References

- **API Backup**: `/docs/api.php` - Copy of external API code
- **Setup Guide**: `/docs/ADMIN_SETUP.md` - This file
- **Auth Routes**: `/server/routes/auth.ts` - Backend authentication logic
- **Auth Utilities**: `/client/lib/auth.ts` - Frontend auth helpers
- **Login Page**: `/client/pages/AdminLogin.tsx` - Login UI
- **Register Page**: `/client/pages/AdminRegister.tsx` - Registration UI
- **Dashboard**: `/client/pages/AdminDashboard.tsx` - Admin dashboard
- **App Routes**: `/client/App.tsx` - Route configuration

## Next Steps

1. Initialize the users table using the setup command above
2. Register the first admin account
3. Login to the admin dashboard
4. Expand features as needed (user editing, deletion, roles, etc.)
