<script setup lang="ts">
import { onMounted } from 'vue';
const { $firebase } = useNuxtApp();

onMounted(async () => {
  try {

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.warn('Notification permission not granted.');
      return;
    }

    // ✅ Manually register your service worker at the correct path
    const registration = await navigator.serviceWorker.register(
      `${import.meta.env.BASE_URL}firebase-messaging-sw.js`
    );
    console.log('✅ Service Worker registered:', registration.scope);


    // ✅ Tell Firebase to use *this specific* service worker
    const token = await $firebase.getToken($firebase.messaging, {
      vapidKey: 'BIS5PBxTH-eOUcnGIQPrfALiKEPD7yxga5-iU_QUCqdvi0tD39mZElxiA5TqAugVFOIYbZVX-Zo0y_-FFWv3lE0',
      serviceWorkerRegistration: registration,
    });
    console.log('✅ Firebase Device Token:', token);

    // Optional: send token to backend
    // await $fetch('https://localhost:7095/api/auth/update-device-token', {
    //   method: 'POST',
    //   body: { token }
    // });

    // ✅ Listen for messages while app is open
    $firebase.onMessage($firebase.messaging, (payload) => {
      console.log('📩 Foreground message received:', payload);
      alert(`${payload.notification.title}: ${payload.notification.body}`);
    });

  } catch (error) {
    console.error('Error getting token', error);
  }

  // Listen for foreground messages
  $firebase.onMessage($firebase.messaging, (payload) => {
    console.log('Foreground message received:', payload);
    alert(`${payload.notification.title}: ${payload.notification.body}`);
  });
});
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold">Firebase Notifications Test</h1>
  </div>
</template>
