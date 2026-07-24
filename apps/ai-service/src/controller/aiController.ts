import { Request, Response } from "express";
import { aiSymptomsService, aiReportService, aiMedicineReportService } from "../service/aiService";

export const aiSymptomsController = async (req: Request, res: Response) => {
    try {
        const symptoms = await aiSymptomsService(req.body);
        return res.status(200).json({
            success: true,
            message: "Symptoms analyzed successfully",
            data: symptoms
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const aiReportController = async (req: any, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload your report"
            });
        }

        const report = await aiReportService(req.file);

        return res.status(200).json({
            success: true,
            message: "Report processed successfully",
            data: report
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const aiMedicineReportController = async (req: any, res: Response) => {
    try {
        const report = await aiMedicineReportService(req.file)

        return res.status(200).json({
            success: true,
            message: "Report processed successfully",
            daat: report
        })
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message:error.message
        })
    }
}