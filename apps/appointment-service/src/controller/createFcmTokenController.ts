import { createFcmTokenService } from "../service/createFcmTokenService"
import { Request, Response } from "express"

export const createFcmTokenController = async (req: Request, res: Response) => {
    try {

        const tokenUpdate = await createFcmTokenService(req.body)

        return res.status(201).json({
            success: true,
            message: tokenUpdate
        })

    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}