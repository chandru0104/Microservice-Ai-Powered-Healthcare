import { Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
    try {
        const headers = req.headers.authorization

        if (!headers || !headers.startsWith("Bearer ")) {
            throw new Error("Invalid token")
        }

        const token = headers.split(" ")[1]

        const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY as string)
        req.user = decoded
        next()
    } catch (error: any) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}