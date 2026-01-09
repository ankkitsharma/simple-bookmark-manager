# Simple Bookmark Manager

A full-stack booking management application built with Next.js and Express.js. This project provides a modern web interface for creating and managing bookings with features like date/time selection, guest management, and real-time updates.

## Hosted on:
https://simple-bookmark-manager-client.vercel.app

## 🚀 Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **TanStack Query** - Data fetching and state management
- **Radix UI** - Accessible component primitives
- **Zod** - Schema validation
- **Lucide React** - Icons

### Backend
- **Express.js 5** - Web framework
- **TypeScript** - Type safety
- **Prisma** - ORM with MySQL
- **Zod** - Runtime validation
- **Zod OpenAPI** - OpenAPI schema generation
- **Swagger UI** - API documentation
- **Bun** - JavaScript runtime

## 📁 Project Structure

```
simple-bookmark-manager/
├── client/                 # Next.js frontend application
│   ├── app/               # Next.js app directory
│   ├── components/        # React components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions and API client
│   └── types/             # TypeScript type definitions
│
├── server/                # Express.js backend application
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── routes/        # API route definitions
│   │   ├── lib/           # Core utilities (Prisma, OpenAPI, app factory)
│   │   └── env/           # Environment variable validation
│   └── prisma/            # Prisma schema and migrations
│
└── README.md
```

## 📋 Prerequisites

- **Bun** (v1.2.23 or later) - [Install Bun](https://bun.sh)
- **Node.js** (v20 or later) - For Next.js build process
- **MySQL** - Database server
- **Docker** (optional) - For running MySQL via Docker Compose

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd simple-bookmark-manager
   ```

2. **Install dependencies**

   For the client:
   ```bash
   cd client
   bun install
   ```

   For the server:
   ```bash
   cd server
   bun install
   ```

3. **Set up the database**

   Option A: Using Docker Compose (recommended)
   ```bash
   cd server/prisma
   docker-compose up -d
   ```

   Option B: Use an existing MySQL instance

4. **Configure environment variables**

   Create a `.env` file in the `server` directory:
   ```env
   PORT=8080
   CORS_ORIGINS=http://localhost:3000
   DATABASE_URL="mysql://user:password@localhost:3306/bookings"
   ```

   Create a `.env.local` file in the `client` directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```

5. **Run Prisma migrations**
   ```bash
   cd server
   bunx prisma migrate dev
   ```

## 🏃 Running the Application

### Development Mode

**Start the backend server:**
```bash
cd server
bun run dev
```
The server will run on `http://localhost:8080` (or the port specified in your `.env`).

**Start the frontend client:**
```bash
cd client
bun run dev
```
The client will run on `http://localhost:3000`.

### Production Build

**Build the server:**
```bash
cd server
bun run vercel-build  # or custom build command
```

**Build the client:**
```bash
cd client
bun run build
bun run start
```

## 📚 API Documentation

Once the server is running, you can access the interactive API documentation at:
- **Swagger UI**: `http://localhost:8080/api-docs`
- **OpenAPI JSON**: `http://localhost:8080/api-docs.json`

### API Endpoints

#### Bookings

- `GET /api/v1/bookings` - Get all bookings
- `POST /api/v1/bookings` - Create a new booking

**Create Booking Request:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "date": "2024-12-25T00:00:00Z",
  "time": "19:00",
  "guests": 4
}
```

## 🧪 Testing

Run tests for the server:
```bash
cd server
bun test
```

## 🔧 Development

### Type Generation

The client can generate TypeScript types from the OpenAPI schema:

```bash
cd client
bun run generate:types
```

This fetches the OpenAPI schema from the server and generates TypeScript types in `client/types/bookingSchema.ts`.

### Code Quality

**Linting:**
```bash
# Server
cd server
bun run lint

# Client
cd client
bun run lint
```

**Formatting:**
```bash
# Server
cd server
bun run format
```

## 📦 Database Schema

The application uses Prisma with MySQL. The main model is:

```prisma
model Booking {
  id        String   @id @default(uuid())
  name      String
  email     String
  date      DateTime
  time      String
  guests    Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🌟 Features

- ✅ Create and view bookings
- ✅ Responsive design with dark mode support
- ✅ Form validation with Zod
- ✅ Real-time data fetching with React Query
- ✅ OpenAPI/Swagger documentation
- ✅ Type-safe API client
- ✅ Modern UI with Tailwind CSS

