;a# TODO List for MERN Stack Mini-Project

## Project Structure Setup
- [x] Create backend and frontend folders

## Backend Setup
- [x] Initialize Node.js project in backend folder (npm init -y)
- [x] Install backend dependencies (express, mongoose, bcryptjs, jsonwebtoken, cors, dotenv)
- [x] Create server.js as entry point
- [x] Set up MongoDB connection
- [x] Create User model (models/User.js)
- [x] Create Student model (models/Student.js)
- [x] Implement auth middleware (middleware/auth.js)
- [x] Create auth routes (routes/auth.js)
- [x] Create student routes (routes/students.js)

## Frontend Setup
- [x] Create React app in frontend folder (npx create-react-app .)
- [x] Install frontend dependencies (react-router-dom, axios, jwt-decode)
- [x] Set up routing with protected routes (src/App.js)
- [x] Create Login component (src/components/Login.js)
- [x] Create Signup component (src/components/Signup.js)
- [x] Create AdminDashboard component (src/components/AdminDashboard.js)
- [x] Create StudentDashboard component (src/components/StudentDashboard.js)
- [x] Create StudentForm component (src/components/StudentForm.js)
- [x] Create StudentList component (src/components/StudentList.js)
- [x] Implement authentication context (src/context/AuthContext.js)
- [x] Create API utility (src/utils/api.js)

## Configuration and Testing
- [x] Set up environment variables (.env file for backend)
- [x] Install dependencies for both backend and frontend
- [x] Start MongoDB server
- [x] Run backend server
- [x] Run frontend development server
- [x] Test signup and login functionality
- [x] Test role-based dashboard access
- [x] Test CRUD operations for students
