import { kafka } from "../utils/kafka"


const producer = kafka.producer()

const producerConnect = async () => {
    await producer.connect()

    console.log("appointment producer connect")
}


producerConnect()



export const appointmentEmail = async (
    patientName: string,
    doctorName: string,
    appointmentDate: any,
    appointmentTime: string,
    fees: number,
    email: string,
    receipt: string) => {
    try {

        await producer.send({
            topic: "appointment-email",
            messages: [{
                value: JSON.stringify({ patientName, doctorName, appointmentDate, appointmentTime, fees, email, receipt })
            }]
        })
    } catch (error: any) {
        throw new Error(error.message)
    }
}

