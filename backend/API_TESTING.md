# API Testing Guide

## Base URL
```
http://localhost:5000/api
```

## Authentication Endpoints

### 1. Register User
**POST** `/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "username": "johndoe"
}
```

**Response:** Returns JWT token and user info

---

### 2. Login User
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** Returns JWT token

---

## Project Endpoints

**Note:** All project endpoints (except GET by ID) require JWT token in header:
```
Authorization: Bearer <your-jwt-token>
```

### 3. Get User's Projects
**GET** `/projects`

**Headers:** `Authorization: Bearer <token>`

**Response:** Returns array of user's projects

---

### 4. Get Project by ID
**GET** `/projects/:id`

**Response:** Returns single project

---

### 5. Create Project
**POST** `/projects`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "My Awesome Project",
  "description": "A detailed description of the project",
  "technologies": ["React", "Node.js", "MongoDB"],
  "githubLink": "https://github.com/user/project",
  "liveLink": "https://myproject.com",
  "dateCompleted": "2025-01-15"
}
```

**Response:** Returns created project

---

### 6. Update Project
**PUT** `/projects/:id`

**Headers:** `Authorization: Bearer <token>`

**Request Body:** (same as create)

**Response:** Returns updated project

---

### 7. Delete Project
**DELETE** `/projects/:id`

**Headers:** `Authorization: Bearer <token>`

**Response:** Success message

---

## How to Test

### Using Thunder Client (Recommended for VS Code)
1. Install Thunder Client extension in VS Code
2. Create a new request for each endpoint
3. Add Authorization header with Bearer token

### Using Postman
1. Download Postman
2. Create requests for each endpoint
3. Save token from register/login response
4. Add to Authorization tab (Bearer Token)

### Using cURL
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123","username":"john"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'

# Create Project
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Test","description":"Test project","technologies":["React"]}'
```

---

## Test Flow

1. **Start backend:** `npm run dev` in backend folder
2. **Register** a new user → get JWT token
3. **Login** → verify token works
4. **Create** a project → test with your token
5. **Get** all projects → verify list
6. **Get** single project by ID → verify details
7. **Update** project → modify data
8. **Delete** project → remove project

---
