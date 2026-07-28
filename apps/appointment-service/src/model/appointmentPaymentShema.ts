import mongoose from "mongoose";


const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        require: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Users",
    },
    receipt: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Doctor"
    },
    currency:{
        type:String,
        default:"INR",
        require:true
    }

},{timestamps:true,versionKey:false})


export const Payment = mongoose.model("appointmentPayment", paymentSchema)