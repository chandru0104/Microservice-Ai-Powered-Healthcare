import mongoose from "mongoose";

const bookPaymentSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      default: "INR",
    },
    key: {
      type: String,
      required: true,
    },
    order_id: {
      type: String,
      required: true,
    },
    receipt: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "success"],
    },
  },
  { timestamps: true }
);

export const BookPayment = mongoose.models.BookPayment || mongoose.model("BookPayment", bookPaymentSchema, "bookpayment");
