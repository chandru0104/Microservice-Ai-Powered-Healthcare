import mongoose from "mongoose";

const cartSchma = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    quantity:{
        type:Number,
        defalut:1,
        required:true
    }

},{timestamps:true,versionKey:false})

export const Cart =  mongoose.model("Cart",cartSchma)