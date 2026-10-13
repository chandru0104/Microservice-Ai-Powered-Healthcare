importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyCHYaIY-QyjcpljeUXKWZduHpzBIuhXmcI",
  authDomain: "ai-healthcare-mircro.firebaseapp.com",
  projectId: "ai-healthcare-mircro",
  storageBucket: "ai-healthcare-mircro.firebasestorage.app",
  messagingSenderId: "813735754785",
  appId: "1:813735754785:web:295324d9eef57763593760",
  measurementId: "G-SF5SP2HM5M"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification?.title || 'Healthcare Notification';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: '/favicon.ico'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
