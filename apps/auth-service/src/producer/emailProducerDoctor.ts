import { kafka } from "../utils/kafka"


export const producers = kafka.producer()

const connected = async () => {
    await producers.connect()
    console.log("Doctor producer connected")
}
connected()

export const sendMail = async (email: string, otp: string) => {
    try {
        const data = { email, otp }
        await producers.send({
            topic: "reset-password-doctor",
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

