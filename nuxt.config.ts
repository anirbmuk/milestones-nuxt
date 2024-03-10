// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: false,
  },

  runtimeConfig: {
    app: {
      head: {
        charset: 'utf-8',
        viewport: 'width=device-width, initial-scale=1',
      },
    },
    public: {
      appEnv: '', // Override by setting NUXT_PUBLIC_APP_ENV
      baseUrl: '', // Override by setting NUXT_PUBLIC_BASE_URL
      apiBasePath: '', // Override by setting NUXT_PUBLIC_API_BASE_PATH
    },
    middleware: {
      hostUrl: '', // Override by setting NUXT_MONGODB_HOST_URL
      apiBasePath: '', // Override by setting NUXT_MONGODB_API_BASE_PATH
    },
  },

  css: ['@/assets/styles/root.css', '@/assets/styles/main.css'],

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    'nuxt-svgo',
  ],

  googleFonts: {
    display: 'swap',
    preconnect: true,
    useStylesheet: true,
    families: {
      'Noto Sans': [400, 600, 700],
    },
  },

  svgo: {
    autoImportPath: './assets/icons',
    defaultImport: 'component',
    componentPrefix: 'Icon',
  },
});
