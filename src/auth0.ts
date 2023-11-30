import { createAuth0 } from '@auth0/auth0-vue'
import { getEnv } from '@/utils/env'

const env = getEnv()

export const auth0 = createAuth0({
  domain: env.auth0Domain,
  clientId: env.auth0ClientId,
  authorizationParams: {
    redirect_uri: env.auth0CallbackUrl,
    audience: 'https://api.openstadia.com'
  }
})
