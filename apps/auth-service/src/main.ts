import { app } from './app';
import dotenv from 'dotenv';
import { connectDB } from './utils/db';
import './consumer/emailConsumer';
import './consumer/emailConsumerDoctor';

dotenv.config();

const PORT = process.env.AUTH_PORT;

connectDB();

app.listen(PORT, () => {
  console.log(`Auth service is running on port ${PORT}`);
});
