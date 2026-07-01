import { Request, Response } from 'express';
import { validationError } from '../utils/errorHaddler';
import { loginSevice } from '../service/login';

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new validationError('Enter your required fields');
    }

    const loginData = await loginSevice(req.body);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      loginData,
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
