import { transporter } from '../utils/nodeMailer';
import { kafka } from '../utils/kafka';
import dotenv from 'dotenv';
import { otpTemplate } from '../utils/otpTemplate';

dotenv.config();

export const consumer = kafka.consumer({
  groupId: 'reset-pass',
});

const connectConsumer = async () => {
  try {
    consumer.connect();
    console.log('auth service consumer connected');

    await consumer.subscribe({
      topic: 'reset-password',
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ message }) => {
        console.log(message);

        if (!message.value) {
          throw new Error('Missing your data');
        }

        const data = JSON.parse(message.value?.toString());

        const { email, otp } = data;

        await transporter.sendMail({
          from: 'chandru0104@gmail.com',
          to: email,
          subject: 'Care Hub OTP Verification',
          html: otpTemplate(otp),
        });
      },
    });
  } catch (error: any) {
    console.log(error.message);
  }
};

connectConsumer();
