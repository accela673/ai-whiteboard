import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function sendVerificationEmail(to: string, token: string) {
  const verifyLink = `${process.env.BACKEND_URL}/api/auth/verify/${token}`;
  await transporter.sendMail({
    from: `"AI Whiteboard" <${process.env.EMAIL_USER}>`,
    to:to,
    subject: "Подтверждение регистрации",
    html: `<p>Для завершения регистрации нажмите на <a href="${verifyLink}">ссылку</a>:</p>`
  });
}
