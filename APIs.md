# Diamond Inventory API Documentation

## Overview
This document provides comprehensive documentation for all API endpoints in the Diamond Inventory backend system.

**Base URL:** `/api`

## Authentication
The API uses JWT tokens stored in HTTP-only cookies for authentication. Protected routes require a valid `accessToken` cookie.

### Authentication Responses
All authentication errors return:
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error"
}
```

**Status Codes:**
- `401`: Authentication required / Invalid token / Token expired
- `403`: Admin access required (for admin-only routes)

---

## 1. Health Check

### GET /api/health
Check if the API is running.

**Access:** Public
**Rate Limit:** None

#### Response
**Status:** `200 OK`
```json
{
  "success": true,
  "message": "Diamond Inventory API is running",
  "timestamp": "2025-01-16T10:30:00.000Z",
  "environment": "development"
}
```

**Status:** `500 Internal Server Error`
```json
{
  "success": false,
  "error": "Health check failed"
}
```

---

## 2. Authentication Endpoints (`/api/users`)

### POST /api/users/register
Register a new user account (sends OTP to email).

**Access:** Public
**Rate Limit:** None

#### Request Body
```json
{
  "username": "string (required)",
  "email": "string (required, valid email)",
  "password": "string (required)"
}
```

#### Responses
**Status:** `200 OK`
```json
{
  "success": true,
  "message": "OTP sent to email. Please verify to complete registration."
}
```

**Status:** `400 Bad Request`
```json
{
  "success": false,
  "message": "User with this email or username already exists"
}
```

### POST /api/users/verify-otp
Verify OTP and complete registration.

**Access:** Public
**Rate Limit:** None

#### Request Body
```json
{
  "email": "string (required)",
  "otp": "string (required, 4 digits)"
}
```

#### Responses
**Status:** `201 Created`
```json
{
  "success": true,
  "message": "Registration complete. You are now logged in.",
  "data": {
    "user": {
      "_id": "string",
      "username": "string",
      "email": "string",
      "role": "USER",
      "status": "APPROVED",
      "createdAt": "date",
      "updatedAt": "date"
    }
  }
}
```

**Status:** `400 Bad Request`
```json
{
  "success": false,
  "message": "Invalid OTP" | "OTP expired. Please register again." | "No pending registration found. Please register first."
}
```

### POST /api/users/login
Login user.

**Access:** Public
**Rate Limit:** None

#### Request Body
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

#### Responses
**Status:** `200 OK`
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "string",
      "username": "string",
      "email": "string",
      "role": "USER" | "ADMIN",
      "status": "DEFAULT" | "PENDING" | "APPROVED" | "REJECTED",
      "customerData": "object (if submitted)",
      "quotations": "array (if any)",
      "createdAt": "date",
      "updatedAt": "date"
    }
  }
}
```

**Status:** `401 Unauthorized`
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

### POST /api/users/logout
Logout user (clears authentication cookie).

**Access:** Protected (requires authentication)
**Rate Limit:** None

#### Responses
**Status:** `200 OK`
```json
{
  "success": true,
  "message": "Logout successful"
}
```

### POST /api/users/otp
Send OTP to user's email for password reset.

**Access:** Public
**Rate Limit:** None

#### Request Body
```json
{
  "email": "string (required)"
}
```

#### Responses
**Status:** `200 OK`
```json
{
  "success": true,
  "message": "OTP sent to email"
}
```

**Status:** `404 Not Found`
```json
{
  "success": false,
  "message": "User not found"
}
```

### GET /api/users/profile
Get current user's profile.

**Access:** Protected (requires authentication)
**Rate Limit:** None

