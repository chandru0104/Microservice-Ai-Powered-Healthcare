import { message } from "./firebase"

export const messageSend = async (token: string, title: string, body: string) => {
    try {
        await message.send({
            token,
            notification: {
                title,
                body
            }
        })
    } catch (error: any) {
        console.error("FCM messageSend error:", error.message)
    }
}