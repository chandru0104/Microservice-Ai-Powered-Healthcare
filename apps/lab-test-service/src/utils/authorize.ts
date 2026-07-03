import { Response, NextFunction } from "express"

export const authorize = (dataRole: string) => {
    return async (req: any, res: Response, next: NextFunction) => {
        const role = await req.user.role 
        if (!role || role.includes(dataRole)) {
            res.status(403).json({
                success: true,
                message: "Forbidden: Access denied",
            })
        }

        next()

    }
}