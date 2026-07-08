import { kafka } from '../utils/kafka';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import {otpTemplate} from "../utils/otpTemplate"
dotenv.config();

const EMAIL = process.env.EMAIL;
const PASS = process.env.EMAIL_APP_PASSWORD;

const consumer = kafka.consumer({
  groupId: 'email-group',
});
console.log('consumer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL,
    pass: PASS,
  },
});

const connectConsumer = async () => {
  try {
    await consumer.connect();

    console.log('Consumer Connected');

    await consumer.subscribe({
      topic: 'send-mail',
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ message }) => {
        console.log(message);
        try {
          if (!message.value) {
            throw new Error('Message is null');
          }
 
          const data = JSON.parse(message.value.toString());
 
          const { email, otp } = data;

          await transporter.sendMail({
            from: EMAIL,
            to: email,
            subject: 'Care Hub OTP Verification',
            html: otpTemplate(otp),
          });

          console.log(`Email Sent ${email}`);
        } catch (error: any) {
          console.log(error.message);
        }
      },
    });
  } catch (error: any) {
    console.log(error.message);
  }
};

connectConsumer();