#### Responses
**Status:** `200 OK`
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "string",
      "username": "string",
      "email": "string",
      "role": "USER" | "ADMIN",
      "status": "DEFAULT" | "PENDING" | "APPROVED" | "REJECTED",
      "customerData": {
        "firstName": "string",
        "lastName": "string",
        "phoneNumber": "string",
        "countryCode": "string",
        "address": {
          "street": "string",
          "city": "string",
          "state": "string",
          "postalCode": "string",
          "country": "string"
        },
        "businessInfo": {
          "companyName": "string",
          "businessType": "string",
          "vatNumber": "string",
          "websiteUrl": "string (optional)"
        },
        "submittedAt": "date"
      },
      "quotations": [
        {
          "quotationId": "string",
          "carat": "number",
          "noOfPieces": "number",
          "quotePrice": "number",
          "status": "PENDING" | "APPROVED" | "REJECTED",
          "submittedAt": "date"
        }
      ],
      "createdAt": "date",
      "updatedAt": "date"
    }
  }
}
```

### POST /api/users/customer-data
Submit customer data (KYC).

**Access:** Protected (requires authentication, USER role only)
**Rate Limit:** None

#### Request Body
```json
{
  "firstName": "string (required)",
  "lastName": "string (required)",
  "phoneNumber": "string (required)",
  "countryCode": "string (required)",
  "address": {
    "street": "string (required)",
    "city": "string (required)",
    "state": "string (required)",
    "postalCode": "string (required)",
    "country": "string (required)"
  },
  "businessInfo": {
    "companyName": "string (optional)",
    "businessType": "string (optional)",
    "vatNumber": "string (optional)",
    "websiteUrl": "string (optional)"
  }
}
```

#### Responses
**Status:** `200 OK`
```json
{
  "success": true,
  "message": "Customer data submitted successfully.",
  "data": {
    "user": "updated user object"
  }
}
```

**Status:** `400 Bad Request`
```json
{
  "success": false,
  "message": "Customer data already submitted"
}
```

**Status:** `403 Forbidden`
```json
{
  "success": false,
  "message": "Admins are not allowed to submit customer data"
}
```

---

## 3. Admin User Management (`/api/users`)

### GET /api/users
Get all users with pagination.

**Access:** Protected (requires authentication + admin role)
**Rate Limit:** None

#### Query Parameters
- `page`: number (default: 1)
- `limit`: number (default: 10)
- `sortBy`: string (default: 'createdAt')
- `sortOrder`: 'asc' | 'desc' (default: 'desc')

#### Responses
**Status:** `200 OK`
```json
{
  "success": true,
  "message": "Users fetched successfully",
  "data": ["array of user objects"],
  "pagination": {
    "currentPage": "number",
    "totalPages": "number",
    "totalRecords": "number",
    "recordsPerPage": "number",
    "hasNextPage": "boolean",
    "hasPrevPage": "boolean"
  }
}
```

### GET /api/users/search
Search users with filters.

**Access:** Protected (requires authentication + admin role)
**Rate Limit:** None

#### Query Parameters
- `page`: number (default: 1)
- `limit`: number (default: 10)
- `sortBy`: string (default: 'createdAt')
- `sortOrder`: 'asc' | 'desc' (default: 'desc')
- `status`: 'DEFAULT' | 'PENDING' | 'APPROVED' | 'REJECTED'
- `role`: 'USER' | 'ADMIN'
- `hasCustomerData`: 'true' | 'false'

#### Responses
**Status:** `200 OK`
```json
{
  "success": true,
  "message": "User search completed successfully",
  "data": ["array of user objects"],
  "pagination": {
    "currentPage": "number",
    "totalPages": "number",
    "totalRecords": "number",
    "recordsPerPage": "number",
    "hasNextPage": "boolean",
    "hasPrevPage": "boolean"
  }
}
```

### GET /api/users/:id
Get user by ID.

**Access:** Protected (requires authentication + admin role)
**Rate Limit:** None

#### URL Parameters
- `id`: string (required) - User ID

#### Responses
**Status:** `200 OK`
```json
{
  "success": true,
  "data": "user object"
}
```

**Status:** `404 Not Found`
```json
{
  "success": false,
  "message": "User not found"
}
```

### POST /api/users/create
Create a new user.

**Access:** Protected (requires authentication + admin role)
**Rate Limit:** None

#### Request Body
```json
{
  "username": "string (required)",
  "email": "string (required)",
  "password": "string (required)",
  "role": "USER" | "ADMIN" (optional, default: USER),
  "status": "DEFAULT" | "PENDING" | "APPROVED" | "REJECTED" (optional, default: DEFAULT)
}
```

#### Responses
**Status:** `201 Created`
```json
{
  "success": true,
  "data": "created user object",
  "message": "User created successfully"
}
```

### PUT /api/users/:id
Update user by ID.

**Access:** Protected (requires authentication + admin role)
**Rate Limit:** None

#### URL Parameters
- `id`: string (required) - User ID

#### Request Body
```json
{
  "username": "string (optional)",
  "email": "string (optional)",
  "role": "USER" | "ADMIN" (optional),
  "status": "DEFAULT" | "PENDING" | "APPROVED" | "REJECTED" (optional)",
  "customerData": "object (optional)"
}
```

#### Responses
**Status:** `200 OK`
```json
{
  "success": true,
  "data": "updated user object",
  "message": "User updated successfully"
}
```

**Status:** `404 Not Found`
```json
{
  "success": false,
  "message": "User not found"
}
```

### DELETE /api/users/:id
Delete user by ID.

**Access:** Protected (requires authentication + admin role)
**Rate Limit:** None

#### URL Parameters
- `id`: string (required) - User ID

#### Responses
**Status:** `200 OK`
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

**Status:** `404 Not Found`
```json
{
  "success": false,
  "message": "User not found"
}
```

### GET /api/users/customer-data-pending
Get users with pending customer data.

**Access:** Protected (requires authentication + admin role)
**Rate Limit:** None

#### Responses
**Status:** `200 OK`
```json
{
  "success": true,
  "data": ["array of users with pending customer data"],
  "count": "number",
  "message": "Found X users with pending customer data"
}
```

### POST /api/users/:id/approve-customer-data
Approve user's customer data.

**Access:** Protected (requires authentication + admin role)
**Rate Limit:** None

#### URL Parameters
- `id`: string (required) - User ID

#### Responses
**Status:** `200 OK`
```json
{
  "success": true,
  "data": "updated user object",
  "message": "User customer data approved successfully"
}
```

### POST /api/users/:id/reject-customer-data
Reject user's customer data.

**Access:** Protected (requires authentication + admin role)
**Rate Limit:** None

#### URL Parameters
- `id`: string (required) - User ID

#### Responses
**Status:** `200 OK`
```json
{
  "success": true,
  "data": "updated user object",
  "message": "User customer data rejected successfully"
}
```

---

## 4. Diamond Management (`/api/diamonds`)

### GET /api/diamonds
Get all diamonds with pagination.

**Access:** Public
**Rate Limit:** None

#### Query Parameters
- `page`: number (default: 1)
- `limit`: number (default: 10)
- `sortBy`: string (default: 'createdAt')
- `sortOrder`: 'asc' | 'desc' (default: 'desc')

#### Responses
**Status:** `200 OK`
```json
{
  "success": true,
  "message": "Diamonds fetched successfully",
  "data": ["array of diamond objects"],
  "pagination": {
    "currentPage": "number",
    "totalPages": "number",
    "totalRecords": "number",
    "recordsPerPage": "number",
    "hasNextPage": "boolean",
    "hasPrevPage": "boolean"
  }
}
```

**Status:** `500 Internal Server Error`
```json
{
  "success": false,
  "message": "Failed to fetch diamonds",
  "error": "error message"
}
```

### GET /api/diamonds/all
Get all diamonds without pagination.

**Access:** Public
**Rate Limit:** None

#### Query Parameters
- `sortBy`: string (default: 'createdAt')
- `sortOrder`: 'asc' | 'desc' (default: 'desc')

#### Responses
**Status:** `200 OK`
```json
{
  "success": true,
  "message": "All diamonds fetched successfully",
  "data": ["array of all diamond objects"],
  "totalRecords": "number"
}
```

### GET /api/diamonds/search
Search diamonds with advanced filters.

**Access:** Public
**Rate Limit:** 50 requests per 15 minutes

#### Query Parameters

**Pagination:**
- `page`: number (default: 1)
- `limit`: number (default: 10)
- `sortBy`: string (default: 'createdAt')
- `sortOrder`: 'asc' | 'desc' (default: 'desc')

**Filters:**
- `color`: string | string[] - Diamond color (D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z)
- `clarity`: string | string[] - Diamond clarity (FL, IF, VVS1, VVS2, VS1, VS2, SI1, SI2, I1, I2, I3)
- `cut`: string | string[] - Cut grade (EX, VG, G, F, P)
- `polish`: string | string[] - Polish grade (EX, VG, G, F, P)
- `symmetry`: string | string[] - Symmetry grade (EX, VG, G, F, P)
- `fluorescence`: string | string[] - Fluorescence (NON, FAINT, MEDIUM, STRONG, VERY STRONG)
- `shape`: string - Diamond shape
- `notShape`: string - Exclude this shape
- `priceMin`: number - Minimum price
- `priceMax`: number - Maximum price
- `sizeMin`: boolean - If true, size < 1 carat
- `sizeMax`: boolean - If true, size >= 1 carat
- `lengthMin`: number - Minimum length
- `lengthMax`: number - Maximum length
- `widthMin`: number - Minimum width
- `widthMax`: number - Maximum width
- `depthMin`: number - Minimum depth
- `depthMax`: number - Maximum depth
- `tableMin`: number - Minimum table percentage
- `tableMax`: number - Maximum table percentage
- `totalDepthMin`: number - Minimum total depth percentage
- `totalDepthMax`: number - Maximum total depth percentage
- `discountMin`: number - Minimum discount percentage
- `discountMax`: number - Maximum discount percentage
- `rapListMin`: number - Minimum rap list price
- `rapListMax`: number - Maximum rap list price
- `isAvailable`: boolean - Availability filter
- `searchTerm`: string - Search term for certificate number or general search

#### Responses
**Status:** `200 OK`
```json
{
  "success": true,
  "message": "Diamond search completed successfully",
  "data": ["array of filtered diamond objects"],
  "pagination": {
    "currentPage": "number",
    "totalPages": "number",
    "totalRecords": "number",
    "recordsPerPage": "number",
    "hasNextPage": "boolean",
    "hasPrevPage": "boolean"
  },
  "appliedFilters": "object with applied filters",
  "totalFilteredRecords": "number"
}
```

### GET /api/diamonds/filter-options
Get available filter options for UI dropdowns.

**Access:** Public
**Rate Limit:** 50 requests per 15 minutes

#### Responses
**Status:** `200 OK`
```json
{
  "success": true,
  "message": "Filter options fetched successfully",
  "data": {
    "colors": ["array of available colors"],
    "clarities": ["array of available clarities"],
    "cuts": ["array of available cuts"],
    "polishGrades": ["array of available polish grades"],
    "symmetryGrades": ["array of available symmetry grades"],
    "fluorescenceTypes": ["array of available fluorescence types"],
    "priceRange": {
      "min": "number",
      "max": "number"
    },
    "caratRange": {
      "min": "number",
      "max": "number"
    },
    "discountRange": {
      "min": "number",
      "max": "number"
    },
    "rapListRange": {
      "min": "number",
      "max": "number"
    }
  }
}
```

### POST /api/diamonds/create
Create a new diamond.

**Access:** Public
**Rate Limit:** 10 requests per minute

#### Request Body
```json
{
  "color": "string (required) - D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z",
  "clarity": "string (required) - FL,IF,VVS1,VVS2,VS1,VS2,SI1,SI2,I1,I2,I3",
  "rapList": "number (required) - >= 0",
  "discount": "number (required) - between -100 and 100",
  "cut": "string (required) - EX,VG,G,F,P",
  "polish": "string (required) - EX,VG,G,F,P",
  "symmetry": "string (required) - EX,VG,G,F,P",
  "fluorescence": "string (required) - NON,FAINT,MEDIUM,STRONG,VERY STRONG",
  "lab": "string (optional)",
  "shape": "string (optional)",
  "measurements": {
    "length": "number (required) - > 0",
    "width": "number (required) - > 0",
    "depth": "number (required) - > 0"
  },
  "totalDepth": "number (required) - > 0 and <= 100",
  "table": "number (required) - > 0 and <= 100",
  "certificateNumber": "string (required) - non-empty",
  "price": "number (required) - >= 0",
  "isAvailable": "boolean (optional, default: true)",
  "noBgm": "string (optional)",
  "fromTab": "string (optional)"
}
```

#### Responses
**Status:** `201 Created`
```json
{
  "success": true,
  "message": "Diamond created successfully",
  "data": "created diamond object"
}
```

**Status:** `400 Bad Request`
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": ["array of validation error messages"]
}
```

