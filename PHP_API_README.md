# PHP API Setup Guide

This directory contains the PHP backend files (`api.php` and `connection.php`) for the Mwamunda Investment Limited application.

## Files

- **api.php** - Main API handler (generic CRUD operations for any table)
- **connection.php** - Database connection configuration
- **PHP_API_README.md** - This file

## Setup Instructions

### 1. Configure Database Connection

Edit `connection.php` with your database credentials:

```php
$servername = "localhost";    // Your database host
$username = "root";           // Your database username
$password = "";               // Your database password
$database = "mwamunda";       // Your database name
```

### 2. Create Database

Create a MySQL database named `mwamunda` (or whatever name you set in `connection.php`):

```sql
CREATE DATABASE mwamunda;
```

### 3. Deploy to Live Server

1. Upload `api.php` and `connection.php` to your live server's public directory
2. Ensure PHP is enabled on your hosting
3. The API will be accessible at: `https://your-domain.com/api.php`

## API Endpoints

### CREATE TABLE
```
POST /api.php
{
  "table": "users",
  "action": "create_table",
  "columns": {
    "email": "VARCHAR(255) UNIQUE NOT NULL",
    "password": "VARCHAR(255) NOT NULL",
    "name": "VARCHAR(255)",
    "role": "VARCHAR(50) DEFAULT 'user'",
    "created_at": "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
  }
}
```

### READ (GET)
```
GET /api.php?table=users
GET /api.php?table=users&id=1
```

### CREATE (INSERT)
```
POST /api.php
{
  "table": "users",
  "data": {
    "email": "user@example.com",
    "password": "hashed_password",
    "name": "User Name",
    "role": "user"
  }
}
```

### UPDATE
```
PUT /api.php
{
  "table": "users",
  "id": 1,
  "data": {
    "name": "Updated Name",
    "role": "admin"
  }
}
```

### DELETE
```
DELETE /api.php?table=users&id=1
```

## Current Tables

### users
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- email (VARCHAR)
- password (VARCHAR)
- name (VARCHAR)
- role (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### contacts
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- name (VARCHAR)
- email (VARCHAR)
- phone (VARCHAR)
- subject (VARCHAR)
- message (TEXT)
- status (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

## CORS Headers

The API supports CORS with the following headers:
- `Access-Control-Allow-Origin: *` (Allow all origins)
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type`

## Frontend Configuration

The Node.js/Express backend is currently configured to use local in-memory storage for development. To switch to the PHP API:

1. Update the `API_URL` in `server/routes/auth.ts` to point to your live PHP API
2. Redeploy the Node.js backend

Example:
```typescript
const API_URL = "https://your-domain.com/api.php";
```

## Security Notes

⚠️ **Important for Production:**
- Remove `header("Access-Control-Allow-Origin: *")` or restrict to specific domains
- Implement proper authentication/authorization checks
- Use HTTPS for all connections
- Add input validation and SQL injection prevention
- Consider rate limiting
- Implement proper logging and monitoring

## Support

For issues or questions, contact the development team.
