import { redis } from '../utils/redis';
import bcrypt from 'bcrypt';

export const redisSet = async (email: string) => {
  const generateOtp = Math.floor(10000 + Math.random() * 90000).toString();
  const hashOtp =await bcrypt.hash(generateOtp, 10);
  await redis.setex(`email:${email}`, 300, hashOtp);
  return generateOtp;
};
