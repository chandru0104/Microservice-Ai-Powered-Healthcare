import { forgotPasswordService } from "../service/doctorForgotService"
import { Request, Response } from "express"

export const forgotPasswordController = async (req: Request, res: Response) => {
    try {
        const email =req.body
        await forgotPasswordService(email)

        res.status(200).json({
            success: true,
            message: "Otp send your email successfully"
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

