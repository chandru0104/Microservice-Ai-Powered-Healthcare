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

    res.cookie(
      "refreshToken",
      loginData.refreshToken,
      {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000

      }
    )
    const { id, role, name, userEmail, accessToken } = loginData

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: { id, role, name, userEmail, accessToken }
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
