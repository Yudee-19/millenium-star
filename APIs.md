# Diamond Inventory Backend – API Reference

## Base URL

```
http://localhost:5000/api
```
*(Change host/port as per your environment)*

---

## Features

- **TypeScript** - Type-safe development
- **Express.js** - Fast, unopinionated web framework
- **MongoDB & Mongoose** - NoSQL database with ODM
- **Global Error Handling** - Centralized error management
- **Request Logging** - Console and file logs with levels (ERROR, WARN, INFO, DEBUG)
- **Modular Architecture** - Entity-based folder structure
- **Development Tools** - Auto-reload with ts-node-dev

---

## Project Structure

```
server/
├── types/               # TypeScript type definitions
├── utils/               # Utility functions (logger)
├── middleware/          # Express middleware (error handler, logger)
├── config/              # Configuration files (database)
├── diamonds/            # Diamond entity (models, controllers, routes)
├── users/               # User entity (models, controllers, routes)
├── logs/                # Application logs
├── app.ts               # Express app config
├── server.ts            # Server entry point
└── tsconfig.json        # TypeScript configuration
```

---

## Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd diamond-inventory/server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB**
   ```bash
   # Using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   # Or start your local MongoDB instance
   mongod
   ```

5. **Build the project**
   ```bash
   npm run build
   ```

6. **Start the server**
   ```bash
   npm run dev    # Development mode with auto-reload
   npm start      # Production mode
   ```

---

## Available Scripts

- `npm run dev` - Start development server with auto-reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run clean` - Remove build directory

---

## API Endpoints and Usage

### Health Check

- **GET `/health`**  
  *Check API status.*
  ```
  curl http://localhost:5000/api/health
  ```

---

### Diamonds APIs

#### 1. List Diamonds (Paginated)
- **GET `/diamonds`**
- **Query Parameters:** `page`, `limit`, `sortBy`, `sortOrder`
- **Example:**
  ```
  curl "http://localhost:5000/api/diamonds?page=2&limit=5&sortBy=price&sortOrder=asc"
  ```

#### 2. List All Diamonds (No Pagination)
- **GET `/diamonds/all`**
- **Query Parameters:** `sortBy`, `sortOrder`
- **Example:**
  ```
  curl "http://localhost:5000/api/diamonds/all?sortBy=price&sortOrder=desc"
  ```

#### 3. Search Diamonds with Filters
- **GET `/diamonds/search`**
- **Query Parameters:** All below are optional and can be combined:
  - `color`, `clarity`, `cut`, `polish`, `symmetry`, `fluorescence` (string or array)
  - `priceMin`, `priceMax`, `caratMin`, `caratMax`, `lengthMin`, `lengthMax`, `widthMin`, `widthMax`, `depthMin`, `depthMax`, `tableMin`, `tableMax`, `totalDepthMin`, `totalDepthMax`, `discountMin`, `discountMax`, `rapListMin`, `rapListMax`
  - `isAvailable` ("true"/"false")
  - `searchTerm` (certificate number)
- **Example:**
  ```
  curl "http://localhost:5000/api/diamonds/search?color=G&clarity=VS1&priceMin=5000&caratMin=1.0&caratMax=2.0&isAvailable=true"
  ```

#### 4. Get Filter Options
- **GET `/diamonds/filter-options`**
- **Example:**
  ```
  curl http://localhost:5000/api/diamonds/filter-options
  ```

#### 5. Get Diamond by ID
- **GET `/diamonds/:id`**
- **Example:**
  ```
  curl http://localhost:5000/api/diamonds/64a67b1e9c8bca001f2c9f2a
  ```

#### 6. Create Diamond
- **POST `/diamonds`**
- **Body:** JSON object with diamond details (see schema below).
- **Example:**
  ```
  curl -X POST http://localhost:5000/api/diamonds \
    -H "Content-Type: application/json" \
    -d '{ "color": "G", "clarity": "VS1", "carat": 1.2, ... }'
  ```

#### 7. Update Diamond
- **PUT `/diamonds/:id`**
- **Body:** JSON object with updated fields.
- **Example:**
  ```
  curl -X PUT http://localhost:5000/api/diamonds/64a67b1e9c8bca001f2c9f2a \
    -H "Content-Type: application/json" \
    -d '{"price": 6500, ...}'
  ```

#### 8. Delete Diamond
- **DELETE `/diamonds/:id`**
- **Example:**
  ```
  curl -X DELETE http://localhost:5000/api/diamonds/64a67b1e9c8bca001f2c9f2a
  ```

---

### Users APIs

#### 1. List Users
- **GET `/users`**
- **Example:**
  ```
  curl http://localhost:5000/api/users
  ```

#### 2. Get User by ID
- **GET `/users/:id`**
- **Example:**
  ```
  curl http://localhost:5000/api/users/64a67b1e9c8bca001f2c9f11
  ```

#### 3. Create User
- **POST `/users`**
- **Body:** JSON object with user details.
- **Example:**
  ```
  curl -X POST http://localhost:5000/api/users \
    -H "Content-Type: application/json" \
    -d '{ "name": "John Doe", "email": "john@example.com", ... }'
  ```

#### 4. Update User
- **PUT `/users/:id`**
- **Body:** JSON object with updated fields.
- **Example:**
  ```
  curl -X PUT http://localhost:5000/api/users/64a67b1e9c8bca001f2c9f11 \
    -H "Content-Type: application/json" \
    -d '{"email": "newmail@example.com"}'
  ```

#### 5. Delete User
- **DELETE `/users/:id`**
- **Example:**
  ```
  curl -X DELETE http://localhost:5000/api/users/64a67b1e9c8bca001f2c9f11
  ```

---

## Diamond Data Schema

A diamond document (`/diamonds` endpoints) uses the following schema:

```json5
{
  "color": "G",                // [D-Z] (required, enum)
  "clarity": "VS1",            // [FL, IF, VVS1, VVS2, VS1, VS2, SI1, SI2, I1, I2, I3] (required, enum)
  "rapList": 12000,            // Number, Rapaport list price (required)
  "discount": -10,             // Number, Discount in % (required)
  "cut": "EX",                 // [EX, VG, G, F, P] (required, enum)
  "polish": "VG",              // [EX, VG, G, F, P] (required, enum)
  "symmetry": "EX",            // [EX, VG, G, F, P] (required, enum)
  "fluorescence": "FAINT",     // [NON, FAINT, MEDIUM, STRONG, VERY STRONG] (default: NON)
  "measurements": {            // Measurements in mm
    "length": 6.4,             // Number (required)
    "width": 6.3,              // Number (required)
    "depth": 3.9               // Number (required)
  },
  "totalDepth": 62.0,          // Number (%), required, [0-100]
  "table": 57.0,               // Number (%), required, [0-100]
  "certificateNumber": "123ABC456", // String (required, unique)
  "price": 11000,              // Number (required)
  "noBgm": "",                 // String, optional
  "fromTab": "",               // String, optional
  "isAvailable": true,         // Boolean, default: true
  "createdAt": "2025-07-07T15:08:00.000Z", // Date (auto)
  "updatedAt": "2025-07-07T15:08:00.000Z"  // Date (auto)
}
```

---

## API Response Format

All API responses follow this format:

```json
// Success
{
  "success": true,
  "data": {...},
  "message": "Optional message",
  "count": 10   // present on list queries, optional
}

