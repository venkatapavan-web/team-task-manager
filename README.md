# Team Task Manager 🚀

A full-stack, role-based task management system built with **Spring Boot** and **React**. This project was designed to be clean, practical, and highly maintainable, focusing on a premium user experience through a modern glassmorphic UI.

## 🌟 Key Features

- **Personalized Dashboard**: A welcoming experience with "Welcome, Pavan" and real-time task statistics.
- **Role-Based Access Control (RBAC)**:
  - **Admins**: Can create projects, create tasks, and assign them to specific team members.
  - **Members**: Can view their assigned tasks and update their status (TODO, IN_PROGRESS, DONE).
- **Advanced Task Management**:
  - Tasks include **Priority** levels (Low, Medium, High).
  - **My Tasks Filter**: Members can toggle between viewing all tasks or only those assigned to them.
- **Secure Authentication**: Implemented via JWT (JSON Web Tokens) with a stateless backend architecture.
- **Modern UI**: Built with a "Glassmorphism" design system using Vanilla CSS, ensuring a premium feel without heavy UI libraries.

## 🛠️ Tech Stack

- **Frontend**: React (Functional Components, Hooks, Context API)
- **Backend**: Spring Boot 3.x (Java 17, Spring Security, JPA)
- **Database**: MySQL
- **Icons**: Lucide React
- **Styling**: Vanilla CSS (Custom Design System)

## 🧠 Challenges & Solutions

### 1. Handling Role-Based Security with JWT
One of the main challenges was ensuring that certain endpoints (like project creation) were strictly protected. I solved this by implementing a `JwtAuthenticationFilter` that extracts roles from the database and injects them into the Spring Security context. On the frontend, I used a `PrivateRoute` component and checked the user's role from the `AuthContext` to conditionally render UI elements like the "Create Project" button.

### 2. The "Overdue" Logic
Tracking overdue tasks based on deadlines required some careful date handling. I implemented this on the frontend dashboard by comparing the task's `deadline` string with the current system date. This provides immediate visual feedback to users without needing extra backend calculations.

### 3. Glassmorphism Design
Creating a premium look without Tailwind or Bootstrap was a conscious choice to show deep CSS knowledge. I implemented a `glass` utility class using `backdrop-filter: blur()` and subtle `rgba` borders, which gives the application a state-of-the-art feel.

## 🚀 Setup Instructions

### Backend
1. Ensure MySQL is running and create a database named `workflow_db`.
2. Update `backend/src/main/resources/application.properties` with your MySQL credentials.
3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

### Frontend
1. Navigate to the `frontend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## 📈 Future Enhancements
- Real-time notifications for task assignments.
- File attachments for tasks.
- Project-level progress charts using Recharts.

---
*Created with ❤️ by Pavan*
