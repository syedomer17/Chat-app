# 💬 Real-Time Chat App (NestJS + React + WebSocket)

A modern fullstack chat application built with:

* 🧠 **NestJS** (Backend)
* ⚡ **Socket.IO** for real-time messaging
* 🎨 **React.js + Tailwind CSS** for a responsive UI
* 💅 **shadcn/ui** for accessible and beautiful components
* 📂 **MongoDB** for message persistence
* 💬 User join/leave announcements, typing indicators, and chat history

---

## 📦 Features

✅ Real-time messaging
✅ Join/Leave notifications
✅ Typing indicators
✅ MongoDB message storage
✅ Display active users
✅ Responsive UI (with Tailwind + shadcn)
✅ Fully typed with TypeScript

---

## 📁 Project Structure

```
chat-app/
├── chat-backend/      → NestJS backend (Socket.IO + MongoDB)
├── chat-frontend/     → React frontend (Tailwind + WebSocket)
```

---

## ✨ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/chat-app.git
cd chat-app
```

---

## 🧠 Backend Setup (`chat-backend/`)

### 📦 Install dependencies

```bash
cd chat-backend
npm install
```

### ⚙️ Configure 

Create a `config` folder and inside it create a `config.ts` file:

```
MONGO_URI=mongodb://localhost:27017/chat-app
```

> Make sure MongoDB is running locally

### ▶️ Run the backend

```bash
npm run start:dev
```

Backend will run on: [http://localhost:3000](http://localhost:3000)

---

## 🎨 Frontend Setup (`chat-frontend/`)

---

## 🧪 Technologies Used

### Backend:

* NestJS
* Socket.IO (WebSocket Gateway)
* Mongoose + MongoDB
* TypeScript

### Frontend:

* React.js (Vite)
* Tailwind CSS
* shadcn/ui
* WebSockets

---

## 🤝 Contributing

Feel free to fork the project and submit a PR with improvements!

---
