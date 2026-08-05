
import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    specialties: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        uniqued: true
    },
    register: {
        type: String,
        required: true
    },
    is_approved: {
        type: Boolean,
        required: true,
        default:false
    },
    profile: {
        type: String,
        required: true
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
        required:true
    },
    status:{
        type:Number,
        default:1
    },
       fcmtoken:{
        required:true,
        type:String
    }
   


}, { timestamps: true, versionKey: false })

doctorSchema.index({name:1})
doctorSchema.index({specialties:1})

export const Doctor = mongoose.model("Doctor", doctorSchema)