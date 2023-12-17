import { defineStore } from 'pinia'
import {getItems, getStorageInfo} from '@/apis/storage'
import { ref } from 'vue'
import { auth0 } from '@/auth0'
import type {StorageItems, StorageItem, StorageInfo} from '@/models/storage'

export const onlyFetchedItems = ref<StorageItems>({objects:[]})
export const localUploadingItems = ref<StorageItem[]>([])
export const storageInfo = ref<StorageInfo>({used_space:-1, total_space: -1})

let opId = 0;

export const useStorageDataStore = defineStore('storage_data', () => {
  const fetchAll = async () => {
    await updateStorageInfo()
    await updateItems()
  }

  const updateItems = async () => {
    const token = await auth0.getAccessTokenSilently()
    onlyFetchedItems.value = await getItems(token)
  }

  const updateUploadingItem = async (item: StorageItem) => {
    opId++
    let found = false
    localUploadingItems.value!!.forEach(el => {
      if(el.name == item.name) {
        el.size_uploaded = item.size_uploaded
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

  const updateStorageInfo = async () => {
    const token = await auth0.getAccessTokenSilently()
    storageInfo.value = await getStorageInfo(token)
  }

  const watchForInfoUpdate = async () => {
    const token = await auth0.getAccessTokenSilently()
    let currentInfo: StorageInfo = {used_space: storageInfo.value.used_space, total_space: storageInfo.value.total_space}

    for(let i = 0; i < 3; i++) {
      await sleep(30 * 1000)
      if(!infoIsEqual(currentInfo, storageInfo.value)) return
      let newRequested = await getStorageInfo(token)
      if(!infoIsEqual(currentInfo, newRequested)) {
        storageInfo.value = newRequested
        return
      }
    }
  }

  function infoIsEqual(info1: StorageInfo, info2: StorageInfo){
    return info1.used_space == info2.used_space && info1.total_space == info2.total_space
  }

  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  return { items: onlyFetchedItems, uploading: localUploadingItems, storageInfo: storageInfo, fetchAll, updateItems, updateStorageInfo, updateUploadingItem, removeUploadingItem, watchForInfoUpdate: watchForInfoUpdate }
})
