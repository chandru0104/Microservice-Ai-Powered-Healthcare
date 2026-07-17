import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    paymetStatus: {
        type: String,
        default: "pending",
        enum:["pening","success"],
        require: true
    },
    shippingAddress: {
        type: String,
        require: true
    },
    items: [
        {
            product: {
                type: String,
                require: true
            },
            quantity: {
                type: Number,
                require: true
            },
            price: {
                type: Number,
                require: true
            }
        }
    ],
    price: {
        type: String,
        default: "pending",
        require: true
    }

}, { timestamps: true })

export const Order = mongoose.model("Oders", orderSchema)
