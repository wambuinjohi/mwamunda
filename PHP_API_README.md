# PHP API Setup & Deployment Guide

This directory contains the PHP backend files for the Mwamunda Investment Limited application.

## Files Overview

- **api.php** - Main API endpoint (generic CRUD operations for any table)
- **connection.php** - Database connection configuration
- **PHP_API_README.md** - This documentation file

## Current Architecture

The Node.js/Express frontend calls the **external PHP API** at:
```
https://mwamunda.ziratech.com/api.php
```

All database operations (users, contacts, etc.) are handled by this PHP API.

## Local Development Setup

### 1. Configure Database Connection

Edit `connection.php` with your local database credentials:

```php
$servername = "localhost";    // Your database host
$username = "root";           // Your database username
$password = "";               // Your database password
$database = "mwamunda";       // Your database name
```

### 2. Create Database

Create a MySQL database:

```sql
CREATE DATABASE mwamunda;
USE mwamunda;
```

### 3. Test Locally (Optional)

If testing locally with XAMPP/WAMP:
1. Copy `api.php` and `connection.php` to your local web root
2. Update `connection.php` with local database credentials
3. Access via: `http://localhost/api.php?table=users`

## Deployment to Live Server

### Step 1: Upload Files

Upload to your live server's public directory:
- `api.php`
- `connection.php`

### Step 2: Configure Database

Update `connection.php` on the live server with production database credentials:

```php
$servername = "your-db-host.com";
$username = "your-db-username";
$password = "your-db-password";
$database = "mwamunda";
```

### Step 3: Test API

Verify the API works by testing an endpoint:

```bash
# Test with curl
curl -X GET "https://your-domain.com/api.php?table=users"

# Or POST request
curl -X POST "https://your-domain.com/api.php" \
  -H "Content-Type: application/json" \
  -d '{"table":"users","data":{"email":"test@example.com","password":"hash","name":"Test User","role":"user"}}'
```

## API Endpoints & Usage

### 1. CREATE TABLE

```http
POST /api.php
Content-Type: application/json

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

**Response:**
```json
{
  "success": true,
  "message": "Table created successfully"
}
```

### 2. READ (GET)

Get all records:
```http
GET /api.php?table=users
```

Get single record:
```http
GET /api.php?table=users&id=1
```

**Response:**
```json
[
  {
    "id": 1,
    "email": "admin@mwamunda.com",
    "name": "Admin",
    "role": "admin",
    "created_at": "2024-01-15 10:30:00"
  }
]
```

### 3. CREATE (INSERT)

```http
POST /api.php
Content-Type: application/json

{
  "table": "users",
  "data": {
    "email": "user@example.com",
    "password": "hashed_password_here",
    "name": "User Name",
    "role": "user"
  }
}
```

**Response:**
```json
{
  "success": true,
  "id": 2
}
```

### 4. UPDATE

```http
PUT /api.php
Content-Type: application/json

{
  "table": "users",
  "id": 1,
  "data": {
    "name": "Updated Name",
    "role": "admin"
  }
}
```

**Response:**
```json
{
  "success": true
}
```

### 5. DELETE

```http
DELETE /api.php?table=users&id=1
```

**Response:**
```json
{
  "success": true
}
```

## Database Tables

### users
| Column | Type | Notes |
|--------|------|-------|
| id | INT AUTO_INCREMENT PRIMARY KEY | |
| email | VARCHAR(255) UNIQUE NOT NULL | |
| password | VARCHAR(255) NOT NULL | SHA256 hashed |
| name | VARCHAR(255) | |
| role | VARCHAR(50) | 'admin' or 'user' |
| created_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | |
| updated_at | TIMESTAMP | Auto-updated |

### contacts
| Column | Type | Notes |
|--------|------|-------|
| id | INT AUTO_INCREMENT PRIMARY KEY | |
| name | VARCHAR(255) NOT NULL | Contact person name |
| email | VARCHAR(255) NOT NULL | Contact email |
| phone | VARCHAR(50) | Optional phone number |
| subject | VARCHAR(255) NOT NULL | Contact subject |
| message | TEXT NOT NULL | Contact message |
| status | VARCHAR(50) | 'new', 'in_progress', 'resolved' |
| created_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | |
| updated_at | TIMESTAMP | Auto-updated |

## CORS Configuration

The API allows CORS requests with these headers:

```php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
```

⚠️ **For Production:** Consider restricting the origin to your domain:
```php
header("Access-Control-Allow-Origin: https://your-domain.com");
```

## Node.js Backend Configuration

The Node.js/Express backend calls the PHP API via the `API_URL` variable in `server/routes/auth.ts`:

```typescript
const API_URL = "https://mwamunda.ziratech.com/api.php";
```

**To change the API endpoint:**
1. Edit `server/routes/auth.ts`
2. Update the `API_URL` constant to your new PHP API URL
3. Restart the dev server

## Error Handling

All API responses follow standard JSON format:

### Success Response
```json
{
  "success": true,
  "id": 123,
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "error": "Error message describing what went wrong"
}
```

## Security Best Practices

⚠️ **Important for Production:**

1. **Input Validation**
   - Add input validation before processing
   - Sanitize all user inputs

2. **Authentication**
   - Implement token-based authentication
   - Validate user permissions for admin operations

3. **CORS**
   - Restrict to your domain instead of `*`
   - Only allow necessary methods

4. **HTTPS**
   - Always use HTTPS in production
   - Never trust HTTP requests

5. **Database**
   - Use parameterized queries (already implemented)
   - Regular backups
   - Strong credentials

6. **Rate Limiting**
   - Implement rate limiting to prevent abuse

7. **Logging**
   - Log all API requests for audit trail

## Updating the API

When you need to update the API:

1. **Make changes locally** to `api.php` and `connection.php`
2. **Test thoroughly** in development
3. **Push to live server** when ready
4. **Monitor** for any issues

### Common Updates

**Add new table:**
1. Use CREATE TABLE endpoint
2. Verify in database: `SHOW TABLES;`

**Add new column to existing table:**
1. Use MySQL directly: `ALTER TABLE table_name ADD COLUMN ...;`
2. Or recreate table with new schema

**Modify API logic:**
1. Edit `api.php` locally
2. Test all endpoints
3. Deploy to live server

## Troubleshooting

### "Table name is required"
- Ensure `table` parameter is passed in request

### "Failed to fetch users"
- Check if PHP API is reachable
- Verify database connection in `connection.php`
- Check server error logs

### "Data is required" (POST)
- Ensure `data` object is included in request body

### "Column definitions are required"
- When creating table, include `columns` object

### CORS errors
- Verify `api.php` has CORS headers
- Check that request URL matches configured API endpoint

## Support

For issues or questions:
1. Check the error message in the JSON response
2. Review server logs for detailed errors
3. Verify database credentials
4. Test API directly with curl or Postman
