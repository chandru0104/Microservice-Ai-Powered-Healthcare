
import mongoose from "mongoose";




const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    specialties: {
        type: String,
        require: true
    },
    experience: {
        type: String,
        require: true
    },
    place: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        unique: true
    },
    register: {
        type: String,
        require: true
    },
    is_approved: {
        type: Boolean,
        require: true,
        default:false
    },
    profile: {
        type: String,
        require: true
    },
    is_active: {
        type:Boolean,
        default: true

    },
    is_verify:{
        type:Boolean,
        default:false
    },
    active: {
        type:Boolean,
        default: true
    },
    password:{
        type:String,
        require:true
    },
    status:{
        type:Number,
        default:1
    }


}, { timestamps: true, versionKey: false })


export const Doctor = mongoose.model("Doctor", doctorSchema)