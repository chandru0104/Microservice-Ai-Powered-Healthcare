import { kafka } from '../utils/kafka';

export const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
  console.log('auth producer connected');
};

connectProducer();

export const sendMail = async (email: any, otp: any) => {
  const data = { email, otp };
  try {
    await producer.send({
      topic: 'reset-password',
      messages: [
        {
          value: JSON.stringify(data),
        },
      ],
    });
  } catch (error: any) {
    console.log(error.message);
  }
};
