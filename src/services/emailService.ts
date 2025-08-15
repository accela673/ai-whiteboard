import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendVerificationEmail = async (to: string, token: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const verificationUrl = `${process.env.BACKEND_URL}/api/auth/verify/${token}`;

  await transporter.sendMail({
    from: `"AI Whiteboard" <${process.env.EMAIL}>`,
    to,
    subject: "Подтверждение регистрации",
    html: `<p>Нажмите <a href="${verificationUrl}">сюда</a> для подтверждения email.</p>`,
  });
};
