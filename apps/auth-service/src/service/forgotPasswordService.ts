import { sendMail } from '../producer/emailProducer';
import { validationError } from '../utils/errorHaddler';
import { redis } from '../utils/redis';
import { User } from '../model/loginModel';
import bcrypt from 'bcrypt';


export const forgotPasswordService = async (data: any) => {
  const { email } = data;

  if (!email) {
    throw new validationError('Please enter your email');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new validationError('Please enter your register email');
  }

  const salt = 10;
  const otp = Math.floor(100000 + Math.random() * 90000);
  const hashOtp = await bcrypt.hash(otp.toString(), salt);

  await redis.setex(`email:${email}`, 300, hashOtp);
  await sendMail(email, otp);

};
