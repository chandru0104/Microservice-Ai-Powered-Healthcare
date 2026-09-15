import mongoose from 'mongoose';

const subCategorySchema = new mongoose.Schema(
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

export const SubCategory = mongoose.models.SubCategory || mongoose.model('SubCategory', subCategorySchema);