**Status:** `500 Internal Server Error`
```json
{
  "success": false,
  "message": "Failed to create diamond",
  "error": "error message"
}
```

### POST /api/diamonds/bulk-create
Create multiple diamonds in bulk.

**Access:** Public
**Rate Limit:** 5 requests per 5 minutes

#### Request Body
```json
[
  {
    "color": "string (required)",
    "clarity": "string (required)",
    // ... other diamond properties (same as single create)
  },
  // ... more diamond objects
]
```

#### Responses
**Status:** `201 Created`
```json
{
  "success": true,
  "message": "X diamonds created successfully",
  "data": ["array of created diamond objects"],
  "count": "number"
}
```

**Status:** `400 Bad Request`
```json
{
  "success": false,
  "message": "Array of diamond data is required"
}
```

### PUT /api/diamonds/:id
Update a diamond by ID.

**Access:** Public
**Rate Limit:** 10 requests per minute

#### URL Parameters
- `id`: string (required) - Diamond ID

#### Request Body
```json
{
  // Any diamond properties (partial update)
  // Same validation rules as create, but all fields are optional
  "color": "string (optional)",
  "clarity": "string (optional)",
  "price": "number (optional)",
  // ... other properties
}
```

#### Responses
**Status:** `200 OK`
```json
{
  "success": true,
  "message": "Diamond updated successfully",
  "data": "updated diamond object"
}
```

