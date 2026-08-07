import nodemailer from 'nodemailer';


const EMAIL = process.env.EMAIL;
const PASS = process.env.EMAIL_APP_PASSWORD;

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL,
    pass: PASS,
  },
});
