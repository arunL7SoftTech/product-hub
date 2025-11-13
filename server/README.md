# Products API Server

Node.js + Express backend for the React products management UI. Provides CRUD endpoints backed by MongoDB.

## Prerequisites

- Node.js 18+
- npm 9+ (comes with Node)
- MongoDB running locally (`mongodb://localhost:27017`) or a connection string to MongoDB Atlas

## Setup

1. Install dependencies:

   ```bash
   cd server
   npm install
   ```

2. Create a `.env` file by copying `env.sample` and updating the values:

   ```bash
   cp env.sample .env
   ```

| Variable      | Description                               | Default                               |
| ------------- | ----------------------------------------- | ------------------------------------- |
| `PORT`            | Port to run the API server on             | `5000`                                    |
| `MONGODB_URI`     | MongoDB connection string                 | `mongodb://127.0.0.1:27017/products_app` |
| `CLIENT_URL`      | Allowed CORS origins (comma separated)    | `http://localhost:5175`                   |
| `USE_IN_MEMORY_DB`| Fall back to in-memory MongoDB when real DB is unavailable (dev only) | `true` |

3. Start MongoDB (optional when using in-memory fallback):

   - **Local installation** (Windows service):

     ```powershell
     net start MongoDB
     ```

   - **Manual run** (if no service configured):

     ```powershell
     "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath "C:\data\db"
     ```

   - **MongoDB Atlas**: update `MONGODB_URI` with your connection string (e.g. `mongodb+srv://...`).

   If you leave `USE_IN_MEMORY_DB=true` and MongoDB is not running, the server will automatically spin up an ephemeral in-memory database so you can keep working. Set `USE_IN_MEMORY_DB=false` in production or when you want to ensure the real database is used.

## Run the server

```bash
npm run dev
```

This starts the API with `nodemon` on `http://localhost:5000`.

Use `npm start` to run without hot reload (production mode).

## Frontend configuration

In the React app root, create `products-app/.env` (if it doesn't exist) and ensure it points to the backend:

```bash
VITE_API_URL=http://localhost:5000
```

Restart Vite after changing env vars.

## API Endpoints

| Method | Endpoint            | Description          |
| ------ | ------------------- | -------------------- |
| GET    | `/api/products`     | List all products    |
| GET    | `/api/products/:id` | Get product by ID    |
| POST   | `/api/products`     | Create new product   |
| PUT    | `/api/products/:id` | Update existing item |
| DELETE | `/api/products/:id` | Delete product       |

### Example Product Payload

```json
{
  "name": "Wireless Mouse",
  "description": "Compact mouse with Bluetooth",
  "price": 49.99,
  "category": "Accessories",
  "stock": 20,
  "image": "https://example.com/mouse.jpg"
}
```

All routes respond with JSON. Validation errors return HTTP `400` with field-level error details.

