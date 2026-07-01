import mongoose from "mongoose";

const testCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey:false
  }
);

export const TestCategory = mongoose.model(
  "TestCategory",
  testCategorySchema
);