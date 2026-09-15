import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    profile: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  { timestamps: true, collection: 'users' }
);

export const User = mongoose.models.User || mongoose.model('User', userSchema, 'users');

if (!mongoose.models.user) {
  mongoose.model('user', userSchema, 'users');
}
