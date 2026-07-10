import { validationError } from '../utils/errorHaddler';
import { redis } from '../utils/redis';
import { User } from '../model/loginModel';
import bcrypt from 'bcrypt';

import dotenv from 'dotenv';
dotenv.config();

const salt = Number(process.env.SALT);

export const newPasswordService = async (data: any) => {
  const { email,token, newPassword, confirmPassword } = data;

    if(newPassword !==confirmPassword ){
      return "Please enter your new password and confirm password"
    }

   const resetToken = await redis.getex("resetToken")

    if(token !== resetToken ){
      return "Your not access to password change"
    }

  const user = await User.findOne({ email });
  

  const hashPassword = await bcrypt.hash(confirmPassword, salt);

  await User.findByIdAndUpdate(user?.id, { password: hashPassword });

  await redis.del(`email:${email}`);
  await redis.del("resetToken")

  return {
    message: 'Password change successfully',
    user: user?.id,
    role: user?.role,
    email: user?.email,
  };
};
