import { useEnvStore } from '@/stores/env'

export const getBaseUrl = () => {
  const { env } = useEnvStore()
  return env.apiServerUrl
}
