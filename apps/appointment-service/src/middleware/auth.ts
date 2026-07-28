import { NextFunction } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const authMiddleware = async (req: any, res: any, next: NextFunction) => {
    try {
        const headers = req.headers.authorization

        if (!headers || !headers.startsWith("Bearer ")) {
            throw new Error("Missing auth token")
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