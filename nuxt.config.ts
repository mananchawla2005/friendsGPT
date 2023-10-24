// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/hanko"],
  hanko: {
    apiURL: process.env.NUXT_PUBLIC_HANKO_API_URL,
  },
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    }
  }
})