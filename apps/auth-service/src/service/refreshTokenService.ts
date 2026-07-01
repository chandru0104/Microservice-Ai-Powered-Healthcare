import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

interface accessTokenDetails {
  id: string;
  role: string;
}

export const refreshTokenService = async (refreshToken: string) => {
  try {
    const token = jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET_KEY as string,
    ) as accessTokenDetails;

    if (!token) {
      return 'Invalid refresh token';
    }

    const accessToken = jwt.sign(
      { id: token.id, role: token.role },
      process.env.ACCESS_SECRET_KEY as string,
      {
        expiresIn: '1h',
      },
    );

    return accessToken

  } catch (error: any) {
    throw new Error(error.message);
  }
};
