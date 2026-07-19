import { Request, Response } from "express"
import {createPaymentService} from "../service/paymentService"

export const createPaymentController = async (req: Request, res: Response,) => {
    try {
        const { orderId } = req.body

        if (!orderId || typeof orderId !== "string") {
            return res.status(400).json({ success: false, message: "orderId query param is required" })
        }

        const createPayment = await createPaymentService(orderId)

        return res.status(200).json({
            success: true,
            message: "payment successfully",
            data: createPayment
        })

    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}