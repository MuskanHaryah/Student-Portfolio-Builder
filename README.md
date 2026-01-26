# 🎓 Student Portfolio Builder

A modern full-stack web application that empowers students to showcase their projects and skills through personalized portfolios.

![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

---

## ✨ Features

- **🔐 Authentication** — Secure JWT-based login & registration
- **📁 Project Management** — Create, edit, and delete portfolio projects
- **🖼️ Image Uploads** — Cloudinary integration for project images
- **🏷️ Tags & Filtering** — Organize projects with custom tags
- **👤 Public Portfolios** — Shareable portfolio pages for each user
- **📱 Responsive Design** — Mobile-first UI with Tailwind CSS

---

## 🛠️ Tech Stack

| Frontend | Backend | Database |
|----------|---------|----------|
| React 19 | Express 5 | MongoDB |
| React Router 7 | JWT Auth | Mongoose |
| Tailwind CSS 4 | Cloudinary | |
| Vite 7 | Multer | |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- Cloudinary account

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/Student-Portfolio-Builder.git
cd Student-Portfolio-Builder
```

**2. Backend Setup**
```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**3. Frontend Setup**
```bash
cd frontend
npm install
```

### Running the App

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Frontend runs on `http://localhost:5173` • Backend runs on `http://localhost:5000`

---

## 📂 Project Structure

```
├── backend/
│   └── src/
│       ├── controllers/    # Route handlers
│       ├── middleware/     # Auth & upload middleware
│       ├── models/         # Mongoose schemas
│       ├── routes/         # API endpoints
│       └── config/         # DB & Cloudinary config
│
└── frontend/
    └── src/
        ├── components/     # Reusable UI components
        ├── pages/          # Route pages
        ├── context/        # Auth context
        └── services/       # API service layer
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/projects` | Get user projects |
| POST | `/api/projects` | Create project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |

---

## 📄 License

MIT License — feel free to use this project for learning and development!