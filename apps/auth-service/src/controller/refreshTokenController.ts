import { refreshTokenService } from '../service/refreshTokenService';
import { Request, Response } from 'express';

export const refreshTokenController = async (req: Request, res: Response) => {
  const  refreshToken  = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new Error('Refresh Token expried');
  }

  const accessToken = await refreshTokenService(refreshToken);

  res.status(200).json({
    success: true,
    message: 'Access token are generator',
    accessToken,
  });
};
