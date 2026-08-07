import { redis } from '../utils/redis';
import { validationError } from '../utils/errorHaddler';
import bcrypt from 'bcrypt';
import crypto from "crypto";

export const verifyOtpService = async (email: string, userOtp: string) => {

  const rawOtp = await redis.get<string>(`email:${email}`);

  if (!rawOtp) {
    throw new validationError('Your OTP expired');
  }

  const verifyOtp = await bcrypt.compare(userOtp.toString(), rawOtp);

  if (!verifyOtp) {
    throw new validationError('Please enter correct OTP');
  }

  const resetToken = crypto.randomBytes(32).toString("hex")

  await redis.setex("resetToken",1000,resetToken)

  return resetToken
};
