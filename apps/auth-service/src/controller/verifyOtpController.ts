import { Request, Response } from 'express';
import { verifyOtpService } from '../service/verifyOtpService';
import { validationError } from '../utils/errorHaddler';

export const verifyOtpController = async (req: Request, res: Response) => {
  try {
    const { email, userOtp } = req.body;

    if (!email || !userOtp) {
      throw new validationError('Please enter all required fields');
    }

    const token =await verifyOtpService(email, userOtp);

    return res.status(200).json({
      success: true,
      message: 'OTP verified successfully. Please enter new password',
      resetToken:token

    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
