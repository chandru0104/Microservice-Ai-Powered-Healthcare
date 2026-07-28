import mongoose from "mongoose";


const appointment = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctors",
        required: true
    },
    date: {
        type: Date,
        require: true
    },
    day: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    phone: {
        type: Number,
        require: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Not to say"]
    },
    termsCondition: {
        type: Boolean,
        require: true
    },
    fees: {
        type: Number,
        require: true
    },
    payment: {
        enum: ["pending", "paid", "failed"],
        require: true
    },
    time:{
        require:true,
        type:String
    }

}, { timestamps: true })

export const Appointment = mongoose.model("Appointment", appointment)