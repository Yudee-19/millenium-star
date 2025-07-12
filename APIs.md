# Diamond Inventory Backend - API Documentation

This document provides comprehensive information about all the APIs available in the Diamond Inventory backend system.

## Table of Contents
1. [Base Information](#base-information)
2. [Authentication](#authentication)
3. [Diamond APIs](#diamond-apis)
4. [User Management APIs](#user-management-apis)
5. [Admin APIs](#admin-apis)
6. [Error Handling](#error-handling)
7. [Rate Limiting](#rate-limiting)

---

## Base Information

**Base URL:** `http://localhost:8000/api` (or your deployed URL)
**Content-Type:** `application/json`
**Authentication:** Cookie-based JWT tokens (HTTP-only cookies)

### Health Check
```
GET /api/health
```

**Response:**
```json
{
  "success": true,
  "message": "Diamond Inventory API is running",
  "timestamp": "2025-01-12T10:30:00.000Z",
  "environment": "development"
}
```

---

## Authentication

### Register User
```
POST /api/users/register
```

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully. Please complete KYC.",
  "data": {
    "user": {
      "_id": "64a1b2c3d4e5f6789abcdef0",
      "username": "john_doe",
      "email": "john@example.com",
      "status": "DEFAULT",
      "role": "USER",
      "createdAt": "2025-01-12T10:30:00.000Z",
      "updatedAt": "2025-01-12T10:30:00.000Z"
    }
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "User with this email or username already exists"
}
```

### Login User
```
POST /api/users/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "64a1b2c3d4e5f6789abcdef0",
      "username": "john_doe",
      "email": "john@example.com",
      "status": "APPROVED",
      "role": "USER",
      "kyc": {
        "firstName": "John",
        "lastName": "Doe",
        "phoneNumber": "+1234567890",
        "address": {
          "street": "123 Main St",
          "city": "New York",
          "state": "NY",
          "zipCode": "10001",
          "country": "USA"
        },
        "submittedAt": "2025-01-12T10:30:00.000Z"
      },
      "createdAt": "2025-01-12T10:30:00.000Z",
      "updatedAt": "2025-01-12T10:30:00.000Z"
    }
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

### Logout User
```
POST /api/users/logout
```
*Requires Authentication*

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

### Get User Profile
```
GET /api/users/profile
```
*Requires Authentication*

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "64a1b2c3d4e5f6789abcdef0",
      "username": "john_doe",
      "email": "john@example.com",
      "status": "APPROVED",
      "role": "USER",
      "kyc": {
        "firstName": "John",
        "lastName": "Doe",
        "dateOfBirth": "1990-05-15T00:00:00.000Z",
        "phoneNumber": "+1234567890",
        "address": {
          "street": "123 Main St",
          "city": "New York",
          "state": "NY",
          "zipCode": "10001",
          "country": "USA"
        },
        "businessInfo": {
          "companyName": "Tech Corp",
          "businessType": "Technology",
          "registrationNumber": "TC123456"
        },
        "submittedAt": "2025-01-12T10:30:00.000Z"
      },
      "createdAt": "2025-01-12T10:30:00.000Z",
      "updatedAt": "2025-01-12T10:30:00.000Z"
    }
  }
}
```

### Submit KYC
```
POST /api/users/kyc
```
*Requires Authentication*

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "1990-05-15",
  "phoneNumber": "+1234567890",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "businessInfo": {
    "companyName": "Tech Corp",
    "businessType": "Technology",
    "registrationNumber": "TC123456"
  }
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "KYC submitted successfully.",
  "data": {
    "user": {
      "_id": "64a1b2c3d4e5f6789abcdef0",
      "username": "john_doe",
      "email": "john@example.com",
      "status": "PENDING",
      "role": "USER",
      "kyc": {
        "firstName": "John",
        "lastName": "Doe",
        "dateOfBirth": "1990-05-15T00:00:00.000Z",
        "phoneNumber": "+1234567890",
        "address": {
          "street": "123 Main St",
          "city": "New York",
          "state": "NY",
          "zipCode": "10001",
          "country": "USA"
        },
        "businessInfo": {
          "companyName": "Tech Corp",
          "businessType": "Technology",
          "registrationNumber": "TC123456"
        },
        "submittedAt": "2025-01-12T10:30:00.000Z"
      },
      "createdAt": "2025-01-12T10:30:00.000Z",
      "updatedAt": "2025-01-12T10:30:00.000Z"
    }
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "KYC already submitted"
}
```

---

## Diamond APIs

### Get All Diamonds (Paginated)
```
GET /api/diamonds
```

**Query Parameters:**
- `page` (number, default: 1) - Page number
- `limit` (number, default: 10) - Number of records per page
- `sortBy` (string, default: 'createdAt') - Field to sort by
- `sortOrder` (string, default: 'desc') - Sort order ('asc' or 'desc')

**Example:**
```
GET /api/diamonds?page=2&limit=20&sortBy=price&sortOrder=asc
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Diamonds fetched successfully",
  "data": [
    {
      "_id": "64a1b2c3d4e5f6789abcdef0",
      "color": "D",
      "clarity": "FL",
      "rapList": 5000,
      "discount": -10,
      "cut": "EX",
      "polish": "EX",
      "symmetry": "EX",
      "fluorescence": "NON",
      "measurements": {
        "length": 6.5,
        "width": 6.3,
        "depth": 4.2
      },
      "totalDepth": 62.5,
      "table": 57,
      "certificateNumber": "GIA12345678",
      "price": 4500,
      "noBgm": "optional",
      "fromTab": "optional",
      "isAvailable": true,
      "createdAt": "2025-01-12T10:30:00.000Z",
      "updatedAt": "2025-01-12T10:30:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 2,
    "totalPages": 10,
    "totalRecords": 200,
    "recordsPerPage": 20,
    "hasNextPage": true,
    "hasPrevPage": true
  }
}
```

### Get All Diamonds (No Pagination)
```
GET /api/diamonds/all
```

**Query Parameters:**
- `sortBy` (string, default: 'createdAt') - Field to sort by
- `sortOrder` (string, default: 'desc') - Sort order ('asc' or 'desc')

**Success Response (200):**
```json
{
  "success": true,
  "message": "All diamonds fetched successfully",
  "data": [
    {
      "_id": "64a1b2c3d4e5f6789abcdef0",
      "color": "D",
      "clarity": "FL",
      "rapList": 5000,
      "discount": -10,
      "cut": "EX",
      "polish": "EX",
      "symmetry": "EX",
      "fluorescence": "NON",
      "measurements": {
        "length": 6.5,
        "width": 6.3,
        "depth": 4.2
      },
      "totalDepth": 62.5,
      "table": 57,
      "certificateNumber": "GIA12345678",
      "price": 4500,
      "isAvailable": true,
      "createdAt": "2025-01-12T10:30:00.000Z",
      "updatedAt": "2025-01-12T10:30:00.000Z"
    }
  ],
  "totalRecords": 500
}
```

### Search Diamonds with Filters
```
GET /api/diamonds/search
```
*Rate Limited: 50 requests per 15 minutes*

**Query Parameters:**
- **Pagination:**
  - `page` (number, default: 1)
  - `limit` (number, default: 10)
  - `sortBy` (string, default: 'createdAt')
  - `sortOrder` (string, default: 'desc')

- **Basic Filters:**
  - `color` (string or array) - Diamond color (D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z)
  - `clarity` (string or array) - Diamond clarity (FL, IF, VVS1, VVS2, VS1, VS2, SI1, SI2, I1, I2, I3)
  - `cut` (string or array) - Diamond cut (EX, VG, G, F, P)
  - `polish` (string or array) - Polish grade (EX, VG, G, F, P)
  - `symmetry` (string or array) - Symmetry grade (EX, VG, G, F, P)
  - `fluorescence` (string or array) - Fluorescence (NON, FAINT, MEDIUM, STRONG, VERY STRONG)

- **Price Filters:**
  - `priceMin` (number) - Minimum price
  - `priceMax` (number) - Maximum price

- **Size Filters:**
  - `caratMin` (number) - Minimum carat weight
  - `caratMax` (number) - Maximum carat weight

- **Measurement Filters:**
  - `lengthMin` (number) - Minimum length
  - `lengthMax` (number) - Maximum length
  - `widthMin` (number) - Minimum width
  - `widthMax` (number) - Maximum width
  - `depthMin` (number) - Minimum depth
  - `depthMax` (number) - Maximum depth

- **Table and Depth Percentage Filters:**
  - `tableMin` (number) - Minimum table percentage
  - `tableMax` (number) - Maximum table percentage
  - `totalDepthMin` (number) - Minimum total depth percentage
  - `totalDepthMax` (number) - Maximum total depth percentage

- **Discount and Rap List Filters:**
  - `discountMin` (number) - Minimum discount percentage
  - `discountMax` (number) - Maximum discount percentage
  - `rapListMin` (number) - Minimum rap list value
  - `rapListMax` (number) - Maximum rap list value

- **Other Filters:**
  - `isAvailable` (boolean) - Availability status
  - `searchTerm` (string) - Search in certificate number or general search

**Example:**
```
GET /api/diamonds/search?color=D,E,F&clarity=FL,IF&priceMin=1000&priceMax=10000&cut=EX&isAvailable=true&page=1&limit=20
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Diamond search completed successfully",
  "data": [
    {
      "_id": "64a1b2c3d4e5f6789abcdef0",
      "color": "D",
      "clarity": "FL",
      "rapList": 5000,
      "discount": -10,
      "cut": "EX",
      "polish": "EX",
      "symmetry": "EX",
      "fluorescence": "NON",
      "measurements": {
        "length": 6.5,
        "width": 6.3,
        "depth": 4.2
      },
      "totalDepth": 62.5,
      "table": 57,
      "certificateNumber": "GIA12345678",
      "price": 4500,
      "isAvailable": true,
      "createdAt": "2025-01-12T10:30:00.000Z",
      "updatedAt": "2025-01-12T10:30:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalRecords": 95,
    "recordsPerPage": 20,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "appliedFilters": {
    "color": ["D", "E", "F"],
    "clarity": ["FL", "IF"],
    "priceMin": 1000,
    "priceMax": 10000,
    "cut": ["EX"],
    "isAvailable": true
  },
  "totalFilteredRecords": 95
}
```

### Get Filter Options
```
GET /api/diamonds/filter-options
```
*Rate Limited: 50 requests per 15 minutes*

**Success Response (200):**
```json
{
  "success": true,
  "message": "Filter options fetched successfully",
  "data": {
    "colors": ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"],
    "clarities": ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2"],
    "cuts": ["EX", "VG", "G", "F"],
    "polishGrades": ["EX", "VG", "G", "F"],
    "symmetryGrades": ["EX", "VG", "G", "F"],
    "fluorescenceTypes": ["NON", "FAINT", "MEDIUM", "STRONG"],
    "priceRange": {
      "min": 500,
      "max": 50000
    },
    "caratRange": {
      "min": 0.3,
      "max": 5.0
    },
    "discountRange": {
      "min": -50,
      "max": 10
    },
    "rapListRange": {
      "min": 1000,
      "max": 100000
    }
  }
}
```

### Create Diamond
```
POST /api/diamonds/create
```
*Rate Limited: 10 requests per minute*

**Request Body:**
```json
{
  "color": "D",
  "clarity": "FL",
  "rapList": 5000,
  "discount": -10,
  "cut": "EX",
  "polish": "EX",
  "symmetry": "EX",
  "fluorescence": "NON",
  "measurements": {
    "length": 6.5,
    "width": 6.3,
    "depth": 4.2
  },
  "totalDepth": 62.5,
  "table": 57,
  "certificateNumber": "GIA12345678",
  "price": 4500,
  "noBgm": "optional field",
  "fromTab": "optional field",
  "isAvailable": true
}
```

**Required Fields:**
- `color`, `clarity`, `rapList`, `discount`, `cut`, `polish`, `symmetry`, `fluorescence`, `totalDepth`, `table`, `certificateNumber`, `price`
- `measurements` (object with `length`, `width`, `depth`)

**Success Response (201):**
```json
{
  "success": true,
  "message": "Diamond created successfully",
  "data": {
    "_id": "64a1b2c3d4e5f6789abcdef0",
    "color": "D",
    "clarity": "FL",
    "rapList": 5000,
    "discount": -10,
    "cut": "EX",
    "polish": "EX",
    "symmetry": "EX",
    "fluorescence": "NON",
    "measurements": {
      "length": 6.5,
      "width": 6.3,
      "depth": 4.2
    },
    "totalDepth": 62.5,
    "table": 57,
    "certificateNumber": "GIA12345678",
    "price": 4500,
    "isAvailable": true,
    "createdAt": "2025-01-12T10:30:00.000Z",
    "updatedAt": "2025-01-12T10:30:00.000Z"
  }
}
```

**Validation Error Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "color is required",
    "price must be a positive number",
    "measurements.length is required"
  ]
}
```

### Create Multiple Diamonds (Bulk)
```
POST /api/diamonds/bulk-create
```
*Rate Limited: 5 requests per 5 minutes*

**Request Body:**
```json
[
  {
    "color": "D",
    "clarity": "FL",
    "rapList": 5000,
    "discount": -10,
    "cut": "EX",
    "polish": "EX",
    "symmetry": "EX",
    "fluorescence": "NON",
    "measurements": {
      "length": 6.5,
      "width": 6.3,
      "depth": 4.2
    },
    "totalDepth": 62.5,
    "table": 57,
    "certificateNumber": "GIA12345678",
    "price": 4500,
    "isAvailable": true
  },
  {
    "color": "E",
    "clarity": "VVS1",
    "rapList": 4000,
    "discount": -15,
    "cut": "VG",
    "polish": "VG",
    "symmetry": "VG",
    "fluorescence": "FAINT",
    "measurements": {
      "length": 6.2,
      "width": 6.0,
      "depth": 3.9
    },
    "totalDepth": 61.0,
    "table": 58,
    "certificateNumber": "GIA87654321",
    "price": 3400,
    "isAvailable": true
  }
]
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "2 diamonds created successfully",
  "data": [
    {
      "_id": "64a1b2c3d4e5f6789abcdef0",
      "color": "D",
      "clarity": "FL",
      "certificateNumber": "GIA12345678",
      "price": 4500,
      "createdAt": "2025-01-12T10:30:00.000Z"
    },
    {
      "_id": "64a1b2c3d4e5f6789abcdef1",
      "color": "E",
      "clarity": "VVS1",
      "certificateNumber": "GIA87654321",
      "price": 3400,
      "createdAt": "2025-01-12T10:30:00.000Z"
    }
  ],
  "count": 2
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Array of diamond data is required"
}
```

---

## User Management APIs

### Get All Users (Admin Only)
```
GET /api/users
```
*Requires Authentication + Admin Role*

**Query Parameters:**
- `page` (number, default: 1) - Page number
- `limit` (number, default: 10) - Number of records per page
- `sortBy` (string, default: 'createdAt') - Field to sort by
- `sortOrder` (string, default: 'desc') - Sort order ('asc' or 'desc')

**Success Response (200):**
```json
{
  "success": true,
  "message": "Users fetched successfully",
  "data": [
    {
      "_id": "64a1b2c3d4e5f6789abcdef0",
      "username": "john_doe",
      "email": "john@example.com",
      "status": "APPROVED",
      "role": "USER",
      "kyc": {
        "firstName": "John",
        "lastName": "Doe",
        "phoneNumber": "+1234567890",
        "submittedAt": "2025-01-12T10:30:00.000Z"
      },
      "createdAt": "2025-01-12T10:30:00.000Z",
      "updatedAt": "2025-01-12T10:30:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalRecords": 50,
    "recordsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### Get User by ID (Admin Only)
```
GET /api/users/:id
```
*Requires Authentication + Admin Role*

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6789abcdef0",
    "username": "john_doe",
    "email": "john@example.com",
    "status": "APPROVED",
    "role": "USER",
    "kyc": {
      "firstName": "John",
      "lastName": "Doe",
      "dateOfBirth": "1990-05-15T00:00:00.000Z",
      "phoneNumber": "+1234567890",
      "address": {
        "street": "123 Main St",
        "city": "New York",
        "state": "NY",
        "zipCode": "10001",
        "country": "USA"
      },
      "submittedAt": "2025-01-12T10:30:00.000Z"
    },
    "createdAt": "2025-01-12T10:30:00.000Z",
    "updatedAt": "2025-01-12T10:30:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "User not found"
}
```

### Update User (Admin Only)
```
PUT /api/users/:id
```
*Requires Authentication + Admin Role*

**Request Body:**
```json
{
  "username": "updated_username",
  "email": "updated@example.com",
  "status": "APPROVED",
  "role": "USER"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6789abcdef0",
    "username": "updated_username",
    "email": "updated@example.com",
    "status": "APPROVED",
    "role": "USER",
    "createdAt": "2025-01-12T10:30:00.000Z",
    "updatedAt": "2025-01-12T11:00:00.000Z"
  },
  "message": "User updated successfully"
}
```

### Search Users (Admin Only)
```
GET /api/users/search
```
*Requires Authentication + Admin Role*

**Query Parameters:**
- **Pagination:**
  - `page` (number, default: 1)
  - `limit` (number, default: 10)
  - `sortBy` (string, default: 'createdAt')
  - `sortOrder` (string, default: 'desc')

- **Filters:**
  - `status` (string) - User status (DEFAULT, PENDING, APPROVED, REJECTED)
  - `role` (string) - User role (USER, ADMIN)
  - `hasKyc` (boolean) - Whether user has submitted KYC

**Example:**
```
GET /api/users/search?status=PENDING&hasKyc=true&page=1&limit=20
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User search completed successfully",
  "data": [
    {
      "_id": "64a1b2c3d4e5f6789abcdef0",
      "username": "john_doe",
      "email": "john@example.com",
      "status": "PENDING",
      "role": "USER",
      "kyc": {
        "firstName": "John",
        "lastName": "Doe",
        "submittedAt": "2025-01-12T10:30:00.000Z"
      },
      "createdAt": "2025-01-12T10:30:00.000Z",
      "updatedAt": "2025-01-12T10:30:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalRecords": 25,
    "recordsPerPage": 20,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### Create User (Admin Only)
```
POST /api/users/create
```
*Requires Authentication + Admin Role*

**Request Body:**
```json
{
  "username": "new_user",
  "email": "newuser@example.com",
  "password": "password123",
  "role": "USER",
  "status": "APPROVED"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6789abcdef0",
    "username": "new_user",
    "email": "newuser@example.com",
    "status": "APPROVED",
    "role": "USER",
    "createdAt": "2025-01-12T10:30:00.000Z",
    "updatedAt": "2025-01-12T10:30:00.000Z"
  },
  "message": "User created successfully"
}
```

### Delete User (Admin Only)
```
DELETE /api/users/:id
```
*Requires Authentication + Admin Role*

**Success Response (200):**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## Admin APIs

### Get KYC Pending Users
```
GET /api/users/kyc-pending
```
*Requires Authentication + Admin Role*

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64a1b2c3d4e5f6789abcdef0",
      "username": "john_doe",
      "email": "john@example.com",
      "status": "PENDING",
      "role": "USER",
      "kyc": {
        "firstName": "John",
        "lastName": "Doe",
        "dateOfBirth": "1990-05-15T00:00:00.000Z",
        "phoneNumber": "+1234567890",
        "address": {
          "street": "123 Main St",
          "city": "New York",
          "state": "NY",
          "zipCode": "10001",
          "country": "USA"
        },
        "submittedAt": "2025-01-12T10:30:00.000Z"
      },
      "createdAt": "2025-01-12T10:30:00.000Z",
      "updatedAt": "2025-01-12T10:30:00.000Z"
    }
  ],
  "count": 1,
  "message": "Found 1 users with pending KYC"
}
```

### Approve KYC
```
POST /api/users/:id/approve
```
*Requires Authentication + Admin Role*

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6789abcdef0",
    "username": "john_doe",
    "email": "john@example.com",
    "status": "APPROVED",
    "role": "USER",
    "kyc": {
      "firstName": "John",
      "lastName": "Doe",
      "submittedAt": "2025-01-12T10:30:00.000Z"
    },
    "createdAt": "2025-01-12T10:30:00.000Z",
    "updatedAt": "2025-01-12T11:00:00.000Z"
  },
  "message": "User KYC approved successfully"
}
```

