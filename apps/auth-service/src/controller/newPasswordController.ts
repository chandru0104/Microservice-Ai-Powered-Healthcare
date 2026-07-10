import { Request, Response } from 'express';
import { validationError } from '../utils/errorHaddler';
import { newPasswordService } from '../service/newPasswordService';

export const newPasswordController = async (req: Request, res: Response) => {
  try {
    const {email, token, newPassword, confirmPassword } = req.body;

    if (!email||!token || !newPassword || !confirmPassword) {
      throw new validationError('Please fill the required fields');
    }

    const result = await newPasswordService({
      email,
      token,
      newPassword,
      confirmPassword,
    });

    return res.status(201).json({
      success: true,
      data: result,
    });

  } catch (error: any) {
    const statusCode = error.statusCode || 400;
    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};
