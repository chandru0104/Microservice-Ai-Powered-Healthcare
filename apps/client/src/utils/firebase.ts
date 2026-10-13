import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCHYaIY-QyjcpljeUXKWZduHpzBIuhXmcI",
  authDomain: "ai-healthcare-mircro.firebaseapp.com",
  projectId: "ai-healthcare-mircro",
  storageBucket: "ai-healthcare-mircro.firebasestorage.app",
  messagingSenderId: "813735754785",
  appId: "1:813735754785:web:295324d9eef57763593760",
  measurementId: "G-SF5SP2HM5M"
};

export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;