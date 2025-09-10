# MERN Stack Mini-Project: Student Management System

A complete student management platform built with the MERN (MongoDB, Express, React, Node.js) stack. This application implements authentication, role-based access control, and CRUD operations for student records.

## 🚀 Features

- 🔐 User Authentication & Authorization (JWT)
- 👥 Role-based Access Control (Admin/Student)
- 📚 Student CRUD Operations
- 📱 Responsive Design
- ⚡ Fast and Smooth UI

## 🛠️ Tech Stack

**Frontend:**
- React.js
- React Router DOM
- Axios
- Bootstrap

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- bcryptjs for password hashing

## 📸 Screenshots

### 🔐 Signup Page
![Signup Page](https://res.cloudinary.com/dfacldueh/image/upload/v1757523988/Screenshot_2025-09-10_223350_zvcx6b.png)

### 🔐 Login Page
![Login Page](https://res.cloudinary.com/dfacldueh/image/upload/v1757523988/Screenshot_2025-09-10_223323_fzexby.png)

### 🏠 Admin Dashboard
![Admin Dashboard](https://res.cloudinary.com/dfacldueh/image/upload/v1757523987/Screenshot_2025-09-10_223416_bzgiip.png)

### 📚 Student Dashboard
![Student Dashboard](https://res.cloudinary.com/dfacldueh/image/upload/v1757523988/Screenshot_2025-09-10_223443_fbnfb1.png)

## Installation & Setup

### Prerequisites:
- Node.js installed
- MongoDB (local or cloud instance)

### Clone the Repository
```bash
git clone https://github.com/KashishMahajan1203/crud_dashboard.git
cd crud-project
```

### Backend Setup
```bash
cd backend
npm install
```

#### Configure Environment Variables
Create a `.env` file in the backend directory and add:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

#### Start Backend Server
```bash
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
```

#### Start Frontend Server
```bash
npm start
```

## Usage
1. Open `http://localhost:3000` in your browser.
2. Sign up as Admin or Student.
3. Log in and access respective dashboards.

## API Routes

### Auth Routes:
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Authenticate user & return JWT

### Student Routes:
- `GET /api/students` - Get all students (Admin only)
- `POST /api/students` - Add new student (Admin only)
- `GET /api/students/:id` - Get student by ID (Admin only)
- `PUT /api/students/:id` - Update student (Admin only)
- `DELETE /api/students/:id` - Delete student (Admin only)
- `GET /api/students/me` - Get own profile (Student only)
- `PUT /api/students/me` - Update own profile (Student only)

## User Roles

### Admin:
- View all students
- Add/Edit/Delete student records

### Student:
- View own profile
- Update own profile (name, email, course)

## Deploying Backend on Render / Heroku
1. Push code to GitHub
2. Connect repository to hosting service
3. Set up environment variables in hosting dashboard
4. Deploy & monitor logs

## 📞 Contact
For any queries, reach out via:
- Email: kashishmahajan878@gmail.com
- GitHub Issues: repository-issues

---
_Developed with ❤️ by Kashish Mahajan
