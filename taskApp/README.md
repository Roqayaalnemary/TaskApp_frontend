
# Frontend README - Full Stack Bulletin Board

## **Project Description**

This repository contains the frontend code for the Full Stack Bulletin Board application. It provides a user interface built with **React** to interact with the backend API, allowing users to:

* Sign up and log in.
* Create tasks and mark them as completed.
* Post messages on a public bulletin board.
* Comment on messages posted by others.

The application features a dashboard for task management, a message board for posting and viewing messages, and an interactive comment section for user engagement.

---

## **User Stories**

The user stories for this application are divided into the following sections:

### 1. **User Authentication**

* **Sign Up**: Allows new users to create an account.
* **Login**: Authenticated users can log into the system.
* **Logout**: Users can log out of their account.

### 2. **Task Management**

* **Create Tasks**: Users can create tasks and assign them to themselves.
* **Edit Tasks**: Modify existing tasks.
* **Mark Tasks as Completed**: Mark tasks as done once they are completed.
* **Delete Tasks**: Remove tasks that are no longer needed.
* **Display Tasks**: Tasks are displayed in an organized and easily accessible manner.

### 3. **Bulletin Board**

* **Post Messages**: Users can post public messages for others to see.
* **View Messages**: Users can read messages posted on the board.

### 4. **Commenting on Messages**

* **Add Comments**: Users can comment on messages.
* **Delete Comments**: Users can delete their own comments if necessary.

### 5. **Dashboard Management**

* A central dashboard where users can view their tasks and messages in one place.

### 6. **User Profile**

* **Update Profile**: Users can update their email and password.

---

## **Repository Description**

This repository holds the **React application** code for the frontend. The project includes components for authentication, task management, message posting, commenting, routing, state management, API integration, and Docker configuration for the frontend service.

---

## **Tech Stack**

* **Framework**: React
* **Routing**: React Router
* **Styling**: Tailwind CSS, shadcn/ui, Lucide Icons (Assumed based on template knowledge)
* **HTTP Client**: fetch
* **State Management**: React Context API
* **Package Manager**: pnpm (Assumed based on template knowledge)
* **Containerization**: Docker (with Nginx for serving)

---

## **Links**

* **Backend Repository**: \[Link to Backend Repo - Placeholder https://github.com/Roqayaalnemary/TaskApp_frontend]
* **Deployed Site**: \[Link to Deployed Site - Placeholder]

---

## **RESTful Routing Table (Client - React Router)**

### **API Routing and Components Overview**

| **Path**        | **Component**       | **Authentication** | **Description**                                                 |
| --------------- | ------------------- | ------------------ | --------------------------------------------------------------- |
| `/login`        | `LoginPage`         | Public             | Displays the login form for users to sign in.                   |
| `/signup`       | `SignupPage`        | Public             | Displays the registration form for new users.                   |
| `/`             | `DashboardPage`     | Protected          | Main dashboard showing the list of tasks and messages.          |
| `/messages/:id` | `MessageDetailPage` | Protected          | Displays the details of a specific message along with comments. |
| `*`             | `NotFoundPage`      | Public             | Displays a 404 Not Found page for undefined routes (optional).  |

(Note: **Protected routes** require user authentication)

---

## **Installation Instructions (Docker)**

### 1. **Prerequisites**

* Docker and Docker Compose must be installed.

### 2. **Clone Repositories**

* Clone both the backend and frontend repositories into a common parent directory:

  ```bash
  git clone <backend-repo-url> backend
  git clone <frontend-repo-url> frontend
  cd ..  # Move to the parent directory containing backend/ and frontend/
  ```

### 3. **Environment Variables**

* Ensure the `.env` file is created in the parent directory as specified in the backend README.

### 4. **Build and Run**

* Use Docker Compose to build the images and start the containers:

  ```bash
  docker-compose up --build -d
  ```

### 5. **Access**

* The frontend application should be accessible at `http://localhost:5173/home` (or the host machine's IP address) in your web browser.

---

## **IceBox Features (Future Enhancements)**

* **Real-time updates using WebSockets**: For real-time message and task updates.
* **Improved UI/UX**: Enhance the user interface based on user feedback.
* **Client-side form validation**: Add more client-side validation for user inputs.
* **Loading indicators**: Show loading indicators during API calls for better user experience.
* **Pagination**: Add pagination for task and message lists for better performance.
* **Edit Tasks/Messages**: Allow users to edit existing tasks and messages.
* **User Profile Customization**: Enable users to customize their profiles (avatar, preferences).
* **Image Upload for Messages**: Allow users to upload images when posting messages.
