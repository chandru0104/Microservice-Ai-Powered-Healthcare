import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        require: true
    },
    currency: {
        type: String,
        require: true
    },
    key: {
        type: String,
        require: true
    },
    order_id: {
        type: String,
        require: true
    },
    receipt: {
        type: String,
        require: true
    }
})

export const Payment = mongoose.model("Payment", paymentSchema)