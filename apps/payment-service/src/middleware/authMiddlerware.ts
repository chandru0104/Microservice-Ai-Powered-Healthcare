import jwt from "jsonwebtoken"
import { NextFunction } from "express"

export const authMiddleware = async (req: any, res: any, next: NextFunction) => {
    try {
        const header = req.headers.authorization

        if (!header || !header.startsWith("Bearer")) {
            return res.status(404).json({
                success: false,
                message: "Unauthorization"
            })
        }

        const token = header.split(" ")[1]

        const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY as string)
       
        req.user = decoded
         next()


    } catch (error: any) {
        return res.status(404).json({
            success: false,
            message: error.message
        })
    }
}