<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  text: string
  type: 'default' | 'alternative'
  disabled?: boolean
  icon?: object
}>()

const classes = {
  default:
    'px-5 py-2.5 text-sm font-medium rounded-lg text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800',
  alternative:
    'py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700',
  disabled:
    'text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center'
}

const selected = computed(() => {
  if (props.disabled) {
    return 'disabled'
  }
  return props.type
})
</script>

<template>
  <button type="button" class="flex items-center" :class="[classes[selected]]">
    <component v-if="icon" :is="icon" class="h-5 w-5" :class="[text && 'me-2 w-3.5 h-3.5']"></component>

    <span v-if="text">
      {{ props.text }}
    </span>
  </button>
</template>

<style scoped></style>
