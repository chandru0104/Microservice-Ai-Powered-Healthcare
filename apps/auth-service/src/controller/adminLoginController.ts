import {adminLoginService} from "../service/adminLoginService"
import { Request,Response } from "express";

export const adminLoginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error('Enter your required fields');
    }

    const loginData = await adminLoginService(req.body);

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
    const { id, role, name, userEmail, permission,accessToken } = loginData

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: { id, role, name, userEmail, permission,accessToken }
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
