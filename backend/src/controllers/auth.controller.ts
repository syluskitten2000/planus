import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User';
import { sendResetPasswordEmail } from '../utils/email';
import { AppError } from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';

const signToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET as string;
  const expiresIn = process.env.JWT_EXPIRES_IN || '1h';
  return jwt.sign({ id: userId }, secret, { expiresIn } as any);
};

export const register = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('Email đã được sử dụng', 400);
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
  });

  // Generate token
  const token = signToken(String(user._id || ''));

  res.status(201).json({
    status: 'success',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    throw new AppError('Vui lòng nhập email và mật khẩu', 400);
  }

  // Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Email hoặc mật khẩu không đúng', 401);
  }

  // Generate token
  const token = signToken(String(user._id || ''));

  res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

export const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;

  // Get user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError('Không tìm thấy tài khoản với email này', 404);
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  user.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await user.save({ validateBeforeSave: false });

  try {
    // Send reset password email
    await sendResetPasswordEmail(user.email, resetToken);

    res.status(200).json({
      status: 'success',
      message: 'Token đã được gửi đến email của bạn',
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save({ validateBeforeSave: false });

    throw new AppError('Có lỗi khi gửi email. Vui lòng thử lại sau', 500);
  }
});

export const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { token, password } = req.body;

  // Get user by reset token
  const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new AppError('Token không hợp lệ hoặc đã hết hạn', 400);
  }

  // Update password
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  // Generate new token
  const newToken = signToken(String(user._id || ''));

  res.status(200).json({
    status: 'success',
    token: newToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
}); 