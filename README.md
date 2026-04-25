# 🎓 Assignment & Learning Analytics Platform

A full-stack **Next.js + Node.js + PostgreSQL (Prisma)** application designed to bridge the gap between **instruction and evaluation**.

This platform enables **Instructors** to manage assignments, analyze student performance, and leverage AI tools — while **Students** can track progress, submit work, and improve through feedback.

---

## 🚀 Live Features

### 👨‍🏫 Instructor
- Create, update, delete assignments
- Review student submissions
- Provide feedback & update status
- AI-powered assistance:
  - ✨ Generate feedback automatically
  - ✨ Improve assignment descriptions
- 📊 Analytics Dashboard:
  - Submission status distribution
  - Acceptance rate
  - Submissions per assignment
  - Difficulty vs performance

### 🎓 Student
- Browse assignments
- Submit work (URL + note)
- Track submission status
- View instructor feedback in real-time

---

## 🧠 Smart AI Features
- AI-generated feedback using OpenRouter API
- Assignment description enhancement
- Fallback logic for reliability

---

## 🏗️ Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS + ShadCN UI
- React Query

### Backend
- Node.js + Express.js
- TypeScript
- PostgreSQL + Prisma ORM
- JWT Authentication

### AI Integration
- OpenRouter API (LLM)

---

## 🔐 Authentication & Security
- JWT-based authentication
- Role-based access control:
  - STUDENT
  - INSTRUCTOR
- Protected routes

---

## 📊 Analytics Features
- Submission Status Count
- Acceptance Rate Calculation
- Submissions per Assignment
- Difficulty vs Performance Insights

---

## 📂 Project Structure

### Backend
```
src/
 ├── modules/
 │    ├── assignment/
 │    ├── submission/
 │    ├── analytics/
 │    ├── smart/
 │    ├── user/
 ├── middleware/
 ├── utils/
```

### Frontend
```
src/
 ├── services/
 ├── hooks/
 ├── components/
 ├── app/
 ├── zod/
```

---

## ⚙️ Installation

### 1. Clone the repo
```bash
git clone https://github.com/AbdullahAlTowsif/assignment-and-learning-frontend
cd assignment-and-learning-frontend
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env`:
```
DATABASE_URL=
NODE_ENV=
PORT=
BCRYPT_SALT_ROUND=
JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRES=
JWT_REFRESH_SECRET=
JWT_REFRESH_EXPIRES=
OPENROUTER_API_KEY=
OPENROUTER_BASE_URL=
```

Run:
```bash
npx prisma migrate dev
npx prisma generate
npm run dev
```

---

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Future Improvements
- Real-time notifications
- File uploads instead of URLs
- AI-powered grading
- Student performance prediction

---

## 👨‍💻 Author
**Abdullah Al Towsif**

---

## ⭐ If you like this project
Give it a star ⭐ on GitHub!
