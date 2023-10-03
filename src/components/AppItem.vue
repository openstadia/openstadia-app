<script setup lang="ts">
const props = defineProps<{
  app: App
}>()

const emit = defineEmits<{
  connect: [app: App]
}>()
</script>

<template>
  <div>
    {{ props.app }}
  </div>

  <button @click="emit('connect', app)">Connect</button>
</template>
