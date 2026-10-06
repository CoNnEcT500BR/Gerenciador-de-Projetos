export default defineNuxtConfig({
  compatibilityDate: '2026-06-28',

  ssr: true,

  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],

  tailwindcss: {
    viewer: false
  },

  css: ['@/assets/css/tailwind.css'],

  app: {
    head: {
      title: 'NovaHub — collaboration studio',
      meta: [
        { name: 'description', content: 'Um espaço único para equipes planejar, acompanhar e conversar sobre o trabalho.' },
        { name: 'theme-color', content: '#08111f' },
        { property: 'og:site_name', content: 'NovaHub' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'NovaHub — collaboration studio' },
        { property: 'og:description', content: 'Um espaço único para equipes planejar, acompanhar e conversar sobre o trabalho.' },
        { property: 'og:image', content: '/images/brand/social-sharing.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: '/images/brand/social-sharing.jpg' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/brand/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/images/brand/favicon-48x48.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/images/brand/icon-192.png' },
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/images/brand/icon-512.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/brand/apple-touch-icon.png' }
      ]
    }
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:4000'
    }
  }
})
