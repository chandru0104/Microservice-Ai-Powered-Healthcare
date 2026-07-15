import mongoose from 'mongoose';

const product = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    expiryOn: {
      type: String
    },
    benefit: {
      type: String,
      required: true,
    },
    image: {
      type: [String],
      required: true,
      default: [],
    },
    variant: {
      type: String,
      required: true,
    },
    subcategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubCategory',
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    childCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChildCategory',
    },
    originId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Origin',
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
    },
    ageGroupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AgeGroup',
    },
    returnPolicy: {
      type: String,
      required: true,
    },
    stock:{
      type:Number,
      required:true
    },
    is_Like:{
      type:Boolean,
      defalut:false
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
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
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret: any) {
        const { __v, ...rest } = ret;
        return rest;
      },
    },
  },
);

export const Product = mongoose.model('Product', product);
