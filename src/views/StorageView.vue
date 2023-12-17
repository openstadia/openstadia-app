<script lang="ts" setup>
import { useAuth0 } from '@auth0/auth0-vue'
import {onMounted, ref} from 'vue'
import ButtonSorting from "@/components/ButtonSorting.vue";
import StorageRowItem from "@/components/StorageRowItem.vue";
import {useStorageDataStore} from "@/stores/storage_data";
import {convertTime, convertSize} from '@/utils/displayFormats'
import {getFileUploadLink, getStorageInfo, uploadFileData} from '@/apis/storage'
import type {FileUploadLink, StorageInfo} from "@/models/storage";

const { getAccessTokenSilently } = useAuth0()
const token = ref('')
const storageDataStore = useStorageDataStore()

const fileInput = ref<HTMLInputElement | null>(null)
const files = ref()
const submitButtonDisabled = ref<Boolean>(true)

function handleFileChange() {
  files.value = fileInput.value?.files
  if(fileInput.value != null) submitButtonDisabled.value = false
}

async function submitFile() {
  if (files.value == null) return // if the actual file selection is still null or was cleared (may be implemented later)
  const file = files.value[0]
  let link: FileUploadLink = await getFileUploadLink(token.value!!, {path: file.name})
  await uploadFileData(link, file, updateList, storageDataStore.updateUploadingItem, storageDataStore.removeUploadingItem) // doesn't really wait
  fileInput.value = null
  await storageDataStore.watchForInfoUpdate()
}

onMounted(async () => {
  token.value = await getAccessTokenSilently()
  await storageDataStore.fetchAll()
})

async function updateList() {
  await storageDataStore.updateItems()
}

const convertPercentUsed = () => {
  if(storageDataStore.storageInfo!!.total_space == -1) return "Loading..."
  return Math.floor(100 * storageDataStore.storageInfo!!.used_space / storageDataStore.storageInfo!!.total_space) + "% space used ("
      + convertSize(storageDataStore.storageInfo!!.used_space) + " / " + convertSize(storageDataStore.storageInfo!!.total_space) + ")"
}

</script>

<style lang="css">
.last-modified-width {
  width: 170px;
}

.size-width {
  width: 80px;
}

.actions-width {
  width: 80px;
}

.upload-status-width {
  width: 330px;
}

</style>

<template>
  <h2 class="mb-6 text-2xl font-bold">Storage</h2>

  <form>
    <div class="flex gap-5 p-1.5 ml-2 mr-2 mb-1 mt-1 align-middle border-gray-200 bg-gray-100 border-2 rounded-lg items-center">
      <div class="flex-grow align-baseline h-full ml-1">{{convertPercentUsed()}}</div>
        <input
            class="flex-shrink align-baseline h-full mr-1 text-gray-700 border-2 border-gray-400 hover:border-blue-500 focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium rounded-md p-1 text-center inline-flex items-center"
            type="file"
            ref="fileInput"
            @change="handleFileChange">
      <button
          class="flex-shrink align-baseline h-full mr-1 p-2.5 pl-7 pr-7 disabled:text-gray-400 disabled:border-gray-200 text-gray-700 border-2 border-gray-400 hover:border-blue-500 focus:ring-2 focus:outline-none focus:ring-gray-300 rounded-md text-center inline-flex items-center"
          type="button"
          @click="submitFile"
          :disabled="submitButtonDisabled.valueOf()">
        Submit
      </button>
    </div>

    <!-- normal way, rows-->
    <div class="flex gap-5 p-2.5 m-2 border-gray-300 bg-gray-200 border rounded-lg">
        <span class="flex-grow items-center align-middle"> <!-- this one is a bit different from the others -->
          <span class="mr-1 align-baseline h-full">Name</span>
          <span class="align-baseline h-full"><ButtonSorting/></span>
        </span>
      <div class="last-modified-width">
        <span>
          <span class="mr-1">Last Modified</span>
          <span class="pb-5 pt-5"><ButtonSorting/></span>
        </span>
      </div>
      <div class="size-width">
        <span>
          <span class="mr-1">Size</span>
          <span class="pb-5 pt-5"><ButtonSorting/></span>
        </span>
      </div>
      <div class="actions-width">Actions</div>
    </div>

    <ul>
      <li v-for="item in storageDataStore.uploading!!" :key="item.name" class="flex gap-5 p-2 m-2 border rounded-lg">
        <StorageRowItem :item="item" :storage-data-store="storageDataStore" />
      </li>
      <li v-for="item in storageDataStore.items!!.objects" :key="item.name" class="flex gap-5 p-2 m-2 border-gray-300 bg-gray-50 border rounded-lg hover:bg-gray-100 hover:border-blue-500">
        <StorageRowItem :item="item" :storage-data-store="storageDataStore" />
      </li>
    </ul>
  </form>
</template>
