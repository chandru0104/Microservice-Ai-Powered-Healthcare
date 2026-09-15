import mongoose from 'mongoose';

const childCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      default: 1,
      type: Number,
    },
    is_active: {
      default: 1,
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const ChildCategory = mongoose.models.ChildCategory || mongoose.model('ChildCategory', childCategorySchema);
