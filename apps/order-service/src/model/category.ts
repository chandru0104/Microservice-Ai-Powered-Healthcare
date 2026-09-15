import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
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

export const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
