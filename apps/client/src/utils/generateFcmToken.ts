import { app } from "./firebase"
import { getMessaging, getToken } from "firebase/messaging"

const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY || "YOUR_FIREBASE_WEB_PUSH_VAPID_KEY"

export const generateFcmToken = async () => {
   try {
        if (typeof window === "undefined" || !("Notification" in window)) return null;

        if (!VAPID_KEY || VAPID_KEY === "YOUR_FIREBASE_WEB_PUSH_VAPID_KEY") {
            console.warn("FCM VAPID key is not set. Please set NEXT_PUBLIC_FIREBASE_VAPID_KEY in .env");
            return null;
        }

        const permission = await Notification.requestPermission()
        if (permission !== "granted") return null;

        const messaging = getMessaging(app)
        const token = await getToken(messaging, {
            vapidKey: VAPID_KEY
        })
        return token || null
   } catch (error: any) {
        console.error("FCM Token generation error:", error.message)
        return null
   }
}
