import { Request, Response } from "express"
import {createPaymentService,verifyPaymentService} from "../service/paymentService"

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


export const verfiyPaymentController =async (req:Request,res:Response)=>{
    try{
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature,receipt}=req.body

        if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature||!receipt){
             return res.status(400).json({
                success:false,
                message:"not fount IDs for verify payment purpose"
             })
        }

        const verfiyPayment = await verifyPaymentService(razorpay_order_id,razorpay_payment_id,razorpay_signature,receipt)

        return res.status(200).json({
            success:true,
            message:"verfiy payment successfully",
            data:verfiyPayment
        })
    }catch(error:any){
        
        return res.status(200).json({
            success:false,
            message:"verfiy payment fail",
        })
    }
}