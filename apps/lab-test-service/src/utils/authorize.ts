import { Response, NextFunction } from "express"

export const authorize = (dataRole: string) => {
    return (req: any, res: Response, next: NextFunction) => {
        const role = req.user?.role

        if (!role || !role.includes(dataRole)) {
            res.status(403).json({
                success: false,
                message: "Forbidden: Access denied",
            })
            return
        }

        next()
    }
}