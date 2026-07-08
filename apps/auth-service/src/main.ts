import { app } from './app';
import dotenv from 'dotenv';
import { connectDB } from './utils/db';
import './consumer/emailConsumer';

dotenv.config();

const PORT = process.env.AUTH_PORT || 5001;

connectDB();

app.listen(PORT, () => {
  console.log(`Auth service is running on port ${PORT}`);
});
