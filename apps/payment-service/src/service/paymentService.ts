import { payment } from "../utils/razorpay"
import { ValidationError } from "../utils/errorHandler"
import { Order } from "../model/orderModel"
import { Payment } from "../model/paymentModel"
import { Book } from "../model/bookModel"
import { BookPayment } from "../model/bookPaymentModel"
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
            amount: Math.round(order.price * 100),
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

        const res = await Payment.findById(createPayment.id)



        return res

    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const verifyPaymentService = async (razorpay_order_id: any, razorpay_payment_id: any, razorpay_signature: any, receipt: any) => {
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

    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const bookTestPaymentService = async (bookId: string, price?: number) => {
    try {
        if (!bookId) {
            throw new ValidationError("Booking ID not found")
        }

        const book = await Book.findById(bookId) || await Order.findById(bookId)
        const finalPrice = price ? Number(price) : (book ? book.price : 0)

        if (!finalPrice && (!book || !book.price)) {
            throw new ValidationError("Payment price not found")
        }

        const orderAmount = finalPrice || book?.price

        const options: Option = {
            amount: Math.round(Number(orderAmount) * 100),
            receipt: bookId,
            currency: "INR"
        }

        const createPayment = await payment.orders.create(options)

        await BookPayment.create({
            amount: Number(createPayment.amount),
            currency: createPayment.currency,
            key: process.env.RAZORPAY_API_KEY,
            order_id: createPayment.id,
            receipt: bookId,
            status: "pending"
        })

        return {
            id: createPayment.id,
            order_id: createPayment.id,
            receipt: bookId,
            amount: createPayment.amount,
            currency: createPayment.currency
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const verifyBookTestPaymentService = async (razorpay_order_id: any, razorpay_payment_id: any, razorpay_signature: any, receipt: any) => {
    try {
        const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET_KEY as string)

        sha.update(`${razorpay_order_id}|${razorpay_payment_id}`)

        const digest = sha.digest("hex")

        if (digest !== razorpay_signature) {
            throw new Error("Invalid signature ID")
        }

        if (receipt) {
            await Book.findByIdAndUpdate(receipt, { paymentStatus: "success", paymetStatus: "success" }, { runValidators: true, new: true })
            await Order.findByIdAndUpdate(receipt, { paymetStatus: "success" }, { runValidators: true, new: true })
        }

        await BookPayment.findOneAndUpdate({ order_id: razorpay_order_id }, { status: "success" })

        return {
            razorpay_order_id, razorpay_payment_id
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
}

