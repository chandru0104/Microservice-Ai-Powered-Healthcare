import { Payment } from "../model/appointmentPaymentShema"
import { PaymentRazorpay } from "../utils/razorpay"
import crypto from "crypto"
import { Appointment } from "../model/appoinmentShema"
import { appointmentEmail } from "../producer/producer"
import { User } from "../model/appoinmentShema"
import { Doctor } from "../model/appoinmentShema"

// interface paymentData {
//     amount: number,
//     doctor: string,
//     receipt: string,
//     user: string,
//     currency: string
// }

interface verfiyPayment {
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string,
    receipt: string
}

export const appointmentPaymentService = async (receipt: string) => {
    try {


        const appointmentData = await Appointment.findById(receipt)

        if (!appointmentData) {
            throw new Error("Appointment not found")
        }
        await PaymentRazorpay.orders.create({
            amount: appointmentData.fees,
            currency: "INR",
            receipt: receipt
        })

        const pay = await Payment.create({ amount: appointmentData.fees, doctor: appointmentData.doctor, receipt: receipt, user: appointmentData.user })

        return pay

    } catch (error: any) {
        throw new Error(error.message)
    }
}


export const appointmentPaymentVerifyService = async (data: verfiyPayment) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, receipt } = data

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !receipt) {
            throw new Error("Please provided all values")
        }

        const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET_KEY as string)

        sha.update(`${razorpay_order_id}|${razorpay_payment_id}`)

        const digest = sha.digest("hex")

        if (digest !== razorpay_signature) {
            throw new Error("Your payment verfication as failed")
        }
        const emailData = await Appointment.findByIdAndUpdate(receipt, { payment: "paid" }, { runValidators: true, new: true })
        if (!emailData) {
            throw new Error("Appointment not found")
        }
        const findUser = await User.findById({ id: emailData.user })

        if (!findUser) {
            throw new Error("User not found")
        }

        const findDoctor = await Doctor.findById({ id: emailData.doctor })

        if (!findDoctor) {
            throw new Error("Doxtor not found")
        }

        console.log(findUser.email, findUser.name, emailData.fees, emailData.time, emailData.date, findDoctor.name, receipt)

        appointmentEmail(findUser.name!,findDoctor.name!,emailData.date!,emailData.time!, emailData.fees!, findUser.email!, receipt!)

        return { razorpay_order_id, razorpay_payment_id }

    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const appointmentPaymentListService = async () => {
    try {
        const listPayment = await Payment.find().populate(["doctor", "user"])

        return listPayment

    } catch (error: any) {
        throw new Error(error.message)
    }
}


export const appointmentPaymentUserListService = async (id: any) => {
    try {
        if (!id) {
            throw new Error("Please provide your Id")
        }

        const listUser = await Payment.find({ user: id }).populate(["doctor", "user"])

        return listUser
    } catch (error: any) {
        throw new Error(error.message)
    }
}