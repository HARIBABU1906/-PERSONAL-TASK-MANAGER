# Backend Documentation

## Overview

The backend is built with Express.js and MongoDB, providing RESTful API endpoints for user authentication and task management.

## Project Structure

```
server/
├── controllers/
│   ├── authController.js      # Authentication logic
│   └── taskController.js      # Task CRUD operations
├── models/
│   ├── User.js               # User schema
│   └── Task.js               # Task schema
├── routes/
│   ├── auth.js               # Auth routes
│   └── tasks.js              # Task routes
├── middleware/
│   └── auth.js               # JWT & error handling
├── config/
│   └── database.js           # MongoDB connection
├── app.js                    # Express app setup
├── package.json
└── .env
```

## API Endpoints

### Authentication Routes (`/api/auth`)

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}

Response (201):
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "userId",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response (200):
{
  "success": true,
  "message": "User logged in successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "userId",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

### Task Routes (`/api/tasks`)

**All task routes require JWT token in Authorization header:**
```
Authorization: Bearer <token>
```

#### Get All Tasks
```
GET /api/tasks

Response (200):
{
  "success": true,
  "count": 5,
  "tasks": [
    {
      "_id": "taskId",
      "title": "Complete project",
      "description": "Finish the MERN project",
      "status": "in-progress",
      "priority": "high",
      "dueDate": "2024-02-15",
      "user": "userId",
      "createdAt": "2024-01-22T10:00:00Z",
      "updatedAt": "2024-01-22T10:00:00Z"
    }
  ]
}
```

#### Create Task
```
POST /api/tasks
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "New Task",
  "description": "Task description",
  "priority": "medium",
  "dueDate": "2024-02-20"
}

Response (201):
{
  "success": true,
  "message": "Task created successfully",
  "task": { ... }
}
```

#### Update Task
```
PUT /api/tasks/:id
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "Updated Task",
  "status": "completed",
  "priority": "low"
}

Response (200):
{
  "success": true,
  "message": "Task updated successfully",
  "task": { ... }
}
```

#### Delete Task
```
DELETE /api/tasks/:id
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Task deleted successfully"
}
```

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing/invalid token)
- `404` - Not Found
- `500` - Server Error

Error Response Format:
```json
{
  "success": false,
  "message": "Error description"
}
```

## Database Schemas

### User Schema
- **username**: String (unique, min 3 characters)
- **email**: String (unique, valid email format)
- **password**: String (min 6 characters, hashed)
- **timestamps**: createdAt, updatedAt

### Task Schema
- **title**: String (required, max 100 characters)
- **description**: String (optional, max 500 characters)
- **status**: String (enum: 'pending', 'in-progress', 'completed')
- **priority**: String (enum: 'low', 'medium', 'high')
- **dueDate**: Date (optional)
- **user**: ObjectId (reference to User)
- **timestamps**: createdAt, updatedAt

## Authentication Flow

1. User registers with username, email, and password
2. Password is hashed using bcryptjs (salt rounds: 10)
3. JWT token is generated with 30-day expiration
4. User logs in with email and password
5. Password is compared with hashed version
6. JWT token is issued
7. Token is included in Authorization header for protected routes
8. Middleware verifies token before accessing protected endpoints

## Middleware

### Authentication Middleware (`protect`)
- Extracts JWT token from Authorization header
- Verifies token validity
- Attaches user data to request object
- Returns 401 error if token is invalid or missing

### Error Handler Middleware (`errorHandler`)
- Catches and formats errors
- Handles MongoDB validation errors
- Handles duplicate key errors
- Returns formatted error responses

## Environment Variables

```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/db
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=development
```

## Dependencies

```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.0",
  "jsonwebtoken": "^9.1.2",
  "bcryptjs": "^2.4.3",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "express-validator": "^7.0.0"
}
```

## Development Dependencies

```json
{
  "nodemon": "^3.0.2"
}
```

## Best Practices Implemented

1. **Security**
   - Password hashing with bcrypt
   - JWT token authentication
   - Environment variables for sensitive data
   - CORS configuration

2. **Code Organization**
   - Separation of concerns (controllers, models, routes)
   - Middleware for cross-cutting concerns
   - Configuration in separate files

3. **Error Handling**
   - Try-catch blocks in controllers
   - Centralized error handler middleware
   - Meaningful error messages

4. **Data Validation**
   - Mongoose schema validation
   - Required field validation
   - Email format validation
   - Password requirements

5. **Performance**
   - Efficient database queries
   - Proper indexing on unique fields
   - Lean queries where possible
