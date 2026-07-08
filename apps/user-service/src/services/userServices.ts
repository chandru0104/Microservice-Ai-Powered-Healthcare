import { User } from '../models/userModel';
import bcrypt from 'bcrypt';
import env from 'dotenv';
import { validationError } from '../utils/errorHandler';
// import cloudinary from '../utils/cloudinary';
import { redis } from '../utils/redis';
import { sendMail } from '../kafkaProducer/producer';

env.config();

export const otpSet = async (data: any) => {
  const { email } = data;

  if (!email) {
    throw new validationError('Fill require fields');
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashOtp = await bcrypt.hash(otp, 10);

  await redis.setex(
    `email:${email}`,
    1000,
    JSON.stringify({
      email,
      otp: hashOtp,
    }),
  );
  sendMail(email, otp);
};

export const otpGet = async (data: any) => {
  const { email, otp } = data;

  if (!email || !otp) {
    throw new validationError('Fill require fields');
  }
  try {
    const getOpt: any = await redis.get(`email:${email}`);

    if (!getOpt) {
      throw new validationError('Otp expired');
    }
    const compareOtp = await bcrypt.compare(otp, getOpt.otp);
    if (!compareOtp) {
      throw new Error('Please enter your Correct otp');
    }

    await User.findOneAndUpdate({ email }, { is_verfiy: true })

    await redis.del(`email:${email}`);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

//add user service
export const userAddService = async (data: any) => {
  const {
    name,
    email,
    password,
  } = data;

  if (!name || !email || !password) {
    throw new validationError('Please fill all required fields');
  }

  const salt = 10;
  const hashPassword = await bcrypt.hash(password, salt);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashOtp = await bcrypt.hash(otp, 10);

  await redis.setex(
    `email:${email}`,
    1000,
    JSON.stringify({
      email,
      otp: hashOtp,
    }),
  );
  sendMail(email, otp);
  // OTP verify - separate try-catch
  // const getOpt: any = await redis.get(`email:${email}`);

  // if (!getOpt) {
  //   throw new validationError('OTP expired. Please request a new OTP.');
  // }


  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new validationError('User already exists with this email.');
  }

  // Create user in DB
  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  const responseUser = await User.findById(user._id).select('-password -__v');

  return responseUser;
};


//user all list services
export const userAllListService = async (): Promise<any> => {
  try {
    const user = await User.find({ status: 1 });
    return user;
  } catch (error: any) {
    throw new validationError(error.message);
  }
};

//user delete services
export const userDeleteService = async (id: any) => {
  try {
    const deleteUser = await User.findByIdAndUpdate(
      id,
      { status: 0 },
      { new: true },
    );
    return deleteUser;
  } catch (error: any) {
    throw new validationError(error.message);
  }
};

//user profile services
export const userProfileService = async (id: any) => {
  try {
    const foundUser = await User.findById(id, { status: 0 });

    if (!foundUser) {
      return 'User not found';
    }

    const UserProfile = await User.findById(id);

    return UserProfile;
  } catch (error: any) {
    throw new validationError(error.message);
  }
};

//user update services
export const userUpdateService = async (id: any, data: any) => {
  try {
    const userlist = await User.findById(id);
    if (!userlist) {
      return 'User not found';
    }
    const updatePayload = {
      ...data,
      updatedBy: id,
    };

    const updateData = await User.findByIdAndUpdate(id, updatePayload, {
      new: true,
      runValidators: true,
    });

    if (!updateData) {
      throw new validationError('User not update data');
    }
    return updateData;
  } catch (error: any) {
    throw new validationError(error.message);
  }
};
