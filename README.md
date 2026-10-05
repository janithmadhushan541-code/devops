# Custom Campus Apparel Hub

Complete starter authentication project for the DevOps Engineering project.

Stack:
- React + Vite frontend
- Node.js + Express backend
- MySQL database
- bcrypt password hashing
- JWT authentication
- USER and ADMIN roles

## 1. Database

Create a MySQL database and run:

`database/schema.sql`

Default demo accounts after running the seed section:
- User: user@campusapparel.com / User@123
- Admin: admin@campusapparel.com / Admin@123

Change these passwords before real deployment.

## 2. Backend

```bash
cd backend
npm install
```

Copy `.env.example` to `.env` and set your MySQL details.

Then:

```bash
npm run dev
```

Backend runs on `http://localhost:5000`.

## 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on the Vite URL shown in the terminal.

The login page is connected to the Express API. After login, USER and ADMIN are routed to different dashboards.

This is a starter project for coursework. For production, add refresh tokens, email verification, rate limiting, CSRF protection where applicable, secure cookie strategy, validation, and stronger operational secrets.
