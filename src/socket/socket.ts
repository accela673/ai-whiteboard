import { Server, Socket } from "socket.io";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function setupSockets(io: Server) {
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_room", async (roomId: string) => {
    socket.join(roomId);

    const linesFromDb = await prisma.line.findMany({
      where: { boardId: Number(roomId) },
      orderBy: { id: "asc" },
    });

    // Преобразуем points в массив, если вдруг это JSON-строка
    const formattedLines = linesFromDb.map(l => ({
      ...l,
      points: Array.isArray(l.points) ? l.points : JSON.parse(l.points as any),
    }));

    socket.emit("load_lines", formattedLines);
  });

  socket.on("draw", async ({ roomId, line }) => {
    const savedLine = await prisma.line.create({
      data: {
        boardId: Number(roomId),
        points: line.points,
        color: line.color,
        strokeWidth: line.strokeWidth,
        tool: line.tool,
      },
    });

    io.to(roomId).emit("draw", {
      ...savedLine,
      points: Array.isArray(savedLine.points) ? savedLine.points : JSON.parse(savedLine.points as any),
    });
  });

  socket.on("disconnect", () => console.log(`User disconnected: ${socket.id}`));
});}