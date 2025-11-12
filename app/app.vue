<script setup lang="ts">
import { ref, onMounted } from 'vue';
const { $firebase } = useNuxtApp();

const token = ref<string | null>(null);
const isCopied = ref(false);

const copyToClipboard = async () => {
  if (token.value) {
    await navigator.clipboard.writeText(token.value);
    isCopied.value = true;
    setTimeout(() => (isCopied.value = false), 2000);
  }
};

onMounted(async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.warn('Notification permission not granted.');
      return;
    }

    // ✅ Register service worker at correct path
    const registration = await navigator.serviceWorker.register(
      `${import.meta.env.BASE_URL}firebase-messaging-sw.js`
    );
    console.log('✅ Service Worker registered:', registration.scope);

    // ✅ Get Firebase token
    const fcmToken = await $firebase.getToken($firebase.messaging, {
      vapidKey: 'BIS5PBxTH-eOUcnGIQPrfALiKEPD7yxga5-iU_QUCqdvi0tD39mZElxiA5TqAugVFOIYbZVX-Zo0y_-FFWv3lE0',
      serviceWorkerRegistration: registration,
    });

    token.value = fcmToken;
    console.log('✅ Firebase Device Token:', fcmToken);

    // ✅ Optional: send to backend
    // await $fetch('/api/update-device-token', {
    //   method: 'POST',
    //   body: { token: fcmToken },
    // });

    // ✅ Foreground message listener
    $firebase.onMessage($firebase.messaging, (payload) => {
      console.log('📩 Foreground message received:', payload);
      alert(`${payload.notification.title}: ${payload.notification.body}`);
    });

  } catch (error) {
    console.error('Error getting token', error);
  }
});
</script>

<template>
  <div class="p-4 max-w-lg mx-auto">
    <h1 class="text-2xl font-bold mb-4">Firebase Notifications Test</h1>

    <div v-if="token" class="space-y-2">
      <input
        v-model="token"
        readonly
        class="w-full border rounded-lg p-2 text-sm"
        placeholder="Firebase Token will appear here"
      />

      <button
        @click="copyToClipboard"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {{ isCopied ? 'Copied!' : 'Copy to Clipboard' }}
      </button>
    </div>

    <div v-else class="text-gray-500 mt-4">
      Waiting for Firebase token...
    </div>
  </div>
</template>