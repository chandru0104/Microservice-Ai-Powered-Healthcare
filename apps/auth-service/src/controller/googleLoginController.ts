import { googleLoginService } from "../service/googleLoginService"
import { Request, Response } from "express"

export const googleLoginController = async (req: Request, res: Response) => {
    try {
        const { code, role } = req.body
        if (!code || !role) {
            return res.status(400).json({
                success: false,
                message: "Please send the required values",
            });
        }
        const verify = await googleLoginService(req.body)

       return res.status(200).json({
            success: true,
            message: "Google Login Successfully",
            data: verify
        })
    } catch (error: any) {
       return res.status(400).json({
            success: false,
            message: "Google Login Failed",
        })
    }
}