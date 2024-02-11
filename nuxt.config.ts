// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    baseURL: '/movie-finder/',
  },
  devtools: { enabled: false },
  css: ['vue3-carousel/dist/carousel.css'],
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      },
    ],
    '@element-plus/nuxt',
    [
      '@nuxtjs/tailwindcss',
      {
        importStyle: true,
        themes: ['dark'],
      },
    ],
    '@nuxt/image',
    'vue3-carousel-nuxt',
  ],
  runtimeConfig: {
    public: {
      API_URL: `https://www.omdbapi.com/?type=movie&apikey=${process.env.OMDBAPI_KEY}`,
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/assets/scss/imports.scss";',
        },
      },
    },
  },
  routeRules: {
    '/*': {
      swr: process.env.NODE_ENV === 'production',
    },
    '/add': {
      ssr: false,
    },
    '/results': {
      ssr: false,
    },
  },
});
