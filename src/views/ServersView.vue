<script lang="ts" setup>
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
  <h2 class="text-2xl font-bold">Servers</h2>

  <div class="mt-4 flex justify-end">
    <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      type="button"
      @click="onCreate"
    >
      Create
    </button>
  </div>

  <ul class="mt-4">
    <li v-for="server in servers.servers" :key="server.id" class="pb-2 sm:pb-3">
      <ServerItem :server="server" />
    </li>
  </ul>
</template>
