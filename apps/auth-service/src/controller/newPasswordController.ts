import { Request, Response } from 'express';
import { validationError } from '../utils/errorHaddler';
import { newPasswordService } from '../service/newPasswordService';

export const newPasswordController = async (req: Request, res: Response) => {
  try {
    const { resetToken, newPassword, confirmPassword } = req.body;

    if (!resetToken || !newPassword || !confirmPassword) {
      throw new validationError('Please fill the required fields');
    }

    const result = await newPasswordService({
      resetToken,
      newPassword,
      confirmPassword,
    });

    res.status(201).json({
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
