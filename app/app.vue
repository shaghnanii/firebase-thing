<script setup lang="ts">
import { onMounted } from 'vue';
const { $firebase } = useNuxtApp();

onMounted(async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await $firebase.getToken($firebase.messaging, {
        vapidKey: 'BIS5PBxTH-eOUcnGIQPrfALiKEPD7yxga5-iU_QUCqdvi0tD39mZElxiA5TqAugVFOIYbZVX-Zo0y_-FFWv3lE0', // from Firebase console → Project Settings → Cloud Messaging → Web Push certificates
      });

      console.log('Firebase Device Token: ', token);

      // Send this token to your backend for saving in user's record:
      // await $fetch('https://localhost:7095/api/auth/update-device-token', {
      //   method: 'POST',
      //   body: { token }
      // });
    } else {
      console.warn('Permission not granted for notifications');
    }
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
