
import { videoCallService } from "../service/videoCallService"
import { Request, Response } from "express"

export const videoCallController = async (req: Request, res: Response) => {
    try {
        const { appointmentId } = req.body;

        const call = await videoCallService(appointmentId)

        return res.status(200).json({
            success: true,
            message: "Done video call as redy to join",
            data: call
        })
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}