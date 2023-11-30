<script setup lang="ts">
import type { File } from '@/models/explorer'
import IconFolder from '@/components/connect/explorer/icons/IconFolder.vue'
import IconFile from '@/components/connect/explorer/icons/IconFile.vue'
import { ref } from 'vue'
import IconTrash from '@/components/connect/explorer/icons/IconTrash.vue'
import IconDownload from '@/components/connect/explorer/icons/IconDownload.vue'

const props = defineProps<{
  file: File
  selected?: boolean
}>()

const emit = defineEmits<{
  (e: 'delete'): void
  (e: 'download'): void
}>()

const entered = ref(false)
const onEnter = () => {
  entered.value = true
}

const onLeave = () => {
  entered.value = false
}
</script>

<template>
  <div
    class="flex justify-between items-center h-12 hover:bg-gray-100"
    :class="{ 'bg-blue-100 hover:bg-blue-100': selected }"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <div class="flex items-center">
      <IconFolder v-if="file.is_dir" class="mx-3 h-5 w-5"></IconFolder>

      <IconFile v-else class="mx-3 h-5 w-5"></IconFile>

      <span class="cursor-default select-none text-sm">
        {{ file.name }}
      </span>
    </div>

    <div v-if="!file.is_dir" v-show="entered" class="me-3 flex items-center space-x-0.5">
      <div
        class="flex items-center justify-center h-8 w-8 rounded-full hover:bg-opacity-10 hover:bg-gray-800"
        @click="emit('download')"
      >
        <IconDownload class="h-4 w-4"></IconDownload>
      </div>

      <div
        class="flex items-center justify-center h-8 w-8 rounded-full hover:bg-opacity-10 hover:bg-gray-800"
        @click="emit('delete')"
      >
        <IconTrash class="h-4 w-4"></IconTrash>
      </div>
    </div>
  </div>
</template>
