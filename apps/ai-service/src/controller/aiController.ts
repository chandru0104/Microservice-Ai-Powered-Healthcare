import { aiSymptomsService } from "../service/aiService"
import { Request, Response } from "express"

export const aiSymptomsController = async (req: Request, res: Response) => {
    try {

        const symptoms = await aiSymptomsService(req.body)

        return res.status(200).json({
            success: true,
            message: "Symptoms data",
            data: symptoms
        })
    } catch (error: any) {
        return res.status(200).json({
            success: true,
            message: error.message,
        })
    }
}