### Reject KYC
```
POST /api/users/:id/reject
```
*Requires Authentication + Admin Role*

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6789abcdef0",
    "username": "john_doe",
    "email": "john@example.com",
    "status": "REJECTED",
    "role": "USER",
    "kyc": {
      "firstName": "John",
      "lastName": "Doe",
      "submittedAt": "2025-01-12T10:30:00.000Z"
    },
    "createdAt": "2025-01-12T10:30:00.000Z",
    "updatedAt": "2025-01-12T11:00:00.000Z"
  },
  "message": "User KYC rejected successfully"
}
```

---

## Error Handling

### Common Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message (in development)"
}
```

### HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (Validation errors, invalid input) |
| 401 | Unauthorized (Invalid or missing authentication) |
| 403 | Forbidden (Insufficient permissions) |
| 404 | Not Found (Resource not found) |
| 429 | Too Many Requests (Rate limit exceeded) |
| 500 | Internal Server Error |

### Specific Error Types

**Validation Errors (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "color is required",
    "price must be a positive number"
  ]
}
```

**Authentication Errors (401):**
```json
{
  "success": false,
  "message": "Access token required"
}
```

**Authorization Errors (403):**
```json
{
  "success": false,
  "message": "Admin access required"
}
```

**Rate Limit Errors (429):**
```json
{
  "success": false,
  "message": "Too many requests, please try again later"
}
```

---

## Rate Limiting

The API implements rate limiting on certain endpoints to prevent abuse:

| Endpoint | Limit |
|----------|-------|
| `GET /api/diamonds/search` | 50 requests per 15 minutes |
| `GET /api/diamonds/filter-options` | 50 requests per 15 minutes |
| `POST /api/diamonds/create` | 10 requests per minute |
| `POST /api/diamonds/bulk-create` | 5 requests per 5 minutes |

When rate limit is exceeded, the API returns a 429 status code with an appropriate error message.

---

## Data Models

### Diamond Data Model
```typescript
{
  color: string; // D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z
  clarity: string; // FL, IF, VVS1, VVS2, VS1, VS2, SI1, SI2, I1, I2, I3
  rapList: number;
  discount: number; // -100 to 100
  cut: string; // EX, VG, G, F, P
  polish: string; // EX, VG, G, F, P
  symmetry: string; // EX, VG, G, F, P
  fluorescence: string; // NON, FAINT, MEDIUM, STRONG, VERY STRONG
  measurements: {
    length: number;
    width: number;
    depth: number;
  };
  totalDepth: number; // 0-100
  table: number; // 0-100
  certificateNumber: string;
  price: number;
  noBgm?: string;
  fromTab?: string;
  isAvailable?: boolean; // default: true
  createdAt: Date;
  updatedAt: Date;
}
```

### User Data Model
```typescript
{
  username: string;
  email: string;
  password: string; // hashed
  status: "DEFAULT" | "PENDING" | "APPROVED" | "REJECTED";
  role: "USER" | "ADMIN";
  kyc?: {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    phoneNumber: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    businessInfo?: {
      companyName: string;
      businessType: string;
      registrationNumber: string;
    };
    submittedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

---

## Authentication Flow

1. **Registration:** User registers with username, email, and password
2. **Login:** User logs in with email and password, receives JWT token in HTTP-only cookie
3. **KYC Submission:** User submits KYC information (optional business info)
4. **Admin Approval:** Admin reviews and approves/rejects KYC
5. **Access:** Approved users can access protected endpoints

### User Status Flow
```
DEFAULT → (Submit KYC) → PENDING → (Admin Action) → APPROVED/REJECTED
```

### Role-Based Access
- **USER:** Can access profile, submit KYC, view diamonds
- **ADMIN:** Full access to all endpoints including user management and KYC approval

---

## Notes

1. All authenticated endpoints require a valid JWT token in the `accessToken` HTTP-only cookie
2. Admin endpoints require both authentication and admin role
3. All dates are returned in ISO 8601 format
4. Pagination uses 1-based indexing
5. Array filters support both single values and comma-separated multiple values
6. Rate limiting is applied per IP address
7. CORS is configured to allow credentials (cookies)
8. All endpoints return JSON responses with consistent structure

This documentation covers all available APIs in the Diamond Inventory backend system. For any additional questions or clarifications, please refer to the source code or contact the development team.
