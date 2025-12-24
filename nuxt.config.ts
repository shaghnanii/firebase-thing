// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: false,
  devtools: { enabled: true },
  // plugins: ['~/plugins/firebase.client.ts'],
  modules: ['@nuxt/image', '@nuxt/scripts', '@nuxt/ui'],
    nitro: {
    preset: 'static'
  },
   app: {
    baseURL: '/firebase-thing/' // ← IMPORTANT
  }
})