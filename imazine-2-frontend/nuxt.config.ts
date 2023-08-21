// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/google-fonts',
    '@sidebase/nuxt-session',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],
  plugins: [
    '@/plugins/bootstrap.client.ts',
    '@/plugins/markdown-it.client.ts',
  ],
  googleFonts: {
    download: true,
    families: {
      Lato: [200, 300, 400, 500, 600, 700, 800,900],
    }
  },
  css: [
    '@/assets/style.scss',
    "@/node_modules/bootstrap-icons/font/bootstrap-icons.scss"
  ],
  session: {
    session: {
      expiryInSeconds: 60 * 60 * 24, // 1 day
    },
    api: {
      isEnabled: true,
      methods: [
        'get', 'patch'
      ]
    }
  },
  imports: {
    dirs: ['./stores'],
  },
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate', 'storeToRefs'],
  },
})
