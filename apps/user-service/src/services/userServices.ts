import { User } from '../models/userModel';
import bcrypt from 'bcrypt';
import env from 'dotenv';
import { validationError } from '../utils/errorHandler';
import cloudinary from '../utils/cloudinary';
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
  const { email, userOtp } = data;

  if (!email || !userOtp) {
    throw new validationError('Fill require fields');
  }
  try {
    const getOpt: any = await redis.get(`email:${email}`);

    if (!getOpt) {
      throw new validationError('Otp expired');
    }
    const compareOtp = await bcrypt.compare(userOtp, getOpt.otp);
    if (!compareOtp) {
      throw new Error('Please enter your Correct');
    }
    await redis.del(`email:${email}`);
  } catch (error: any) {
    throw new Error('Invalid otp');
  }
};

//add user service
export const userAddService = async (data: any) => {
  const {
    name,
    email,
    password,
    role,
    experience,
    userOtp,
    licence_no,
    degree,
    specialist,
    about,
    registration,
    phone,
    location,
    language,
    fees,
    schedule,
  } = data;

  const salt = 10;

  const hashPassword = await bcrypt.hash(password, salt);

  if (role == 'user') {
    try {
      const getOpt: any = await redis.get(`email:${email}`);

      if (!getOpt) {
        throw new validationError('Otp expired');
      }
      const compareOtp = await bcrypt.compare(userOtp, getOpt.otp);
      if (!compareOtp) {
        throw new Error('Please enter your Correct');
      }
      await redis.del(`email:${email}`);
    } catch (error: any) {
      throw new Error('Invalid otp');
    }

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    const responseUser = await User.findById(user._id).select(
      '-language -schedule -password -__v',
    );

    return responseUser;
  }

  if (role == 'delivery boy') {
    try {
      const getOpt: any = await redis.get(`email:${email}`);

      if (!getOpt) {
        throw new validationError('Otp expired');
      }
      const compareOtp = await bcrypt.compare(userOtp, getOpt.otp);
      if (!compareOtp) {
        throw new Error('Please enter your Correct');
      }
      await redis.del(`email:${email}`);
    } catch (error: any) {
      throw new Error('Invalid otp');
    }

    const deliver_boy = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    const response_deliver_boy = await User.findById(deliver_boy._id).select(
      '-language -schedule -password -__v',
    );
    return response_deliver_boy;
  }

  if (role == 'admin') {
    try {
      const getOpt: any = await redis.get(`email:${email}`);

      if (!getOpt) {
        throw new validationError('Otp expired');
      }
      const compareOtp = await bcrypt.compare(userOtp, getOpt.otp);
      if (!compareOtp) {
        throw new Error('Please enter your Correct');
      }
      await redis.del(`email:${email}`);
    } catch (error: any) {
      throw new Error('Invalid otp');
    }

    const admin = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });
    const resposneAdmin = await User.findById(admin._id).select(
      '-language -schedule -password -__v  ',
    );

    return resposneAdmin;
  }

  if (role == 'doctor') {
    try {
      const getOpt: any = await redis.get(`email:${email}`);

      if (!getOpt) {
        throw new validationError('Otp expired');
      }
      const compareOtp = await bcrypt.compare(userOtp, getOpt.otp);
      if (!compareOtp) {
        throw new Error('Please enter your Correct');
      }
      await redis.del(`email:${email}`);
    } catch (error: any) {
      throw new Error('Invalid otp');
    }

    let profileImage = '';
    if (data.file) {
      const fileUpload = await cloudinary.uploader.upload(data.file.path, {
        folder: 'profile',
      });
      profileImage = fileUpload.secure_url;
    }

    const doctor = await User.create({
      name,
      email,
      password: hashPassword,
      role,
      profile: profileImage,
      experience,
      licence_no,
      degree,
      specialist,
      about,
      registration,
      phone,
      location,
      language,
      fees,
      schedule,
      approved: 0,
    });
    const responseUser = await User.findById(doctor._id).select(
      '-password -__v',
    );
    return responseUser;
  }

  throw new Error('Invalid user');
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

    if (foundUser) {
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
