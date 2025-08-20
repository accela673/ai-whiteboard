import { Server, Socket } from "socket.io";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function setupSockets(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join_room", async (roomId: string) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);

      const lines = await prisma.line.findMany({
        where: { boardId: Number(roomId) },
      });
      socket.emit("load_lines", lines);
    });

    socket.on("draw", async (data) => {
      const { roomId, line } = data;
      const savedLine = await prisma.line.create({
        data: {
          boardId: Number(roomId),
          points: line.points,
          color: line.color,
          strokeWidth: line.strokeWidth,
          tool: line.tool,
        },
      });

      io.to(roomId).emit("draw", savedLine);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
}
