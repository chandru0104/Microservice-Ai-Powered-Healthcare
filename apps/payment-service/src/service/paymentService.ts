import { payment } from "../utils/razorpay"
import { ValidationError } from "../utils/errorHandler"
import { Order } from "../model/orderModel"
import { Payment } from "../model/paymentModel"
import crypto from "crypto"

interface Option {
    amount: number,
    receipt: string,
    currency: string
}

export const createPaymentService = async (orderId: string) => {
    try {
        if (!orderId) {
            throw new ValidationError("Order not found")
        }

        const order = await Order.findById(orderId)

        if (!order) {
            throw new ValidationError("Order not found");
        }

        if (!order.price) {
            throw new ValidationError("Order price not found");
        }

        const options: Option = {
            amount: order.price * 100,
            receipt: order._id.toString(),
            currency: "INR"
        }

        const createPayment = await payment.orders.create(options)

        await Payment.create({
            amount: Number(createPayment.amount),
            currency: createPayment.currency,
            key: process.env.RAZORPAY_API_KEY,
            order_id: createPayment.id,
            receipt: createPayment.receipt
        })



        return createPayment

    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const verifyPaymentService = async (razorpay_order_id: any, razorpay_payment_id: any, razorpay_signature: any,receipt:any) => {
    try {

        const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET_KEY as string)

        sha.update(`${razorpay_order_id}|${razorpay_payment_id}`)

        const digest = sha.digest("hex")

        if (digest !== razorpay_signature) {
            throw new Error("Invalid signature ID")
        }

        
        await Order.findByIdAndUpdate(receipt, { paymetStatus: "success" }, { runValidators: true, new: true })
        return {
            razorpay_order_id, razorpay_payment_id
        }

    }catch(error:any){
      throw new Error(error.message)
    }
}