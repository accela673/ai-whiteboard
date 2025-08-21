# 🖌️ Real-time AI Collaboration Whiteboard

An interactive real-time collaboration whiteboard with AI assistant integration.  
Allows drawing, writing notes, sharing ideas, and making edits in real time, while also getting help from artificial intelligence.

---

## 🚀 Features

### 📌 Core
- **Drawing & Notes** — Canvas API / Konva.js support.
- **Collaboration** — all changes are visible in real-time via Socket.IO.
- **Live cursors** — shows cursors of all participants.

### 👤 Authentication
- Express.js + JWT tokens.
- Sign up and login.
- User profile.

### 🛠️ Rooms
- Each room is a separate `room` in Socket.IO.
- Supports projects with multiple participants.

### 🤖 AI Integration
- **AI Suggest** button:
  - Rephrase text.
  - Translate text.
  - Expand ideas.
- Convert rough plans into structured text.
- Summarize notes.

### 📜 Change History
- Store history in **PostgreSQL** or **MongoDB**.
- Rollback to previous versions.

---

## 🛠️ Tech Stack

### Backend
- **Node.js + Express.js** — REST API (CRUD + auth).
- **Socket.IO** — real-time events.
- **TypeScript** — strict typing.
- **AI API** — OpenAI (`gpt-4o-mini`) or equivalent.
- **PostgreSQL** or **MongoDB** — store users, rooms, history.

### Frontend (optional)
- **React + TypeScript**.
- **Canvas API / Konva.js** — drawing and graphic objects.
- **Socket.IO-client** — real-time communication.

---

## 📂 Project Structure (example)

```
/backend
  ├── src
  │   ├── auth/         # Auth & JWT
  │   ├── rooms/        # Rooms logic
  │   ├── drawings/     # Drawing events handling
  │   ├── ai/           # AI API integration
  │   ├── history/      # Change history
  │   ├── index.ts      # Entry point
  │   └── socket.ts     # Socket.IO handlers

/frontend
  ├── src
  │   ├── components/   # UI components
  │   ├── pages/        # App pages
  │   ├── hooks/        # Custom hooks
  │   ├── services/     # API requests
  │   └── App.tsx       # Main component
```

---

## ⚡ Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/accela673/ai-whiteboard.git
cd ai-whiteboard
npm install
```

### 3️⃣ Set up environment variables
Create `.env` file

Example for backend:
```
PORT=5000
JWT_SECRET=your_jwt_secret
DATABASE_URL=postgres://user:password@localhost:5432/whiteboard
OPENAI_API_KEY=your_openai_api_key
```

### 4️⃣ Run in development mode
Backend:
```bash
npm run dev
```

Frontend:
```bash
npm start
```

---

## 🔮 Future Plans
- Export board to PDF/PNG.
- Voice chat.
- Handwriting recognition.
- AI-generated images from descriptions.

---

## 📜 License
This project is licensed under the MIT License.

---


#lazy commit
