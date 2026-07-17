import { NextFunction, Response } from "express"


export const checkRole =  (data: string) => {
    return (req: any, res: Response, next: NextFunction) => {
        try {
            const role = req.user.role

            if (!role || role !== data) {
                return res.status(401).json({
                    success: false,
                    message: `${role} role not access to this action`
                })
            }
        return next()

        } catch (error: any) {
            return res.status(401).json({
                success: false,
                message: error.message
            })
        }
    }
}