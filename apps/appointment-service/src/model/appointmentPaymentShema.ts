import mongoose from "mongoose";


const paymentSchema =new mongoose.Schema({
    amount:{
        type:String,
        require:true
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    
})