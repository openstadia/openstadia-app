<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  text: string
  selected?: boolean
  disabled?: boolean
}>()

type TabItemType = 'default' | 'selected' | 'disabled'

const type = computed<TabItemType>(() => {
  if (props.selected) {
    return 'selected'
  }

  if (props.disabled) {
    return 'disabled'
  }

  return 'default'
})

const classes = {
  default:
    'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300',
  selected:
    'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500',
  disabled: 'inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500'
}
</script>

<template>
  <li>
    <button type="button" :class="[classes[type]]">
      {{ props.text }}
    </button>
  </li>
</template>

<style scoped></style>
