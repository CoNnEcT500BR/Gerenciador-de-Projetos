export default defineNuxtConfig({
  compatibilityDate: '2026-06-28',

  ssr: true,

  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],

  css: ['@/assets/css/tailwind.css'],

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:4000'
    }
  }
})
