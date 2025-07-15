# Book Tracker

A full-stack web application that allows users to track, manage, and share their personal book library. Users can add books, organize them by status, leave reviews, and suggest books to friends. The project emphasizes full-stack development best practices with a clean UI, modular backend, and real-time communication.

## Project Overview

This project is built to practice modern full-stack development, featuring:

- **Frontend:** React (with TypeScript)
- **Backend:** ASP.NET Core Web API
- **Database:** PostgreSQL
- **Authentication:** JWT-based
- **Real-time Communication:** WebSockets
- **Others:** Axios, Swagger, Docker, Responsive UI

---

## Features

### Current Features

#### User

- Secure registration and login
- JWT-based authenticated sessions
- View profile info (email, username, registration date)
- Deactivate account

#### Book Management

- Add, edit, delete, and view books
- Organize books by status: `Reading`, `Completed`, `Wishlist`
- Optional review and rating (1–5)
- Cover image upload support
- Filter and search books
- Favorite books feature
- Pagination and dashboard carousel

#### Suggestions System

- Suggest books to friends
- Real-time delivery via WebSockets (STOMP)
- Fallback to email if user is not registered

#### Data Visualization

- Key attributes-based charts
- Monthly book completion and addition graphs

#### About Page

- Displays purpose of the app and credits
- Custom-designed icon and layout

#### UI/UX

- Fully responsive interface
- Light/Dark mode toggle
- Clean dashboard with filters and status indicators
- Personalized greeting
- Book and user detail pages

---

## Future Roadmap

- Mobile app using **React Native**
- Optional **Progressive Web App (PWA)** support

---

## Tech Stack

| Layer     | Technology                             |
| --------- | -------------------------------------- |
| Frontend  | React, Axios, React Router, TypeScript |
| Backend   | ASP.NET Core Web API                   |
| Database  | PostgreSQL                             |
| ORM       | Entity Framework Core                  |
| Auth      | JWT                                    |
| Real-time | WebSockets (STOMP)                     |
| Tools     | Swagger, Postman, Docker               |

---

## API Base Overview

### Auth

| Method | Endpoint             | Description          |
| ------ | -------------------- | -------------------- |
| POST   | `/api/auth/register` | Register a new user  |
| POST   | `/api/auth/login`    | Log in (returns JWT) |

### Books (Protected)

| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| GET    | `/api/books`      | Get user's books |
| POST   | `/api/books`      | Add a new book   |
| PUT    | `/api/books/{id}` | Edit a book      |
| DELETE | `/api/books/{id}` | Delete a book    |

### User

| Method | Endpoint                | Description              |
| ------ | ----------------------- | ------------------------ |
| GET    | `/api/users/me`         | Get current user details |
| PUT    | `/api/users/deactivate` | Deactivate user profile  |

---

## Base Pages & Routes

| Route        | Page Description            |
| ------------ | --------------------------- |
| `/register`  | User registration           |
| `/login`     | User login                  |
| `/dashboard` | Main dashboard with filters |
| `/add`       | Add a new book              |
| `/edit/:id`  | Edit existing book          |
| `/book/:id`  | Book detail page            |
| `/profile`   | User profile page           |
| `/about`     | About page with app details |

---

## Internal Structure

- **Frontend**: Located under `/client` using a modular, component-based structure
- **Backend**: Located under `/server` with Controllers, Services, DTOs, etc.
- Models: `User`, `Book`, and `Suggestion` entities with appropriate one-to-many relationships

---

## Milestones

- [x] Backend setup with .NET & PostgreSQL
- [x] Authentication with JWT
- [x] CRUD endpoints for books
- [x] React frontend with routing
- [x] Axios integration
- [x] Book filtering and status logic
- [x] Suggestions system with WebSockets
- [x] About page
- [x] User profile and deactivation
- [x] Charts and analytics
- [x] Favorite books + carousel
- [x] Dashboard pagination
- [x] Book & user detail pages
- [x] Cover image upload
- [x] Responsive UI + dark mode
- [x] Docker setup completed

---

## Installation Instructions

> Requirements:
>
> - .NET 7/8 SDK
> - Node.js
> - PostgreSQL
> - (Optional) Docker

### Local Development

1. Clone the repository and set up a PostgreSQL database.
2. Create a `secrets.json` in the backend (`server/BookTracker.Api`) using .NET user secrets or file-based config:

   ```json
   {
     "Jwt:Key": "your_jwt_secret",
     "Jwt:Issuer": "your_app_issuer",
     "Jwt:Audience": "your_app_audience",
     "ConnectionStrings:DefaultConnection": "Host=localhost;Port=5432;Database=booktracker;Username=your_user;Password=your_password",
     "Email": {
       "SmtpHost": "smtp.gmail.com",
       "SmtpPort": "587",
       "Username": "your_email@gmail.com",
       "Password": "your_email_password",
       "From": "Book Tracker <your_email@gmail.com>"
     },
     "ClientBaseUrl": "http://localhost:5173"
   }
   ```

Start the backend:
`cd server/BookTracker.Api && dotnet run`

Start the frontend:
`cd client && npm install && npm run dev`

### Running with Docker

Ensure Docker is installed and create a .env file at the project root.

Paste and configure the following environment variables:

```env
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=booktracker

DB_HOST=db
DB_PORT=5432
DB_NAME=booktracker
DB_USER=your_user
DB_PASS=your_password

JWT_KEY=your_jwt_secret
JWT_ISSUER=your_app_issuer
JWT_AUDIENCE=your_app_audience

EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_email_password
EMAIL_FROM=Book Tracker <your_email@gmail.com>

APP_CLIENT_BASE_URL=http://localhost:3000
VITE_API_BASE_URL=http://booktracker_backend:5000/api
```

Build and run the app:
docker-compose up --build

Access the app in your browser:

Frontend: http://localhost:3000

Backend API: http://localhost:5000/api

To stop the app, run:
`docker-compose down`

The database volume (pgdata) persists between runs, and uploaded images are shared via a local Images folder bind mount. Email links will correctly adapt to the environment using the provided ClientBaseUrl.
