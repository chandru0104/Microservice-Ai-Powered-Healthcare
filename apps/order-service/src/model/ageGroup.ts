import mongoose from 'mongoose';

const ageGroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ['Children', 'Adult'],
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

export const AgeGroup = mongoose.models.AgeGroup || mongoose.model('AgeGroup', ageGroupSchema);
