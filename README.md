# GEC_SHK_CLIENT

Frontend client for the **GEC Sheikhpura Academic ERP Portal**.

This project provides the administrative interface for managing students, faculty, departments, and bulk student data uploads.

The application is built using **React, TypeScript, Vite, and TailwindCSS**, and deployed on **AWS S3 with CloudFront CDN** for fast and scalable delivery.

---

## 🌐 Live Application

https://gecshk.dev

---

## 🚀 Features

- Secure authentication system
- Admin dashboard
- Student management
- Faculty management
- Department management
- Bulk student upload via CSV
- Student directory
- Protected routes for authenticated users
- Responsive admin interface
- API communication with backend services

---

## 🛠 Tech Stack

### Frontend

- React
- TypeScript
- Vite
- TailwindCSS
- Axios
- Zustand (State Management)
- React Router
- shadcn

### Infrastructure

- AWS S3 (Static website hosting)
- AWS CloudFront (CDN)
- GitHub Actions (CI/CD pipeline)
- Custom domain configuration

---

## 🏗 Architecture

```
Developer
   │
   ▼
GitHub Repository
   │
   ▼
GitHub Actions
(CI/CD Pipeline)
   │
   ▼
React Production Build
(dist/)
   │
   ▼
AWS S3
(Static Hosting)
   │
   ▼
CloudFront CDN
   │
   ▼
Users
   │
   ▼
React Application
   │
   ▼
API Requests
   │
   ▼
https://api.gecshk.dev
   │
   ▼
Backend Server (AWS EC2)
   │
   ▼
Database
```

The frontend communicates with the backend API deployed on **AWS EC2 using Docker and Nginx**.

---

## ⚙ Environment Variables

Create a `.env.production` file for production builds.

```env
VITE_API_URL=Backend server
```

Only variables prefixed with `VITE_` are exposed to the frontend by **Vite**.

---

## 💻 Local Development

### Getting Started

Follow the steps below to run the project locally.

#### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/GEC_SHK_CLIENT.git
```

#### 2. Navigate to the project directory

```bash
cd GEC_SHK_CLIENT
```

#### 3. Install dependencies

```bash
npm install
```

#### 4. Start the development server

```bash
npm run dev
```

Once the server starts, open your browser and visit:

```
http://localhost:5173
```

The React application will now be running in development mode.

---

## 📦 Build for Production

Generate the optimized production build by running:

```bash
npm run build
```

After the build completes, the optimized static files will be generated inside the:

```
dist/
```

folder.

---

## 🚀 Deployment

Deployment is fully automated using **GitHub Actions**.

### Deployment Workflow

```
Developer
   ↓
Git Push
   ↓
GitHub Actions
   ↓
Build React Application
   ↓
Generate dist/ Folder
   ↓
Upload dist/ → AWS S3
   ↓
CloudFront Cache Invalidation
   ↓
Live Application Updated
```

---

## 📂 Project Structure

```
src
├── components        # Reusable UI components
├── modules           # Feature-based modules
│   ├── admin         # Admin related features
│   └── login         # Authentication module
├── routes            # Application routes
├── services          # API service layer
├── store             # Global state management
├── layout            # Layout components
├── App.tsx           # Root component
└── main.tsx          # Application entry point
```

---

## 🔐 Authentication

Authentication state is managed using **Zustand**.

Protected routes are implemented using a custom **ProtectedRoute** component.

Unauthorized users are automatically redirected to the login page.

---

## 🧑‍💻 Author

**Aditya Kumar**

Full Stack Developer  
MERN Stack | TypeScript | AWS | Docker | PostgreSQL
