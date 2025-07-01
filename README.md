# Planora - Project Management System

🚀 A powerful task and project management application built with **React, Express, and MongoDB**.

## 🔗 Live Demo & Hosted Link

🎥 **Demo Video:** [Planora Demo](https://your-demo-video-link.com)  
🌍 **Hosted Link:** [Planora Live](https://planora-frontend.vercel.app/)

📧 Email: guest@planora.com  
🔒 Password: guest123

---

## 🔧 Tech Stack

- **Frontend:** React, React Router, Axios, Chart.js.
- **Backend:** Express.js, Node.js, Mongoose.
- **Database:** MongoDB.
- **Hosting:** Vercel for frontend & backend.

---

## 📌 Features

### 🔹 Frontend (React)

✅ **Login & Signup**

- Secure authentication with **JWT**.
- Stores token in `localStorage` upon login.
- Redirects unauthorized users to the login page.

✅ **Task Management**

- Create tasks with fields like **project, team, owners, tags, and status**.
- Filter tasks by **owner, project, team, tags, and status**.
- URL-based filtering (`/tasks?owner=John&team=Development`).
- Task sorting by **priority and completion time**.

✅ **Views**

- **Project View:** Displays tasks grouped by projects.
- **Team View:** Lists tasks by teams.
- **Task Details:** Shows full task info with status updates.

✅ **Reports & Visualization**

- Track work done last week with **bar charts**.
- See total pending work **summed in charts**.
- View **tasks closed by owner, team, or project**.

---

### 🔹 Backend (Express + MongoDB)

✅ **User Authentication**

- Secure **JWT-based authentication**.
- **Sign up** (`POST /user/signup`) and **Login** (`POST /user/login`).
- **Retrieve user details** (`GET /user/me`).

✅ **Task API**

- **Create Task:** (`POST /tasks`)
- **Filter Tasks:** (`GET /tasks?team=development`)
- **Update Task:** (`POST /tasks/:id`)
- **Delete Task:** (`DELETE /tasks/:id`)

✅ **Project & Team Management**

- **Create Projects:** (`POST /projects`)
- **Fetch All Projects:** (`GET /projects`)
- **Create Teams:** (`POST /teams`)
- **Retrieve Team List:** (`GET /teams`)

✅ **Tag Management**

- **Create Tags:** (`POST /tags`)
- **Fetch Tags:** (`GET /tags`)

✅ **Reporting System**

- **Completed tasks last week** (`GET /report/last-week`)
- **Total days of pending work** (`GET /report/pending`)
- **Tasks closed by team/owner/project** (`GET /report/closed-tasks`)
