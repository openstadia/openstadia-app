<script lang="ts" setup>
import { useRouter } from 'vue-router'

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
    <div class="flex items-center space-x-2">
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
          {{ props.server.name }}
        </p>
      </div>
      <button
        class="px-5 py-2.5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        type="button"
        @click="onConnect"
      >
        Connect
      </button>
      <button
        class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        type="button"
        @click="onSettings"
      >
        Settings
      </button>
    </div>
  </div>
</template>
