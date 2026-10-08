import mongoose from "mongoose";

if (!mongoose.models.User) {
  mongoose.model(
    "User",
    new mongoose.Schema(
      {
        name: { type: String },
        email: { type: String },
        phone: { type: String },
        role: { type: String },
      },
      { timestamps: true, collection: "users" }
    )
  );
}

const bookSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LabTest",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "success"],
    },
  },
  { timestamps: true }
);

export const Book = mongoose.models.Book || mongoose.model("Book", bookSchema, "book");
