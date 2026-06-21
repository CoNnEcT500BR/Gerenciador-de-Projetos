export default defineNuxtConfig({
  ssr: true,
  modules: ['@pinia/nuxt'],
  css: ['@/assets/css/tailwind.css'],
  vite: {
    css: {
      postcss: {
        plugins: [
          require('@tailwindcss/postcss')
        ]
      }
    }
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:4000'
    }
  }
});
