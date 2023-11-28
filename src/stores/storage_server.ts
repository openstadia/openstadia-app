import { defineStore } from 'pinia'
import { ref } from 'vue'

const STORAGE_SERVER_LOCAL_STORAGE_KEY = 'storage'
const BASE_URL = import.meta.env.VITE_STORAGE_API_SERVER_URL

export const useStorageStore = defineStore('storage', () => {
  const cachedStorage = localStorage.getItem(STORAGE_SERVER_LOCAL_STORAGE_KEY)
  const storageState = ref(cachedStorage ?? BASE_URL)

  const setStorage = (storage: string) => {
    storageState.value = storage
    localStorage.setItem(STORAGE_SERVER_LOCAL_STORAGE_KEY, storage)
  }

  const reset = () => {
    storageState.value = BASE_URL
    localStorage.removeItem(STORAGE_SERVER_LOCAL_STORAGE_KEY)
  }

  return { storage: storageState, setStorage, reset }
})
