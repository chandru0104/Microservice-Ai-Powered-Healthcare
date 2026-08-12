import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    order_id: {
        type: String,
        required: true
    },
    receipt: {
        type: String,
        required: true
    }
})

export const Payment = mongoose.model("Payment", paymentSchema)