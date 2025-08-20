import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import { setupSwagger } from "./config/swagger";
import boardRoutes from "./routes/boards";
import lines from "./routes/lines";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/lines", lines);

setupSwagger(app); // Swagger setup

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const prisma = new PrismaClient();

// -------------------- Socket.IO --------------------
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Присоединение к доске
  socket.on("join_room", async (roomId: string) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);

    // Загружаем линии из БД и отправляем только этому пользователю
    const linesFromDb = await prisma.line.findMany({
      where: { boardId: Number(roomId) },
      orderBy: { id: "asc" },
    });

    socket.emit("load_lines", linesFromDb);
  });

  // Когда пользователь рисует линию
  socket.on("draw", async (data) => {
    const { roomId, line } = data;

    // Сохраняем линию в БД
    const savedLine = await prisma.line.create({
      data: {
        boardId: Number(roomId),
        points: line.points,
        color: line.color,
        strokeWidth: line.strokeWidth,
        tool: line.tool,
      },
    });

    // Отправляем всем клиентам в комнате
    io.to(roomId).emit("draw", savedLine);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// -------------------- Health check --------------------
app.get("/", (req, res) => res.send("Server is running 🚀"));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
