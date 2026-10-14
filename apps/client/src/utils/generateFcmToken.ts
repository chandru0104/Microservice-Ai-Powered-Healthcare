import { app } from "./firebase";
import { getMessaging, getToken, Messaging } from "firebase/messaging";

const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

/**
 * Generates an FCM Web Push token for push notifications.
 * @returns {Promise<string | null>} The FCM token or null if permission denied / failed.
 */
export const generateFcmToken = async (): Promise<string | null> => {
  try {
    // 1. Verify browser environment and push notification support
    if (
      typeof window === "undefined" ||
      !("Notification" in window) ||
      !("serviceWorker" in navigator)
    ) {
      return null;
    }

    if (!VAPID_KEY) {
      return null;
    }

    // 2. Request notification permission if not already granted
    let permission: NotificationPermission = Notification.permission;
    if (permission !== "granted") {
      permission = await Notification.requestPermission();
    }

    if (permission !== "granted") {
      return null;
    }

    // 3. Register service worker for Firebase Messaging
    await navigator.serviceWorker.register("/firebase-messaging-sw.js", {
      scope: "/",
    });
    const registration = await navigator.serviceWorker.ready;

    // 4. Fetch the FCM token
    const messaging: Messaging = getMessaging(app);
    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    return token || null;
  } catch {
    return null;
  }
};

