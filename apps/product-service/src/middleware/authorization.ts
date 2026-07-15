import { Response, NextFunction } from "express";

export const Authorization = (...allowedRoles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    try {
      const role = req.user?.role;

      if (!role || !allowedRoles.includes(role)) {
        return res.status(403).json({
          success: false,
          message: `${role || 'Unknown user'} can't access this resource`,
        });
      }

      return next();
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Internal server error during authorization",
      });
    }
  };
};