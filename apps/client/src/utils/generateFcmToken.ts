import { app } from "./firebase"
import { getMessaging, getToken } from "firebase/messaging"
import { getInstallations, deleteInstallations } from "firebase/installations"

const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY || "BCbr5haA1ejLtUp5F8SWfLrq2RKj81VTX9A7kFRK0BbUcH8diAX18hlhJgdn8tbDssQ7BLV2bepcozNgtLEWXVQ"

export const generateFcmToken = async () => {
    try {
        if (typeof window === "undefined" || !("Notification" in window)) {
            console.warn("Notifications are not supported in this browser environment.");
            return null;
        }

        if (!VAPID_KEY || VAPID_KEY === "YOUR_FIREBASE_WEB_PUSH_VAPID_KEY") {
            console.warn("FCM VAPID key is not set. Please set NEXT_PUBLIC_FIREBASE_VAPID_KEY in .env");
            return null;
        }

        let permission = Notification.permission;
        if (permission !== "granted") {
            permission = await Notification.requestPermission();
        }
        console.log("Notification permission:", permission);
        if (permission !== "granted") {
            console.warn("Notification permission was not granted. Status:", permission);
            return null;
        }

        let registration: ServiceWorkerRegistration | undefined;
        if ('serviceWorker' in navigator) {
            try {
                await navigator.serviceWorker.register('/firebase-messaging-sw.js', { scope: '/' });
                registration = await navigator.serviceWorker.ready;
            } catch (swErr: any) {
                console.warn("Service worker registration error:", swErr?.message);
            }
        }

        const messaging = getMessaging(app);

        // Attempt 1: Fetch FCM token
        try {
            const token = await getToken(messaging, {
                vapidKey: VAPID_KEY,
                serviceWorkerRegistration: registration
            });
            if (token) {
                console.log("FCM Token successfully generated:", token);
                return token;
            }
        } catch (initialErr: any) {
            console.warn("FCM initial getToken failed (attempting installation cache recovery):", initialErr?.message);

            // Self-healing recovery: If 401 Unauthorized or credential error occurred,
            // clear the stale/corrupted Firebase Installations cache from IndexedDB
            try {
                const installations = getInstallations(app);
                await deleteInstallations(installations);
                console.log("Stale Firebase installations cache cleared successfully.");
            } catch (delErr: any) {
                console.warn("Could not delete installation entry:", delErr?.message);
            }

            // Retry after clearing stale installation
            const tokenOnRetry = await getToken(messaging, {
                vapidKey: VAPID_KEY,
                serviceWorkerRegistration: registration
            });
            if (tokenOnRetry) {
                console.log("FCM Token successfully generated after recovery:", tokenOnRetry);
                return tokenOnRetry;
            }
        }

        return null;
    } catch (error: any) {
        console.error("FCM Token generation error:", error?.message || error);
        return null;
    }
}
