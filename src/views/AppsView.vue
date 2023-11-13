<script lang="ts" setup>
import { useAuth0 } from '@auth0/auth0-vue'
import { onMounted } from 'vue'
import AppItem from '@/components/AppItem.vue'
import { useAppsStore } from '@/stores/apps'
import { useRouter } from 'vue-router'
import type { App } from '@/models/app'

const apps = useAppsStore()
const { getAccessTokenSilently } = useAuth0()
const router = useRouter()

const fetchApps = async () => {
  const token = await getAccessTokenSilently()
  await apps.fetchAll(token)
}

onMounted(() => {
  fetchApps()
})

const selectApp = (app: App) => {
  router.push({
    name: 'server_connect',
    params: { id: app.server_id },
    query: { app_id: app.id }
  })
}
</script>

<template>
  <h2 class="text-2xl font-bold">Apps</h2>

  <ul class="mt-6">
    <li v-for="app in apps.apps" :key="app.id" class="pb-2 sm:pb-3">
      <AppItem :app="app" @connect="selectApp"></AppItem>
    </li>
  </ul>
</template>
