# Book Tracker

A full-stack web application that allows users to track and manage their personal book library. Users can add books, organize them by status (Reading, Completed, Wishlist), and leave reviews or ratings.

## Project Overview

This project is built to practice full-stack development using:

- **Frontend:** React
- **Backend:** ASP.NET Core Web API
- **Database:** PostgreSQL
- **Authentication:** JWT-based

---

## Features

### Current Features (v1)

#### User

- Secure user registration and login
- Authenticated access to a personalized book collection

#### Book Management

- Add new books with:
  - Title
  - Author
  - Status (`Reading`, `Completed`, `Wishlist`)
  - Optional rating and review
- Edit, delete, and view books
- Filter books by status

#### UI/UX

- Responsive dashboard with filters
- Light/Dark mode toggle
- Personalized greeting on dashboard

---

### Planned Features (Next Version)

- User profile page with:
  - View details (email, username, registration date)
  - Deactivate profile option
- Dashboard improvements:
  - Pagination for books
  - Favorite books carousel
  - Book and user detail pages
- Data visualization:
  - Charts by status and genre
  - Monthly completion graph
- Search and tag-based filtering
- Cover image upload
- Responsive/mobile-friendly refinements

---

### Future Roadmap

- Mobile app with **React Native** using the same backend
- Optional: Progressive Web App (PWA) support

---

## Tech Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Frontend | React, Axios, React Router          |
| Backend  | ASP.NET Core Web API                |
| Database | PostgreSQL                          |
| ORM      | Entity Framework Core               |
| Auth     | JWT                                 |
| Tools    | Swagger, Postman, Docker (optional) |

---

## Database Models

### User

- `Id`: UUID
- `FirstName`: string
- `LastName`: string
- `Address`: string
- `PhoneNumber`: string
- `Username`: string
- `Email`: string
- `PasswordHash`: string
- `ProfileImageUrl`: string (optional)
- `RegistrationDate`: DateTime
- `IsActive`: bool (for deactivation)
- One-to-many relationship with books

### Book

- `Id`: UUID
- `Title`: string
- `Author`: string
- `Genre`: string
- `Status`: enum (`Reading`, `Completed`, `Wishlist`)
- `Rating`: int? (1–5)
- `Review`: string?
- `CoverImageUrl`: string (optional)
- `DateAdded`: DateTime
- `DateCompleted`: DateTime? (only if marked as Completed)
- `UserId`: UUID (foreign key)

---

## API Endpoints

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

### User (Upcoming)

| Method | Endpoint                | Description              |
| ------ | ----------------------- | ------------------------ |
| GET    | `/api/users/me`         | Get current user details |
| PUT    | `/api/users/deactivate` | Deactivate user profile  |

---

## Frontend Pages

| Route        | Page Description                    |
| ------------ | ----------------------------------- |
| `/register`  | Registration form                   |
| `/login`     | Login form                          |
| `/dashboard` | View all books (with filters)       |
| `/add`       | Add a new book                      |
| `/edit/:id`  | Edit an existing book               |
| `/profile`   | (Planned) User details and settings |
| `/book/:id`  | (Planned) Book detail page          |

---

## Project Structure

### Frontend (`/client`)

src/
├── components/
│ ├── BookCard.tsx
│ ├── BookForm.tsx
│ └── AuthForm.tsx
├── pages/
│ ├── Dashboard.tsx
│ ├── Login.tsx
│ └── Register.tsx
├── services/
│ ├── api.ts
│ └── authService.ts
├── types/
│ └── index.ts
├── App.tsx
└── main.tsx

### Backend (`/server`)

BookTracker.Api/
├── Controllers/
├── Models/
├── DTOs/
├── Data/
├── Services/
└── Program.cs

## Future Improvements (Stretch Goals)

- Add cover image upload
- Add genre/tags and filtering
- Add search functionality
- Responsive/mobile-friendly UI
- Date added/completed fields
- Light/dark mode toggle

---

## Milestones

- [x] Backend setup with .NET & PostgreSQL
- [x] Authentication with JWT
- [x] CRUD endpoints for books
- [x] React app with routing and pages
- [x] API integration with Axios
- [x] Filtering and status display
- [x] Final UI polish
- [ ] User profile + deactivation
- [ ] Dashboard enhancements (carousel, pagination)
- [ ] Charts and analytics
- [ ] Optional enhancements

---

## Installation Instructions

> Requirements:
>
> - .NET 7/8 SDK
> - Node.js
> - PostgreSQL
> - (Optional) Docker

1. Clone the repository
2. Set up PostgreSQL database and connection string
3. Run migrations and seed data
4. Run backend with `dotnet run`
5. Navigate to `/client` and run frontend with `npm install` and `npm run dev`
