import {NuxtAuthHandler} from '#auth'
import Google from "next-auth/providers/google";

const config = useRuntimeConfig();
export default NuxtAuthHandler({
    secret: config.authSecret,
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        Google.default({
            clientId: config.clientId,
            clientSecret: config.clientSecret
        })
    ]
})
