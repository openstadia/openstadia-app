<script setup lang="ts">
import OsTabItem from './OsTabItem.vue'
import type { Tab } from './tabs'

const props = defineProps<{
  modelValue: Tab[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', tabs: Tab[]): void
}>()

const onSelect = (tab: Tab) => {
  const newModelValue: Tab[] = props.modelValue.map((t) => ({
    ...t,
    selected: t.name === tab.name
  }))
  emit('update:modelValue', newModelValue)
}
</script>

<template>
  <div
    class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"
  >
    <ul class="flex flex-wrap -mb-px">
      <OsTabItem
        class="me-2"
        v-for="tab in props.modelValue"
        :key="tab.name"
        :text="tab.name"
        :selected="tab.selected"
        @click="onSelect(tab)"
      ></OsTabItem>
    </ul>
  </div>
</template>

<style scoped></style>
