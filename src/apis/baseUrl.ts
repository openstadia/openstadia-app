import { useHubStore } from '@/stores/hub'

export const getBaseUrl = () => {
  const { hub } = useHubStore()
  return hub
}
