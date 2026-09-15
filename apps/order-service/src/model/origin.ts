import mongoose from 'mongoose';

const originSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    is_active: {
      default: 1,
      type: Number,
      required: true,
    },
    status: {
      default: 1,
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Origin = mongoose.models.Origin || mongoose.model('Origin', originSchema);
