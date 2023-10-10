<script lang="ts" setup>
defineProps<{
  app: App
}>()

const emit = defineEmits<{
  connect: [app: App]
}>()
</script>

<template>
  <div
    class="p-2 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
  >
    <div class="flex items-center space-x-2">
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
          {{ app.name }}
        </p>
      </div>
      <button
        class="px-5 py-2.5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        type="button"
        @click="emit('connect', app)"
      >
        Connect
      </button>
    </div>
  </div>
</template>
