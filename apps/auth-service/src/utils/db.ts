import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL as string);
    console.log('Auth service DB running');
  } catch (error: any) {
    console.log(error.message);
  }
};
