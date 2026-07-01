import mongoose from 'mongoose';

const ageGroup = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      enum: ['Children', 'Adult'],
    },
    status: {
      default: 1,
      type: Number,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    UpdatedBy: {
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

export const AgeGroup = mongoose.model('AgeGroup', ageGroup);
