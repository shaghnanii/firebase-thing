import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyDElGKw_7Wj6sF3u85hiN0o3v2IYARnnB4",
    authDomain: "jazz-notifications.firebaseapp.com",
    projectId: "jazz-notifications",
    messagingSenderId: "541683508768",
    appId: "1:541683508768:web:aacc4fb101e165fe4afe45",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export default defineNuxtPlugin(() => {
  return {
    provide: {
      firebase: {
        messaging,
        getToken,
        onMessage,
      },
    },
  };
});
