import mongoose from "mongoose";

const labTestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TestCategory",
      required: true,
    },
    authorDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sampleType: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    ageGroup: {
      type: String,
      required: true,
    },
    reportDelivery: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const LabTest = mongoose.model("LabTest", labTestSchema);