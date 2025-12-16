import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyCA4CrLe4OCNZhHXecfQXAulAElz5KPmT4",
    authDomain: "almared-15b8a.firebaseapp.com",
    projectId: "almared-15b8a",
    messagingSenderId: "309197997293",
    appId: "1:309197997293:web:ae94a2bbf6a51af9b778e4",
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
