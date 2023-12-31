// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/hanko",
    "@nuxtjs/supabase"
  ],
  hanko: {
    apiURL: process.env.NUXT_PUBLIC_HANKO_API_URL,
    redirects: {
      success: "/chat",
      login: "/",
      followRedirect: false
    }
  },
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    }
  },
  supabase: {
    redirect: false
  },
  ssr: true
})