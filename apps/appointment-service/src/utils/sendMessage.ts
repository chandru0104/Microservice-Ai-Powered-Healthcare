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
        throw new Error(error.message)
    }
}