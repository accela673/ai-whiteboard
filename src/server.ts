import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import { setupSwagger } from "./config/swagger";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Socket.IO логика
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_room", (roomId: string) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on("draw", (data) => {
    socket.to(data.roomId).emit("draw", data);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

setupSwagger(app);

