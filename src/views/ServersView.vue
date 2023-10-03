<script setup lang="ts">
import { useServersStore } from '@/stores/servers'
import { useAuth0 } from '@auth0/auth0-vue'
import { onMounted } from 'vue'
import ServerItem from '@/components/ServerItem.vue'
import { useRouter } from 'vue-router'

const servers = useServersStore()
const { getAccessTokenSilently } = useAuth0()
const router = useRouter()

const onCreate = async () => {
  await router.push({ name: 'server_create' })
}

const fetchServers = async () => {
  const token = await getAccessTokenSilently()
  await servers.getAll(token)
}

onMounted(() => {
  fetchServers()
})
</script>

<template>
  <div>
    <h2>Servers</h2>

    <button @click="onCreate">Create Server</button>

    <ServerItem v-for="server in servers.servers" :key="server.id" :server="server" />
  </div>
</template>
