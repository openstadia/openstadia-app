import { defineStore } from 'pinia'
import { getApps } from '@/services/appsApi'

interface State {
  apps: App[]
}

export const useAppsStore = defineStore('apps', {
  state: (): State => ({
    apps: []
  }),
  getters: {
    groupByApp(state) {
      return groupBy(state.apps, ({ name }) => name)
    }
  },
  actions: {
    async getAll(token: string) {
      this.apps = await getApps(token)
    }
  }
})
