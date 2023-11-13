import { defineStore } from 'pinia'
import { ref } from 'vue'

const HUB_LOCAL_STORAGE_KEY = 'hub'
const BASE_URL = import.meta.env.VITE_API_SERVER_URL

export const useHubStore = defineStore('hub', () => {
  const cachedHub = localStorage.getItem(HUB_LOCAL_STORAGE_KEY)
  const hubState = ref(cachedHub ?? BASE_URL)

  const setHub = (hub: string) => {
    hubState.value = hub
    localStorage.setItem(HUB_LOCAL_STORAGE_KEY, hub)
  }

  const reset = () => {
    hubState.value = BASE_URL
    localStorage.removeItem(HUB_LOCAL_STORAGE_KEY)
  }

  return { hub: hubState, setHub, reset }
})
