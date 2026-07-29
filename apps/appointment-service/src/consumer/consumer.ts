import { kafka } from "../utils/kafka";
import { transporter } from "../utils/nodeMailer";
import { appointmentPaymentSuccessTemplate } from "../utils/emailTemplate";
import dotenv from "dotenv";

dotenv.config();

const consumer = kafka.consumer({
    groupId: "appointment",
});

const startConsumer = async () => {
    try {
        await consumer.connect();
        console.log("Appointment consumer connected");

        await consumer.subscribe({
            topic: "appointment-email",
            fromBeginning: false,
        });

        console.log("Subscribed to appointment-email");

        await consumer.run({
            eachMessage: async ({ message }) => {
                try {
                    if (!message.value) return;

                    const data = JSON.parse(message.value.toString());

                    console.log("Received:", data);

                    const {
                        patientName,
                        doctorName,
                        appointmentDate,
                        appointmentTime,
                        fees,
                        email,
                        receipt,
                    } = data;

                    await transporter.sendMail({
                        from: process.env.EMAIL,
                        to: email,
                        subject: "Care Hub Appointment",
                        html: appointmentPaymentSuccessTemplate(
                            patientName,
                            doctorName,
                            appointmentDate,
                            appointmentTime,
                            fees,
                            receipt
                        ),
                    });

                    console.log(`Email sent to ${email}`);
                } catch (err) {
                    console.error("Mail Error:", err);
                }
            },
        });
    } catch (err) {
        console.error("Consumer Error:", err);
    }
};

startConsumer();