import nodemailer from 'nodemailer';
import { AppError } from './appError';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const resetURL = `http://localhost:3000/reset-password?token=${token}`;

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: email,
    subject: 'Đặt lại mật khẩu PlanUs',
    html: `
      <h1>Yêu cầu đặt lại mật khẩu</h1>
      <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản PlanUs của mình.</p>
      <p>Vui lòng nhấp vào liên kết dưới đây để đặt lại mật khẩu:</p>
      <a href="${resetURL}" style="display: inline-block; padding: 10px 20px; background-color: #FF9999; color: white; text-decoration: none; border-radius: 5px;">
        Đặt lại mật khẩu
      </a>
      <p>Liên kết này sẽ hết hạn sau 10 phút.</p>
      <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new AppError('Không thể gửi email. Vui lòng thử lại sau', 500);
  }
}; 