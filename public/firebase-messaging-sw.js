// Import Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/11.0.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging-compat.js');

// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyCA4CrLe4OCNZhHXecfQXAulAElz5KPmT4",
    authDomain: "almared-15b8a.firebaseapp.com",
    projectId: "almared-15b8a",
    messagingSenderId: "309197997293",
    appId: "1:309197997293:web:ae94a2bbf6a51af9b778e4"
});

const messaging = firebase.messaging();
// Background message handler
messaging.onBackgroundMessage((payload) => {
  console.log('##### Received background message ******* ', payload);
  const title = payload.data.title == null || payload.data.title == "" ? "" : payload.data.title;
  const body = payload.data.body;
  const subtitle = payload.data.subtitle || "";
  
  console.log("##### BODY: ", payload.data)
  console.log("##### TITLE: ", title)
  console.log("##### BODY: ", body)
  const nOptions = {
    body: subtitle ? subtitle + "\n" + body : body,
    icon: '/icons/icon-192x192.png',
  };
  self.registration.showNotification(title, nOptions);
});
