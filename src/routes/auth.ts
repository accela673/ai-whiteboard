import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { sendVerificationEmail } from "../services/emailService";
import crypto from "crypto";

const prisma = new PrismaClient();
const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Регистрация нового пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: mySecret123
 *     responses:
 *       200:
 *         description: Регистрация успешна
 *       400:
 *         description: Email уже зарегистрирован
 */
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return res.status(400).json({ error: "Email уже зарегистрирован" });

  const token = crypto.randomBytes(32).toString("hex");

  const user = await prisma.user.create({
    data: { name, email, password, verifyToken: token }
  });

  await sendVerificationEmail(email, token);

  res.json({ message: "Регистрация успешна! Проверьте email для подтверждения." });
});

/**
 * @swagger
 * /auth/verify/{token}:
 *   get:
 *     summary: Подтверждение email
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Токен подтверждения
 *     responses:
 *       200:
 *         description: Email подтверждён
 *       400:
 *         description: Неверный или устаревший токен
 */
router.get("/verify/:token", async (req, res) => {
  const { token } = req.params;

  const user = await prisma.user.findUnique({ where: { verifyToken: token } });
  if (!user) return res.status(400).json({ error: "Неверный или устаревший токен" });

  await prisma.user.update({
    where: { id: user.id },
    data: { isVerified: true, verifyToken: null }
  });

  res.send("Email подтверждён! Можете войти в систему.");
});

export default router;
