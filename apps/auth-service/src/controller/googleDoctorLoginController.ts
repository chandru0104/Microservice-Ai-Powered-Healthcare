import { doctorGoogleLoginDoctor } from "../service/doctorGoogleLoginService"
import { Request, Response } from "express"

export const doctorGoogleLoginController = async (req: Request, res: Response) => {
    try {

        const loginDoctor = await doctorGoogleLoginDoctor(req.body)

        const { user, accessToken, refreshToken } = loginDoctor

        res.cookie(
            "doctorRefreshToken",
            refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge:7*24*60*60*1000
        }
        )

        return res.status(201).json({
            success: true,
            message: "Google login Doctor successfully",
            data: {
                user, accessToken
            }
        })


    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}