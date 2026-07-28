import mongoose from "mongoose";

import validator from 'validator';

const appointment = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    phone: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Not to say"]
    },
    termsCondition: {
        type: Boolean,
        required: true
    },
    fees: {
        type: Number,
        required: true
    },
    payment: {
        type: String,
        enum: ["pending", "paid", "failed"],
        required: true,
        default: "pending"
    },
    time: {
        type: String,
        required: true
    }
}, { timestamps: true, versionKey: false })

export const Appointment = mongoose.model("Appointment", appointment)






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


const userModel = new mongoose.Schema(
  {
    name: String,
    email: {
      unique: true,
      validation: [validator.isEmail, 'Email require'],
      type: String,
      require: true,
    },
    password: {
      type: String,
      select: false,
      required: [true, 'password is require'],
    },
    role: {
      type: String,
      default: "user",
      required: [true, 'role is require'],
    },

    is_active: {
      default: 1,
      type: Number,
    },
    status: {
      default: 1,
      type: Number,
    },
    is_verfiy:{
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true, versionKey: false },
);

export const User = mongoose.model('Users', userModel);
