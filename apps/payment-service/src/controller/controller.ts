import { Request, Response } from "express"
import { createPaymentService, verifyPaymentService, bookTestPaymentService, verifyBookTestPaymentService } from "../service/paymentService"
import { BookPayment } from "../model/bookPaymentModel"

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


export const verfiyPaymentController = async (req: Request, res: Response) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, receipt } = req.body

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !receipt) {
            return res.status(400).json({
                success: false,
                message: "not fount IDs for verify payment purpose"
            })
        }

        const verfiyPayment = await verifyPaymentService(razorpay_order_id, razorpay_payment_id, razorpay_signature, receipt)

        return res.status(200).json({
            success: true,
            message: "verfiy payment successfully",
            data: verfiyPayment
        })
    } catch (error: any) {

        return res.status(400).json({
            success: false,
            message: "verfiy payment fail",
        })
    }
}

export const bookTestPaymentController = async (req: Request, res: Response) => {
    try {
        const bookId = req.body.bookId || req.body.orderId || req.body.testId
        const price = req.body.price || req.body.amount

        if (!bookId || typeof bookId !== "string") {
            return res.status(400).json({
                success: false,
                message: "bookId is required"
            })
        }

        const createPayment = await bookTestPaymentService(bookId, price ? Number(price) : undefined)

        return res.status(200).json({
            success: true,
            message: "Lab test payment created successfully",
            data: createPayment
        })
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const verifyBookTestPaymentController = async (req: Request, res: Response) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
        let receipt = req.body.receipt || req.body.bookId

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Missing Razorpay payment IDs"
            })
        }

        if (!receipt) {
            const foundPayment = await BookPayment.findOne({ order_id: razorpay_order_id })
            if (foundPayment?.receipt) {
                receipt = foundPayment.receipt
            }
        }

        const verifyPayment = await verifyBookTestPaymentService(razorpay_order_id, razorpay_payment_id, razorpay_signature, receipt)

        return res.status(200).json({
            success: true,
            message: "Verify book test payment successfully",
            data: verifyPayment
        })
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message || "Verify book test payment failed"
        })
    }
}