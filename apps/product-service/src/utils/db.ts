import mongoose from 'mongoose';
import dontenv from 'dotenv';

dontenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL as string);
    console.log('Product service DB running');
  } catch (error: any) {
    console.log(error.message);
  }
};