**Status:** `400 Bad Request`
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": ["array of validation error messages"]
}
```

**Status:** `404 Not Found`
```json
{
  "success": false,
  "message": "Diamond not found"
}
```

### DELETE /api/diamonds/:id
Delete a diamond by ID.

**Access:** Public
**Rate Limit:** 10 requests per minute

#### URL Parameters
- `id`: string (required) - Diamond ID

#### Responses
**Status:** `200 OK`
```json
{
  "success": true,
  "message": "Diamond deleted successfully"
}
```

**Status:** `404 Not Found`
```json
{
  "success": false,
  "message": "Diamond not found"
}
```

---

## 5. Quotation Management (`/api/quotations`)

### POST /api/quotations
Submit quotation(s) - user can submit single quotation or array of quotations.

**Access:** Protected (requires authentication, USER role only)
**Rate Limit:** None

#### Request Body (Single Quotation)
```json
{
  "carat": "number (required) - > 0",
  "noOfPieces": "number (required) - > 0",
  "quotePrice": "number (required) - > 0"
}
```

#### Request Body (Multiple Quotations)
```json
[
  {
    "carat": "number (required)",
    "noOfPieces": "number (required)",
    "quotePrice": "number (required)"
  },
  // ... more quotation objects
]
```

#### Responses
**Status:** `201 Created` (All successful)
```json
{
  "message": "Quotation submitted successfully" | "Quotations submitted successfully",
  "quotation": "single quotation object" | ["array of quotation objects"]
}
```

**Status:** `207 Multi-Status` (Partial success)
```json
{
  "message": "Some quotations submitted successfully",
  "quotation": ["array of successful quotations"],
  "duplicates": [
    {
      "index": "number",
      "quotation": "duplicate quotation object"
    }
  ],
  "errors": [
    {
      "index": "number",
      "quotation": "failed quotation object",
      "error": "error message"
    }
  ],
  "partialSuccess": true
}
```

**Status:** `400 Bad Request` (All failed)
```json
{
  "message": "Failed to submit quotation(s)",
  "errors": [
    {
      "index": "number",
      "quotation": "failed quotation object",
      "error": "error message"
    }
  ]
}
```

**Status:** `401 Unauthorized`
```json
{
  "error": "User not authenticated"
}
```

**Status:** `403 Forbidden`
```json
{
  "error": "Admins cannot submit quotations. Only regular users can submit quotations."
}
```

### GET /api/quotations
Get quotations - admin can view all users with quotations or specific user's quotations.

**Access:** Protected (requires authentication + admin role)
**Rate Limit:** None

#### Query Parameters
- `userId`: string (optional) - Get quotations for specific user

#### Responses (Without userId)
**Status:** `200 OK`
```json
{
  "message": "Users with quotations retrieved successfully",
  "data": {
    "users": [
      {
        "userId": "string",
        "username": "string",
        "email": "string",
        "quotationCount": "number",
        "quotations": [
          {
            "quotationId": "string",
            "carat": "number",
            "noOfPieces": "number",
            "quotePrice": "number",
            "status": "PENDING" | "APPROVED" | "REJECTED",
            "submittedAt": "date"
          }
        ]
      }
    ],
    "summary": {
      "totalUsers": "number",
      "totalQuotations": "number"
    }
  }
}
```

#### Responses (With userId)
**Status:** `200 OK`
```json
{
  "message": "User quotations retrieved successfully",
  "data": {
    "userId": "string",
    "username": "string",
    "email": "string",
    "quotations": ["array of quotation objects"]
  }
}
```

### GET /api/quotations/:quotationId
Get specific quotation details.

**Access:** Protected (requires authentication + admin role)
**Rate Limit:** None

#### URL Parameters
- `quotationId`: string (required) - Quotation ID

#### Responses
**Status:** `200 OK`
```json
{
  "message": "Quotation retrieved successfully",
  "data": {
    "quotation": {
      "quotationId": "string",
      "carat": "number",
      "noOfPieces": "number",
      "quotePrice": "number",
      "status": "PENDING" | "APPROVED" | "REJECTED",
      "submittedAt": "date"
    },
    "user": {
      "userId": "string",
      "username": "string",
      "email": "string"
    }
  }
}
```

**Status:** `400 Bad Request`
```json
{
  "error": "Quotation ID is required"
}
```

**Status:** `404 Not Found`
```json
{
  "error": "Quotation not found"
}
```

### POST /api/quotations/:quotationId/approve
Approve a quotation.

**Access:** Protected (requires authentication + admin role)
**Rate Limit:** None

#### URL Parameters
- `quotationId`: string (required) - Quotation ID

#### Responses
**Status:** `200 OK`
```json
{
  "message": "Quotation approved successfully",
  "quotation": {
    "quotationId": "string",
    "carat": "number",
    "noOfPieces": "number",
    "quotePrice": "number",
    "status": "APPROVED",
    "submittedAt": "date"
  }
}
```

**Status:** `400 Bad Request`
```json
{
  "error": "Quotation ID is required"
}
```

**Status:** `404 Not Found`
```json
{
  "error": "Quotation not found"
}
```

### POST /api/quotations/:quotationId/reject
Reject a quotation.

**Access:** Protected (requires authentication + admin role)
**Rate Limit:** None

#### URL Parameters
- `quotationId`: string (required) - Quotation ID

#### Responses
**Status:** `200 OK`
```json
{
  "message": "Quotation rejected successfully",
  "quotation": {
    "quotationId": "string",
    "carat": "number",
    "noOfPieces": "number",
    "quotePrice": "number",
    "status": "REJECTED",
    "submittedAt": "date"
  }
}
```

**Status:** `400 Bad Request`
```json
{
  "error": "Quotation ID is required"
}
```

**Status:** `404 Not Found`
```json
{
  "error": "Quotation not found"
}
```

---

## Data Models

### Diamond Object
```json
{
  "_id": "string",
  "color": "string (D-Z)",
  "clarity": "string (FL,IF,VVS1,VVS2,VS1,VS2,SI1,SI2,I1,I2,I3)",
  "rapList": "number",
  "discount": "number (-100 to 100)",
  "cut": "string (EX,VG,G,F,P)",
  "polish": "string (EX,VG,G,F,P)",
  "symmetry": "string (EX,VG,G,F,P)",
  "fluorescence": "string (NON,FAINT,MEDIUM,STRONG,VERY STRONG)",
  "lab": "string",
  "shape": "string",
  "measurements": {
    "length": "number",
    "width": "number",
    "depth": "number"
  },
  "totalDepth": "number",
  "table": "number",
  "certificateNumber": "string",
  "price": "number",
  "size": "number (optional)",
  "isAvailable": "boolean",
  "noBgm": "string (optional)",
  "fromTab": "string (optional)",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### User Object
```json
{
  "_id": "string",
  "username": "string",
  "email": "string",
  "role": "USER | ADMIN",
  "status": "DEFAULT | PENDING | APPROVED | REJECTED",
  "customerData": {
    "firstName": "string",
    "lastName": "string",
    "phoneNumber": "string",
    "countryCode": "string",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "postalCode": "string",
      "country": "string"
    },
    "businessInfo": {
      "companyName": "string",
      "businessType": "string",
      "vatNumber": "string",
      "websiteUrl": "string"
    },
    "submittedAt": "date"
  },
  "quotations": [
    {
      "quotationId": "string",
      "carat": "number",
      "noOfPieces": "number",
      "quotePrice": "number",
      "status": "PENDING | APPROVED | REJECTED",
      "submittedAt": "date"
    }
  ],
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Quotation Object
```json
{
  "quotationId": "string",
  "carat": "number",
  "noOfPieces": "number",
  "quotePrice": "number",
  "status": "PENDING | APPROVED | REJECTED",
  "submittedAt": "date"
}
```

---

## Rate Limiting

The following endpoints have rate limiting:

- **Diamond Search:** `GET /api/diamonds/search` - 50 requests per 15 minutes
- **Filter Options:** `GET /api/diamonds/filter-options` - 50 requests per 15 minutes
- **Create Diamond:** `POST /api/diamonds/create` - 10 requests per minute
- **Bulk Create:** `POST /api/diamonds/bulk-create` - 5 requests per 5 minutes
- **Update Diamond:** `PUT /api/diamonds/:id` - 10 requests per minute
- **Delete Diamond:** `DELETE /api/diamonds/:id` - 10 requests per minute

Rate limit responses return:
```json
{
  "success": false,
  "message": "Too many requests, please try again later."
}
```

---

## Error Handling

### Global Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message (in development mode)"
}
```

### Common HTTP Status Codes
- `200`: Success
- `201`: Created
- `207`: Multi-Status (partial success)
- `400`: Bad Request (validation errors, missing required fields)
- `401`: Unauthorized (authentication required/failed)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found (resource not found)
- `500`: Internal Server Error (server-side errors)

### Validation Errors
Validation errors return detailed error arrays:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Field 'color' is required",
    "Price must be greater than or equal to 0",
    "Cut must be EX, VG, G, F, or P"
  ]
}
```

---

## Notes

1. **Authentication:** JWT tokens are stored in HTTP-only cookies (`accessToken`) with 7-day expiration.

2. **CORS:** The API supports CORS with credentials enabled for cross-origin requests.

3. **Request/Response Format:** All requests and responses use JSON format.

4. **Pagination:** Uses standard pagination with `page` and `limit` parameters. Returns pagination metadata with results.

5. **Timestamps:** All timestamps are in ISO 8601 format.

6. **User Roles:** 
   - `USER`: Regular user who can submit quotations and manage their profile
   - `ADMIN`: Administrator with full access to user management and quotation approval

7. **User Status:**
   - `DEFAULT`: Initial user status
   - `PENDING`: Customer data submitted, awaiting admin approval
   - `APPROVED`: Customer data approved by admin
   - `REJECTED`: Customer data rejected by admin

8. **Quotation Status:**
   - `PENDING`: Awaiting admin review
   - `APPROVED`: Approved by admin
   - `REJECTED`: Rejected by admin
