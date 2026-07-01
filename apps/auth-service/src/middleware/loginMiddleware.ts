import { NextFunction } from 'express';
import { validationError } from '../utils/errorHaddler';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const loginMiddleware = (req: any, res: any, next: NextFunction) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Bearer')) {
      throw new validationError('Invalid token');
    }

    const token = header.split(' ')[1];

    if (!token) {
      throw new validationError('Missing your token');
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);

    req.user = decoded;

    next();
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
