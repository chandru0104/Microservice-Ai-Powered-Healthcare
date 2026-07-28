import { Payment } from "../model/appointmentPaymentShema"
import { PaymentRazorpay } from "../utils/razorpay"
import crypto from "crypto"
import { Appointment } from "../model/appoinmentShema"

interface paymentData {
    amount: number,
    doctor: string,
    receipt: string,
    user: string,
    currency: string
}

interface verfiyPayment {
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string,
    receipt: string
}

export const appointmentPaymentService = async (data: paymentData) => {
    try {
        const { amount, doctor, receipt, user } = data

        if (!amount || !doctor || !receipt || !user) {
            throw new Error("Please pass all values")
        }

        await PaymentRazorpay.orders.create({
            amount: amount,
            currency: "INR",
            receipt: receipt
        })

        const pay = await Payment.create({ amount, doctor, receipt, user })

        return pay

    } catch (error: any) {
        throw new Error(error.message)
    }
}


export const appointmentPaymentVerifyService = async (data: verfiyPayment) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, receipt } = data

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || receipt) {
            throw new Error("Please provided all values")
        }

        const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET_KEY as string)

        sha.update(`${razorpay_order_id}|${razorpay_payment_id}`)

        const digest = sha.digest("hex")

        if (digest !== razorpay_signature) {
            throw new Error("Your payment verfication as failed")
        }
        await Appointment.findByIdAndUpdate(Appointment, { payment: "paid" }, { runValidators: true, new: true })

        return { razorpay_order_id, razorpay_payment_id }
        
    } catch (error: any) {
        throw new Error(error.message)
    }
}