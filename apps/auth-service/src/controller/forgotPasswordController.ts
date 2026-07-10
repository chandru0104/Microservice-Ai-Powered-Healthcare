import { Response, Request } from 'express';
import { validationError } from '../utils/errorHaddler';
import { forgotPasswordService } from '../service/forgotPasswordService';
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

     const resetToekn = await forgotPasswordService(req.body);

    return res.status(200).json({
      success: true,
      message: 'OTP sent to your email',
      resetToekn,
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
