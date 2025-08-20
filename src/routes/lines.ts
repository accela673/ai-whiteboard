import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

/**
 * @swagger
 * /api/lines/{boardId}:
 *   get:
 *     summary: Получить все линии доски
 *     tags: [Lines]
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Линии возвращены
 */
router.get("/:boardId", async (req, res) => {
  const { boardId } = req.params;
  const lines = await prisma.line.findMany({
    where: { boardId: Number(boardId) },
  });
  res.json(lines);
});

/**
 * @swagger
 * /api/lines/{boardId}:
 *   post:
 *     summary: Добавить новую линию
 *     tags: [Lines]
 */
router.post("/:boardId", async (req, res) => {
  const { boardId } = req.params;
  const { points, color, strokeWidth, tool } = req.body;

  const line = await prisma.line.create({
    data: {
      points,
      color,
      strokeWidth,
      tool,
      boardId: Number(boardId),
    },
  });

  res.status(201).json(line);
});

export default router;