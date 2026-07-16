import { NextFunction } from 'express';
import { validationError } from '../utils/errorHaddler';
import {RolePermission} from "../model/roleModel"
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface userPayload extends JwtPayload{
  id:string,
  name:string,
  role:string
}

export const loginMiddleware = async(req: any, res: any, next: NextFunction) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Bearer')) {
      throw new validationError('Invalid token');
    }

    const token = header.split(' ')[1];

    if (!token) {
      throw new validationError('Missing your token');
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as userPayload;
    
    const permission =await RolePermission.find({userRole:decoded.role}).populate("userPermission")

    const permissionArray=permission.map((a: any)=>{
      return a.userPermission?.name;
    });
    
    req.user = {
      id:decoded.id,
      name:decoded.name,
      role:decoded.role,
      permissions:permissionArray

    };

    next();
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
