<script lang="ts" setup>
import { useRouter } from 'vue-router'
import type { Server } from '@/models/server'

const props = defineProps<{
  server: Server
}>()

const router = useRouter()

const onConnect = () => {
  router.push({
    name: 'server_connect',
    params: { id: props.server.id }
  })
}

const onSettings = () => {
  router.push({
    name: 'server_settings',
    params: { id: props.server.id }
  })
}
</script>

<template>
  <div
    class="p-2 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <div
          :class="server.online ? 'bg-green-600' : 'bg-red-600'"
          class="w-3 h-3 rounded-full"
        ></div>

        <p class="ml-2 font-medium text-gray-900 truncate dark:text-white">
          {{ server.name }}
        </p>

        <span
          class="ml-2 bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
          >{{ server.role }}</span
        >
      </div>

      <div class="flex items-center">
        <button
          class="px-5 py-2.5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="button"
          @click="onConnect"
        >
          Connect
        </button>

        <button
          class="ml-2 py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          type="button"
          :disabled="server.role != 'owner'"
          @click="onSettings"
        >
          Settings
        </button>
      </div>
    </div>
  </div>
</template>
