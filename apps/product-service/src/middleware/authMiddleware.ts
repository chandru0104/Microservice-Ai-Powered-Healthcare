import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { NextFunction } from 'express';

dotenv.config();

export const authMiddleware = (req: any, res: any, next: NextFunction) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Bearer')) {
      throw new Error('Invalid token');
    }
    const token = header.split(' ')[1];

    if (!token) {
      throw new Error('Invalid token');
    }

    const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY as string);

    req.user = decoded;
    next();
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
