import { Response, Request } from 'express';
import { validationError } from '../utils/errorHaddler';
import { forgotPasswordService } from '../service/forgotPasswordService';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const forgotPasswordContrroller = async (
  req: Request,
  res: Response,
) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new validationError('Fill the email field');
    }

    await forgotPasswordService(req.body);

    const resetToken = jwt.sign({ email },process.env.SECRET_KEY as string, {
      expiresIn: '10m',
    });

    return res.status(200).json({
      success: true,
      message: 'OTP sent to your email',
      resetToken,
    });
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal server error';

    return res.status(statusCode).json({
      success: false,
      message,
    });
  }
};
