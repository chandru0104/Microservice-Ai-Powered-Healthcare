import mongoose from 'mongoose';

const brandModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      default: 1,
      type: Number,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    is_active: {
      default: 1,
      type: Number,
      required: true,
    },
  },
  { timestamps: true,
    toJSON:{
      transform:function(doc,ret:any){
        const { __v, ...rest } = ret; 
        return rest;
      }
    }
   },
);

export const BrandModel = mongoose.model('Brand', brandModel);
