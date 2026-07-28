import { appointmentPaymentService, appointmentPaymentVerifyService } from "../service/appointmentPaymentService"
import { Request, Response } from "express"

export const appointmentPaymentController = async (req: Request, res: Response) => {
    try {
        const addPayment = await appointmentPaymentService(req.body)

        return res.status(201).json({
            success: true,
            message: "Appointment payment successfull",
            data: addPayment
        })
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const appointmentPaymentVerifyController = async (req: Request, res: Response) => {
    try {
        const appointmentPayment = await appointmentPaymentVerifyService(req.body)

        if (!appointmentPayment) {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Appointment payment verified successfully",
            data: appointmentPayment
        })
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}