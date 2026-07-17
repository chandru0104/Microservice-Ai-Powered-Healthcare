import { NextFunction } from "express"
import jwt from "jsonwebtoken"

export const authMiddleware = async (req: any, res: any,next:NextFunction) => {
    try {
        const header = req.headers.authorization

        if (!header || !header.startsWith("Bearer")) {
            throw new Error("Please Login missing your auth token")
        }
        const token = header.split(" ")[1]

        const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY as string)

        req.user = decoded
        next()
    } catch (error: any) {
        return res.status(401).json({
           success:false,
           message:error.message
        })
    }
}