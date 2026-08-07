import { kafka } from '../utils/kafka';

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
  console.log('Producer Connected');
};

connectProducer();

export const sendMail = async (email: string, otp: string) => {
  const data = { email, otp };
  try {
    await producer.send({
      topic: 'send-mail',
      messages: [
        {
          value: JSON.stringify(data, null, 2),
        },
      ],
    });

    console.log(`Message Sent`);
  } catch (error: any) { 
    throw new Error(error.message);
  }
};
