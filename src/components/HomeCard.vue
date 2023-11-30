<script setup lang="ts">
import OsButton from '@/components/shared/OsButton.vue'

const props = defineProps<{
  title: string
  text: string
  button: string
}>()
</script>

<template>
  <div
    class="max-w-xs flex flex-col justify-between items-start p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <div>
      <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
        {{ title }}
      </h5>

      <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
        {{ text }}
      </p>
    </div>

    <OsButton type="default" :text="button"></OsButton>
  </div>
</template>

<style scoped></style>
