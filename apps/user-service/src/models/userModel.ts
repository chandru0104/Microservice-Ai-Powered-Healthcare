import mongoose from 'mongoose';
import validator from 'validator';

const userModel = new mongoose.Schema(
  {
    name: String,
    email: {
      unique: true,
      validation: [validator.isEmail, 'Email require'],
      type: String,
      require: true,
    },
    password: {
      type: String,
      select: false,
      required: [true, 'password is require'],
    },
    role: {
      type: String,
      default: "user",
      required: [true, 'role is require'],
    },

    is_active: {
      default: 1,
      type: Number,
    },
    status: {
      default: 1,
      type: Number,
    },
    is_verfiy:{
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true, versionKey: false },
);

export const User = mongoose.model('Users', userModel);
