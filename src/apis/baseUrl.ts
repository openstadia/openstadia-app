import {useHubStore} from '@/stores/hub'
import {useStorageStore} from '@/stores/storage_server'

export const getBaseUrl = () => {
  const { hub } = useHubStore()
  return hub
}

export const getStorageBaseUrl = () => {
  const { storage } = useStorageStore()
  return storage
}
