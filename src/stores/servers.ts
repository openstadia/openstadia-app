import { defineStore } from 'pinia'
import { getServers } from '@/apis/servers'
import { computed, ref } from 'vue'
import { auth0 } from '@/auth0'
import type { Server } from '@/models/server'

export const useServersStore = defineStore('servers', () => {
  const servers = ref<Server[]>([])

  const fetchAll = async () => {
    const token = await auth0.getAccessTokenSilently()
    servers.value = await getServers(token)
  }

  const onlineServers = computed(() => {
    return servers.value.filter((server) => server.isOnline)
  })

  return { servers, fetchAll, onlineServers }
})
