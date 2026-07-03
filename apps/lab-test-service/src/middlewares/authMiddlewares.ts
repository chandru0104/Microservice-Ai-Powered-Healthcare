import jwt from "jsonwebtoken"
import { NextFunction } from "express"
import dotenv from "dotenv"


dotenv.config

const JWT_SECRET = process.env.JWT_SECRET as string

export const authMiddlewares = (req: any, res: any, next: NextFunction) => {
    try {
        const header = req.headers.authorization
        if (!header || header.startsWith("Bearer")) {
            throw new Error("Missing your auth token")
        }

        const authToken = header.split(" ")[1]

        const decoded = jwt.verify(authToken, JWT_SECRET)

        req.user = decoded

        next()
    } catch (error: any) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }

}