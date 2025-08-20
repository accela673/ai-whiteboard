import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

/**
 * @swagger
 * /api/boards:
 *   post:
 *     summary: Создания новой доски
 *     tags: [Boards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: My Whiteboard 1
 *     responses:
 *       200:
 *         description: Доска успешно создана
 *       400:
 *         description: Ошибка при создании доски
 */
router.post("/", async (req, res) => {
  const { name } = req.body;
  const board = await prisma.whiteboard.create({ data: { name } });
  res.json(board);
});

/**
 * @swagger
 * /api/boards/{id}:
 *   get:
 *     summary: Получение доски по ID
 *     tags: [Boards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID доски
 *     responses:
 *       200:
 *         description: Доска успешно получена
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const board = await prisma.whiteboard.findUnique({
    where: { id: +id },
    include: { lines: true },
  });
  if (!board) return res.status(404).json({ error: "Доска не найдена" });
  res.json(board);
});

export default router;
