// Import Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/11.0.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging-compat.js');

// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDElGKw_7Wj6sF3u85hiN0o3v2IYARnnB4",
    authDomain: "jazz-notifications.firebaseapp.com",
    projectId: "jazz-notifications",
    messagingSenderId: "541683508768",
    appId: "1:541683508768:web:aacc4fb101e165fe4afe45"
});

const messaging = firebase.messaging();
// Background message handler
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icons/icon-192x192.png',
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
