import { defineStore } from 'pinia'
import {getItemsAndState} from '@/apis/storage'
import { ref } from 'vue'
import { auth0 } from '@/auth0'
import type {StorageItemsAndState, StorageItem} from '@/models/storage'

export const onlyFetchedItems = ref<StorageItemsAndState>({used_space:-1, total_space:-1, objects:[]})
export const localUploadingItems = ref<StorageItem[]>([])

let opId = 0;

export const useStorageDataStore = defineStore('storage_data', () => {
  const fetchAll = async () => {
    await updateItems()
  }

  const updateItems = async () => {
    const token = await auth0.getAccessTokenSilently()
    onlyFetchedItems.value = await getItemsAndState(token)
  }

  const updateUploadingItem = async (item: StorageItem) => {
    opId++
    let found = false
    localUploadingItems.value!!.forEach(el => {
      if(el.name == item.name) {
        el.sizeUploaded = item.sizeUploaded
        found = true
        // why can't "return" end the func here? using a bool instead
      }
    })
    if(!found) {
      localUploadingItems.value!!.push(item) // {name: item.name, sizeUploaded: item.sizeUploaded, sizeTotal: -1, time_edited: ""}
    }
  }

  const removeUploadingItem = (name: string) => {
    localUploadingItems.value = localUploadingItems.value!!.filter(obj => obj.name !== name);
  }

  return { items: onlyFetchedItems, uploading: localUploadingItems, fetchAll, updateItems, updateUploadingItem, removeUploadingItem }
})
