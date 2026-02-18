# Blog System

A full-stack blog application built with the MERN stack (MongoDB, Express, React, Node.js).

##  Features

-   **User Authentication**: Secure sign-up and login functionality.
-   **Create & Manage Blogs**: Users can create, update, and delete their own blog posts.
-   **Comments System**: Interactive commenting on blog posts.
-   **Responsive Design**: Built with Tailwind CSS for a mobile-friendly experience.

##  Tech Stack

-   **Frontend**: React, Vite, Tailwind CSS
-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB (with Mongoose)
-   **Authentication**: JWT (JSON Web Tokens), bcrypt

##  Project Structure

```bash
blogsystem/
├── Client/     # Frontend React application
└── Server/     # Backend Node.js/Express application
```

# Setup Instructions
Prerequisites
Node.js (v14 or higher recommended)

MongoDB (Local or Atlas URL)

## 1. Backend Setup

 ### Navigate to the Server directory:

```Bash
cd Server
```

 ### Install dependencies:

```Bash
npm install
```

 ### Environment Configuration:
Create a .env file in the Server root directory. Add the following variables (update with your actual credentials):

```bash
PORT=8000
MONGODB_URI=
CORS_ORIGIN=

# JWT Secrets (Generate secure random strings)
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d
```

 ### Start the server:

```Bash
npm start
```
The server should be running at http://localhost:8000 (or your defined port).



# 2. Frontend Setup

 ### Navigate to the Client directory:

```Bash
cd ../Client
```

 ### Install dependencies:

```Bash
npm install
```

 ### Environment Configuration:
Create a .env file in the Client root directory to point to your backend API:

```bash
VITE_SERVER_URL=http://localhost:8000
```

 ### Start the development server:

```Bash
npm run dev
```

The frontend should be accessible at http://localhost:5173.

## Usage
Ensure both the backend and frontend servers are running.

Open your browser and navigate to the frontend URL (default: http://localhost:5173).

Sign up for a new account or log in to start creating blogs!
