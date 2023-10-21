import { defineStore } from 'pinia'
import { getApps } from '@/services/appsApi'
import { computed, ref } from 'vue'

export const useAppsStore = defineStore('apps', () => {
  const apps = ref<App[]>([])

  const fetchAll = async (token: string) => {
    apps.value = await getApps(token)
  }

  const groupByApp = computed(() => groupBy(apps.value, (app) => app.name!!))

  return { apps, fetchAll, groupByApp }
})
