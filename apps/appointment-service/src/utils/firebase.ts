// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCHYaIY-QyjcpljeUXKWZduHpzBIuhXmcI",
//   authDomain: "ai-healthcare-mircro.firebaseapp.com",
//   projectId: "ai-healthcare-mircro",
//   storageBucket: "ai-healthcare-mircro.firebasestorage.app",
//   messagingSenderId: "813735754785",
//   appId: "1:813735754785:web:295324d9eef57763593760",
//   measurementId: "G-SF5SP2HM5M"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);



import { initializeApp, cert } from "firebase-admin/app"
import { getMessaging } from "firebase-admin/messaging"
import serviceAccount from "./ai-healthcare-mircro-firebase-adminsdk-fbsvc-d831ea4911.json"


initializeApp({
  credential: cert(serviceAccount as any)
})

export const message = getMessaging()