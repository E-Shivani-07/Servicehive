# Smart Leads Dashboard

A full-stack MERN application for managing leads with role-based access control.

## Tech Stack
- **Frontend:** React, TypeScript, TailwindCSS, Zustand, React Hook Form, Zod
- **Backend:** Node.js, Express, TypeScript, MongoDB, Mongoose, JWT Auth
- **DevOps:** Docker, Docker Compose

## Features
- **Authentication & Authorization**: JWT-based auth with Admin and Sales roles.
- **Lead Management**: Full CRUD operations for leads. Sales users cannot delete leads.
- **Filtering & Pagination**: Server-side pagination, search by name/email, filter by status and source.
- **CSV Export**: Admin users can export filtered leads to a CSV file.
- **Dark Mode**: Toggleable dark/light mode UI.

## Getting Started

### Using Docker (Recommended)
1. Ensure Docker Desktop is running.
2. Run `docker-compose up --build -d` from the root directory.
3. Access the frontend at `http://localhost:8080`
4. Access the backend API at `http://localhost:5000`

### Manual Setup
**Backend**
1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and set your `MONGODB_URI` and `JWT_SECRET`.
4. `npm run dev`

**Frontend**
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## API Documentation
A `postman_collection.json` file is provided in the root directory. Import it into Postman to test the APIs.

## Deployment Instructions
- **Frontend**: Connect the `frontend` folder to Vercel. Add `VITE_API_URL` to environment variables pointing to your backend URL.
- **Backend**: Connect the `backend` folder to Render or Railway. Set environment variables `PORT`, `MONGODB_URI`, and `JWT_SECRET`.
- **Database**: Use a MongoDB Atlas cluster URI for `MONGODB_URI` in production.
