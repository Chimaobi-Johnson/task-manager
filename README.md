## SETUP INSTRUCTIONS

## Getting Started

1. **Install dependencies:**  
   From the root folder, run:
   
   npm install
   
2. **Development:**  
   To run both the Express.js backend and the Next.js frontend locally, use:
   
   npm run dev
   
   This will start both servers (backend and frontend) for development.

## DATABASE SCHEMA DESCRIPTION

### **User**
- `email` (String, required, unique): User’s email address.
- `password` (String, required): Hashed password.

### **Task**
- `title` (String, required): The task’s title.
- `description` (String, optional): Details about the task.
- `status` (String, enum: 'pending', 'in-progress', 'done', default: 'pending'): The current status of the task.
- `extras` (Mixed, optional): Additional data (e.g., tags, due date, priority).
- `userId` (ObjectId, required): Reference to the user who owns the task.
- `createdAt` (Date): Timestamp when the task was created.
- `updatedAt` (Date): Timestamp when the task was last updated.

---

## DEV NOTE: WHAT I WOULD BUILD NEXT IF I HAD MORE TIME

- **User Profile & Settings:** Allow users to update their profile, change password, and manage notification preferences.
- **Task Reminders & Notifications:** Add due dates and send reminders for upcoming or overdue tasks.
- **Task Collaboration:** Enable sharing tasks with other users or assigning tasks to team members.
- **Task Categories/Tags:** Allow users to organize tasks by category or tag for better filtering.
- **Mobile Responsiveness:** Further improve the mobile experience and add a PWA manifest for installability.
- **Activity Log:** Track changes to tasks for audit/history.
- **Better Error Handling & Validation:** More robust feedback for API and UI errors.
- **Testing:** Add unit and integration tests for both backend and frontend.
- **CI/CD:** Automate deployment and testing with GitHub Actions or similar.


## DEPLOYED APP LINK

https://task-manager-client-ylr8.onrender.com