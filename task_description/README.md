
Frontend README - Full Stack Bulletin Board

Project Description

This repository contains the frontend code for the Full Stack Bulletin Board application. It provides a user interface built with React for interacting with the backend API, allowing users to manage tasks, view and post messages on a bulletin board, and comment on messages.


Sign up and log in.
Create tasks and mark them as completed.
Post messages on a public bulletin board.
Comment on messages posted by others.

User Stories

listed detailed user stories that are divided into
logical sections such as:

1- User Authentication - Covers sign-up, login, and logout.

2- Task Management - Create, edit, mark completed, delete tasks, and display tasks in an organized format.

3- Bulletin Board - Posting and viewing messages on a public board.

4- Commenting on Messages - Adding, deleting comments.

5- Dashboard Management - A central dashboard to manage tasks and view messages.

6- User Profile - Updating profile details (email, password).


Repository Description

This repository holds the React application code, including components for authentication, task management, message display, commenting, routing, state management (Context API), API service integration, and Docker configuration for the frontend service.

Tech Stack

. Framework: React
. Routing: React Router
. Styling: Tailwind CSS (Assumed based on template knowledge), shadcn/ui (Assumed), .Lucide Icons (Assumed)
. HTTP Client: Axios
. State Management: React Context API
. Package Manager: pnpm (Assumed based on template knowledge)
. Containerization: Docker (with Nginx for serving)

Links

. Backend Repository: [Link to Backend Repo - Placeholder]
. Deployed Site: [Link to Deployed Site - Placeholder]

RESTful Routing Table (Client - React Router)

### **API Routing and Components Overview**

|  Path              |  Component             |   Authentication   |    Description                                                  |
|--------------------|------------------------|--------------------|-----------------------------------------------------------------|
| `/login`           | `LoginPage`            | Public             | Displays the login form for users to sign in.                   |
| `/signup`          | `SignupPage`           | Public             | Displays the registration form for new users.                   |
| `/`                | `DashboardPage`        | Protected          | Main dashboard showing the list of tasks and messages.          |
| `/messages/:id`    | `MessageDetailPage`    | Protected          | Displays the details of a specific message along with comments. |
| `*`                | `NotFoundPage`         | Public             | Displays a 404 Not Found page for undefined routes (optional).  |

(Note: Protected routes require user authentication)


Installation Instructions (Docker)

1- Prerequisites: Docker and Docker Compose must be installed.
2- Clone Repositories: Clone both the backend and frontend repositories into a common parent directory.

git clone <backend-repo-url> backend
git clone <frontend-repo-url> frontend
cd .. # Move to the parent directory containing backend/ and frontend/

3- Environment Variables: Ensure the .env file is created in the parent directory as specified in the backend README.
4- Build and Run: Use Docker Compose to build the images and start the containers.


docker-compose up --build -d
5- Access: The frontend application should be accessible at http://localhost (or the host machine's IP address) in your web browser.

IceBox Features (Future Enhancements)

. Real-time updates using WebSockets.
. Improved UI/UX based on user feedback.
. Client-side form validation enhancements.
. Loading indicators for API calls.
. Pagination for task and message lists.
. Ability to edit tasks and messages.
. User profile customization.
. Image upload functionality for messages.

