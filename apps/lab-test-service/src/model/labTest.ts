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
    authorDetailsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
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
      enum:["Male","Female"],
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
    status: {
      type: Number,
      default: 1
    }
  },
  {
    timestamps: true,
    versionKey:false
  }
);

export const LabTest = mongoose.model("LabTest", labTestSchema);