// Error
{
  "success": false,
  "error": "Error message"
}
```

---

## Error Handling

- **Centralized Error Handler**: All errors (including async) are caught and formatted.
- **Validation errors**: Return 400 with details.
- **Duplicate key errors**: Return 400 with field info.
- **Production vs Development**: Stack traces only in development.
- **Logging**: All errors are logged (console and file).

---

## Logging

- **Console Logging**: Colored, detailed output for dev.
- **File Logging**: Daily logs in `/logs`.
- **Error logs**: Separate from success logs.
- **Request Logging**: All HTTP requests are logged.

---

## Configuration

- **Environment Variables** (set in `.env`):
  ```
  PORT=5000
  NODE_ENV=development
  MONGODB_URI=mongodb://localhost:27017/diamond-inventory
  ```
- **TypeScript Settings**: Strict mode, path mapping for cleaner imports.

---

## Adding New Entities

To add a new resource (e.g., "products"):
1. Create `products/` folder with `models/`, `controllers/`, `routes/` subfolders.
2. Define your Mongoose model.
3. Add controller logic.
4. Register routes in `app.ts`.

---

## Development Guidelines

- Use `asyncHandler` for async route handlers.
- Use `CustomError` for operational errors.
- Maintain logging for important operations.
- Use TypeScript interfaces for type safety.
- Follow modular folder structure.

---

## Dependencies

**Production**:  
- `express`
- `mongoose`
- `cors`
- `dotenv`

**Development**:  
- `typescript`
- `ts-node-dev`
- `@types/*`

---

## Contributing

1. Follow the code structure.
2. Add proper TypeScript types.
3. Include error handling.
4. Add logging as needed.
5. Update documentation as needed.

---

## License

ISC License
