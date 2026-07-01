import { Request, Response } from 'express';
import { verifyOtpService } from '../service/verifyOtpService';
import { validationError } from '../utils/errorHaddler';

export const verifyOtpController = async (req: Request, res: Response) => {
  try {
    const { resetToken, userOtp } = req.body;

    if (!resetToken || !userOtp) {
      throw new validationError('Please enter all required fields');
    }

    await verifyOtpService(resetToken, userOtp);

    return res.status(200).json({
      success: true,
      message: 'OTP verified successfully',
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
