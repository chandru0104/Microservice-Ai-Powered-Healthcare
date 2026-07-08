import { validationError } from '../utils/errorHandler';
import {
  userAddService,
  userAllListService,
  userDeleteService,
  userProfileService,
  userUpdateService,
  otpSet,
  otpGet,
} from '../services/userServices';


import { Request, Response } from 'express';

export const otpSetController = async (req: Request, res: Response) => {
  const result = await otpSet({ ...req.body });
  res.json({
    success: true,
    message: 'send otp',
    result,
  });
};

export const verifyOtpController = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    throw new validationError('Please enter your email and otp');
  }
  try {
    await otpGet({ ...req.body });
    res.status(200).json({
      success: true,
      message: 'verify your otp',
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//user add
export const userAddController = async (req: Request, res: Response) => {
  try {
    const user = await userAddService({ ...req.body });

    res.status(201).json({
      success: true,
      message: "User added successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      mesaage: error.message,
    });
  }
};

//user list
export const userListController = async (req: Request, res: Response) => {
  try {
    const user = await userAllListService();

    res.status(200).json({
      success: true,
      message: 'User listed successfully',
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//user delete
export const userDeleteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new validationError('Please select user');
    }

    await userDeleteService(id);

    res.status(200).json({
      success: true,
      message: 'User deleted',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//user profile
export const userProfileController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new validationError('Invalid user');
    }
    const user = await userProfileService(id);
    res.status(200).json({
      success: true,
      message: 'user profile',
      data: user,
    });
  } catch (error: any) {
    throw new validationError(error.message);
  }
};

///user update
export const userUpdateController = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedData = await userUpdateService(id, data);


    res.status(201).json({
      success: true,
      message: 'User data updated',
      data: updatedData,
    });
  } catch (error: any) {
    throw new validationError(error.message);
  }
};

