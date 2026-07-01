import { app } from './app';
import { connectDB } from './utils/db';
import './consumer/email.consumer';

connectDB();

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`api running on port ${PORT}`);
});
