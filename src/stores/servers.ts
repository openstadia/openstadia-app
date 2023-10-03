import { defineStore } from 'pinia'
import { getServers } from '@/services/serversApi'

interface State {
  servers: Server[]
}

export const useServersStore = defineStore('servers', {
  state: (): State => ({
    servers: []
  }),
  getters: {
    onlineServers(state) {
      return state.servers.filter((server) => server.isOnline)
    }
  },
  actions: {
    async getAll(token: string) {
      this.servers = await getServers(token)
    }
  }
})
