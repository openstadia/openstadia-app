<script setup lang="ts">

import IconDownload from "@/components/icons/IconDownload.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import type {FileDownloadLink, StorageItem} from "@/models/storage";
import {deleteFile, downloadFile} from '@/apis/storage'
import {useAuth0} from "@auth0/auth0-vue";

const { getAccessTokenSilently } = useAuth0()

const props = defineProps<{
  item: StorageItem
  updateListFunc: Function
}>()

const downloadFileAction = async () => {
  const token = await getAccessTokenSilently()
  let link: FileDownloadLink = await downloadFile(token, {path: props.item.name});
  window.location.href = link.url
}

const deleteFileAction = async () => {
  const token = await getAccessTokenSilently()
  await deleteFile(token, {path: [props.item.name]})
  props.updateListFunc.call(null)
}

</script>

<template>
 <span>
  <button
    class="mr-2 text-gray-700 border-2 border-gray-300 hover:bg-gray-200 hover:border-blue-500 hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-sm text-sm p-1 text-center inline-flex items-center"
    type="button"
    @click="downloadFileAction">
      <IconDownload/>
  </button>
  <button
    class="mr-2 text-gray-500 border-2 border-gray-300 hover:bg-gray-200 hover:border-blue-500 hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-sm text-sm p-1 text-center inline-flex items-center"
    type="button"
    @click="deleteFileAction">
      <IconDelete/>
  </button>
</span>
</template>

<style scoped>

</style>