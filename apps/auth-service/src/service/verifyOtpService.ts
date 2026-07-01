import { redis } from '../utils/redis';
import { validationError } from '../utils/errorHaddler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const verifyOtpService = async (resetToken: any, userOtp: any) => {
  // Decode email from JWT inside the service
  const decoded: any = jwt.verify(resetToken, process.env.SECRET_KEY as string);
  const email = decoded.email;

  if (!userOtp) {
    throw new validationError('Enter your OTP');
  }

  const rawOtp = await redis.get<string>(`email:${email}`);

  if (!rawOtp) {
    throw new validationError('Your OTP expired');
  }

  const verifyOtp = await bcrypt.compare(userOtp.toString(), rawOtp);

  if (!verifyOtp) {
    throw new validationError('Please enter correct OTP');
  }

  // Optional: mark OTP verified
  await redis.set(`verified:${email}`, 'true', {
    ex: 300,
  });
};
