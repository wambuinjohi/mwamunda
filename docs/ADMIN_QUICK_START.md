# Admin System - Quick Start Guide

## 🚀 Getting Started (3 Steps)

### Step 1: Initialize Database
Visit: `http://localhost:3000/admin/init`

Click the "Initialize Database" button to create the users table.

### Step 2: Create Admin Account
Visit: `http://localhost:3000/admin/register`

Fill in:
- Full Name
- Email
- Password (min 6 chars)
- Confirm Password

Click "Create Account"

### Step 3: Login to Dashboard
Visit: `http://localhost:3000/admin/login`

Use the email and password from Step 2

You're now logged in! 🎉

## 📍 Admin URLs

- **Initialize**: `http://localhost:3000/admin/init`
- **Register**: `http://localhost:3000/admin/register`
- **Login**: `http://localhost:3000/admin/login`
- **Dashboard**: `http://localhost:3000/admin/dashboard`

## 🔐 How It Works

1. **Frontend** (React) - User interface in browser
2. **Backend** (Express) - Routes all requests to external API
3. **External API** - Ziratech API at `https://mwamunda.ziratech.com/api.php`
4. **Database** - Remote MySQL database via Ziratech

## 📝 User Data Storage

Your login session is stored in browser's localStorage. You'll stay logged in until you:
- Click "Logout" button
- Clear browser cache/storage
- Close private/incognito window

## 🔑 Password Security

Passwords are hashed using SHA256 before being sent to the server. Never share your password!

## 💡 Features

### Login Page
- Email/Password input
- Password visibility toggle
- "Create New Account" button
- "Back to Home" link

### Register Page
- Full name input
- Email address
- Password with confirmation
- Password strength validation
- Auto-redirect to login after success

### Dashboard
- Welcome message with your name
- User statistics (total users, admins)
- User management table
- View user details
- Add new user
- Delete user (ready to implement)
- Logout button

## ❌ Troubleshooting

### "Table name is required" error
- Go to `/admin/init` and initialize the database

### Can't login
- Check your email is correct
- Check password is correct
- Make sure you created an account first

### Forgot password?
- Database doesn't have password reset yet
- Contact administrator to delete and recreate account

### Session lost after refresh
- Check browser allows localStorage
- Try a different browser
- Clear browser cache and try again

## 🔗 API Endpoints

All endpoints start with `/api/auth/`

```
POST /init-users-table        - Initialize users table
POST /register                - Create new account
POST /login                   - Login to account
GET  /users                   - Get all users (admin)
GET  /user/:id                - Get single user
```

## 📚 More Info

For detailed documentation, see: `/docs/ADMIN_SETUP.md`

## 🆘 Support

If you encounter issues:
1. Check the logs in browser console (F12)
2. Check the network tab to see API responses
3. Review the full setup guide at `/docs/ADMIN_SETUP.md`
4. Check Ziratech API is accessible at `https://mwamunda.ziratech.com/api.php`
