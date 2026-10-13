import { app } from "./firebase"
import { getMessaging, getToken } from "firebase/messaging"

const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY || "BCbr5haA1ejLtUp5F8SWfLrq2RKj81VTX9A7kFRK0BbUcH8diAX18hlhJgdn8tbDssQ7BLV2bepcozNgtLEWXVQ"

export const generateFcmToken = async () => {
   try {
        if (typeof window === "undefined" || !("Notification" in window)) return null;

        if (!VAPID_KEY || VAPID_KEY === "YOUR_FIREBASE_WEB_PUSH_VAPID_KEY") {
            console.warn("FCM VAPID key is not set. Please set NEXT_PUBLIC_FIREBASE_VAPID_KEY in .env");
            return null;
        }

        const permission = await Notification.requestPermission()
        console.log("Notification permission:", permission)
        if (permission !== "granted") {
            console.warn("Notification permission was not granted. Status:", permission)
            return null;
        }

        let registration;
        if ('serviceWorker' in navigator) {
            registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
            await navigator.serviceWorker.ready;
        }

        const messaging = getMessaging(app)
        const token = await getToken(messaging, {
            vapidKey: VAPID_KEY,
            serviceWorkerRegistration: registration
        })
        console.log("FCM Token successfully generated:", token)
        return token || null
   } catch (error: any) {
        console.error("FCM Token generation error:", error.message)
        return null
   }
}
