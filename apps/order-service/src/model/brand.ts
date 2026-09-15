import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema(
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

export const Brand = mongoose.models.Brand || mongoose.model('Brand', brandSchema);
