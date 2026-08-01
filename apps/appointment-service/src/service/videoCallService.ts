import dotenv from "dotenv"

dotenv.config()


export const videoCallService = async (appointmentId: string) => {

    if (!appointmentId) {
        throw new Error("Please provied appointment ID")
    }

    const roomName = `Appointment_${appointmentId}`
    const domain = process.env.JITSI_DOMAIN
    const meetUrl = `https://${domain}/${roomName}`

    return {
        roomName, domain, meetUrl
    }


}