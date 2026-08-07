import { kafka } from "../utils/kafka"
import { transporter } from "../utils/nodeMailer"
import { otpTemplate } from "../utils/otpTemplate"



export const consumer = kafka.consumer({
    groupId: "email-doctor",
})

export const connectConsumer = async () => {
    try {
        await consumer.connect()
        console.log("consumer doctor connect")

        await consumer.subscribe({
            topic: "reset-password-doctor",
            fromBeginning: false,
        })

        await consumer.run({
            eachMessage: async ({ message }) => {

                if (!message.value) {
                    throw new Error('Missing your data');
                }

                const data = JSON.parse(message.toString())

                const { email, otp } = data

                await transporter.sendMail({
                    from: "chandrus0104@gmail.com",
                    to: email,
                    subject: 'Care Hub OTP Verification',
                    html: otpTemplate(otp)
                })

                console.log(`send emain in ${email}`)
            }
        })

    } catch (error: any) {

    }

}
connectConsumer()