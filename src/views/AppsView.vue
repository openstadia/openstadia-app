<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'
import { onMounted } from 'vue'
import AppItem from '@/components/AppItem.vue'
import { useAppsStore } from '@/stores/apps'
import { useRouter } from 'vue-router'
import ServerItem from '@/components/ServerItem.vue'

const apps = useAppsStore()
const { getAccessTokenSilently } = useAuth0()
const router = useRouter()

const fetchApps = async () => {
  const token = await getAccessTokenSilently()
  await apps.getAll(token)
}

onMounted(() => {
  fetchApps()
})

const selectApp = (app: App) => {
  router.push({
    name: 'server',
    params: { id: app.server_id },
    query: { app_id: app.id }
  })
}
</script>

<template>
  <div>
    <h2>Apps</h2>

    <AppItem v-for="app in apps.apps" @connect="selectApp" :key="app.id" :app="app"></AppItem>
  </div>
</template>
