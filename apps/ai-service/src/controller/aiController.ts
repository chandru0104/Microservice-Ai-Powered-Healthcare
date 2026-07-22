import { aiSymptomsService, aiReportService } from "../service/aiService"
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
            success: false,
            message: error.message,
        })
    }
}

export const aiReportController = async (req: any, res: Response) => {
    try {
        const file = req.file
        
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Please upload your report",

            })
        }
        const report = await aiReportService(file)

        return res.status(200).json({
            success: true,
            message: "Report summary as successfully done",
            data: report
        })
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}