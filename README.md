# Task Manager App

A full-stack task management application built with React, Vite, Express.js, and Node.js.

The application allows users to create, edit, delete, filter, and manage tasks through a clean and responsive interface. Tasks are displayed using an endless animated carousel implemented without external libraries.

---

## Technologies

### Frontend
- React
- Vite
- Vanilla CSS

### Backend
- Node.js
- Express.js
- In-memory data storage

---

## Features

- Create new tasks
- Edit existing tasks using a modal
- Delete tasks with confirmation
- Toggle task completion status
- Filter tasks by:
  - All
  - Completed
  - Pending
- Visual priority indication (Low / Medium / High)
- Endless animated carousel
- Loading and error handling
- Responsive layout
- REST API integration

---

## Project Structure

```text
noa_aharon_helfy_task
│
├── backend
│   ├── middleware
│   ├── routes
│   ├── package.json
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── services
│   │   ├── styles
│   │   └── main-app-layout
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

# Backend Setup

```bash
cd backend
npm install
npm start
```

The backend runs on:

```
http://localhost:4000
```

---

# Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on the address displayed by Vite (typically):

```
http://localhost:5173
```

---

# API Endpoints

## Get all tasks

```http
GET /api/tasks
```

Returns all existing tasks.

---

## Create a task

```http
POST /api/tasks
```

Example request:

```json
{
  "title": "Complete assignment",
  "description": "Finish the project",
  "priority": "high"
}
```

---

## Update a task

```http
PUT /api/tasks/:id
```

Updates an existing task.

---

## Delete a task

```http
DELETE /api/tasks/:id
```

Deletes a task.

---

## Toggle completion status

```http
PATCH /api/tasks/:id/toggle
```

Toggles the completion status of a task.

---

# Validation

The backend validates incoming data:

- Title is required.
- Priority must be one of:
  - low
  - medium
  - high
- Invalid requests return HTTP 400.
- Missing tasks return HTTP 404.

---

# Design Decisions

- The backend stores data in memory, as required by the assignment.
- Frontend and backend are separated for a clean project structure.
- API communication is centralized in a dedicated service layer.
- A single TaskForm component is reused for both task creation and editing.
- Editing is performed through a modal dialog to keep the main interface clean.
- The endless carousel is implemented using React state and CSS transforms without any external carousel library.
- The project intentionally keeps the architecture simple and easy to understand while maintaining clean separation of responsibilities.

---

# Time Spent

| Task | Approximate Time |
|------|-----------------:|
| Backend API | ~1 hour |
| Frontend Components | ~1 hour |
| Carousel Implementation | ~45 minutes |
| Styling, Testing & Documentation | ~1 hour |

---

# Notes

- The project uses in-memory storage, therefore all tasks are reset whenever the backend server restarts.
- No external carousel libraries or CSS frameworks were used.