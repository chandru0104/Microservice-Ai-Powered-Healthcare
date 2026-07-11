import { kafka } from "../utils/kafka"


export const producers = kafka.producer()

const connected = async () => {
    await producers.connect()
    console.log("Doctor producer connected")
}
connected()

export const sendMail = async (email: any, otp: any) => {
    try {
        const data = { email, otp }
        await producers.send({
            topic: "reset-password",
            messages: [
                {
                    value: JSON.stringify(data)
                }
            ]
        })
    } catch (error: any) {
        throw new Error(error.message)
    }
}

