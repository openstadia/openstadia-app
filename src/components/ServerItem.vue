<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps<{
  server: Server
}>()

const router = useRouter()

const onConnect = () => {
  router.push({
    name: 'server',
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
  <div>
    {{ props.server }}
  </div>

  <button @click="onConnect">Connect</button>

  <button @click="onSettings">Settings</button>
</template>
