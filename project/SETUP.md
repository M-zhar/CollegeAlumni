# College Alumni Platform - Setup Guide

This is a full-stack college alumni tracking platform with separate frontend (React) and backend (Express) running on different ports.

## Database Setup

### 1. Install MySQL
Make sure you have MySQL installed and running on your local machine.

### 2. Create the Database
Open MySQL Workbench and run the SQL script located at:
```
server/database/schema.sql
```

This will:
- Create the `alumni_platform` database
- Create three tables: `students`, `alumni`, and `department_posts`
- Set up proper indexes for performance

### 3. Configure Database Connection
Update the `.env` file in the project root with your MySQL credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=alumni_platform
JWT_SECRET=your-secret-key-change-this-in-production
PORT=3001
```

## Running the Application

### Backend Server (Port 3001)
In one terminal, start the backend server:

```bash
npm run server
```

The API will run on `http://localhost:3001`

### Frontend (Port 5173)
In another terminal, start the frontend:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Default Users

After running the schema.sql, you'll need to create users through the registration flow or manually in MySQL Workbench.

### For Department Admin Access:
Insert a department admin user in MySQL Workbench:

```sql
INSERT INTO students (email, password, full_name, department, enrollment_year, current_year, role)
VALUES ('admin@college.edu', '$2a$10$...', 'Admin User', 'Administration', 2024, 1, 'department');
```

Note: You'll need to hash the password using bcrypt. You can do this by:
1. Running the server
2. Registering as a student with your desired password
3. Copying the hashed password from the database
4. Using it for the department admin account

## User Roles

The platform supports three user roles:

1. **Student** - Can view all alumni profiles
2. **Alumni** - Can view other alumni and department posts
3. **Department** - Full access to manage students, alumni, and posts

## Features

### Student Dashboard
- View all alumni profiles
- Search alumni by name, department, or company
- See contact information and LinkedIn profiles

### Alumni Dashboard
- View all alumni profiles
- View department posts (events, messages, announcements)
- Filter posts by department

### Department Dashboard
- View all students and alumni
- Delete students and alumni records
- Create department posts (events, messages, announcements)
- Delete posts

## API Endpoints

### Authentication
- `POST /api/auth/register/student` - Register as student
- `POST /api/auth/register/alumni` - Register as alumni
- `POST /api/auth/login` - Login

### Students
- `GET /api/students/alumni` - Get all alumni (requires student auth)
- `GET /api/students/profile` - Get own profile

### Alumni
- `GET /api/alumni/list` - Get all alumni (requires alumni auth)
- `GET /api/alumni/posts` - Get department posts
- `GET /api/alumni/profile` - Get own profile
- `PUT /api/alumni/profile` - Update profile

### Department
- `GET /api/department/students` - Get all students
- `GET /api/department/alumni` - Get all alumni
- `DELETE /api/department/students/:id` - Delete student
- `DELETE /api/department/alumni/:id` - Delete alumni
- `POST /api/department/posts` - Create post
- `GET /api/department/posts` - Get all posts
- `DELETE /api/department/posts/:id` - Delete post

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Express, TypeScript, MySQL
- **Authentication**: JWT
- **Password Hashing**: bcryptjs

## Troubleshooting

### Database Connection Issues
- Ensure MySQL is running
- Check your credentials in `.env`
- Verify the database `alumni_platform` exists

### Port Already in Use
- Backend: Change `PORT` in `.env`
- Frontend: Vite will automatically prompt to use a different port

### CORS Issues
- The backend is configured to allow all origins
- If issues persist, check the CORS configuration in `server/index.ts`
