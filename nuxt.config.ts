// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@sidebase/nuxt-auth'],
    runtimeConfig: {
        authSecret: process.env.AUTH_SECRET,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
})
