import { verfiyOtpDoctorService } from "../service/verfiyOtpDoctorService"

import { Request, Response } from "express"

export const verfiyOtpDoctorController = async (req: Request, res: Response) => {
    try {
        const { email, userOtp } = req.body

        if (!email && !userOtp) {
            res.status(400).json({
                success: false,
                message: "Please fill all field"
            })

        }
        const verfiyOtp =await verfiyOtpDoctorService(email, userOtp)

        return res.status(200).json({
            success: true,
            message: "Your otp verify successfully",
            resetToken: verfiyOtp
        })
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}