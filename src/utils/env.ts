import type { Env } from '@/models/env'

const ENV_LOCAL_STORAGE_KEY = 'env'

const DEFAULT_ENV: Env = {
  auth0Domain: import.meta.env.VITE_AUTH0_DOMAIN,
  auth0ClientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  auth0CallbackUrl: import.meta.env.VITE_AUTH0_CALLBACK_URL,
  apiServerUrl: import.meta.env.VITE_API_SERVER_URL
}

export function getEnv(): Env {
  const cachedEnvStr = localStorage.getItem(ENV_LOCAL_STORAGE_KEY)
  const cachedEnv = cachedEnvStr && JSON.parse(cachedEnvStr)
  return cachedEnv ?? DEFAULT_ENV
}

export function setEnv(env: Env) {
  const envStr = JSON.stringify(env)
  localStorage.setItem(ENV_LOCAL_STORAGE_KEY, envStr)
}

export function resetEnv(): Env {
  localStorage.removeItem(ENV_LOCAL_STORAGE_KEY)
  return DEFAULT_ENV
}
