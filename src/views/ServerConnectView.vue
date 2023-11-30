<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { getServer } from '@/apis/servers'
import type { Server } from '@/models/server'
import OsTabs from '@/components/shared/OsTabs.vue'
import type { Tab } from '@/components/shared/tabs'
import ConnectVideo from '@/components/connect/video/ConnectVideo.vue'
import ConnectTerminal from '@/components/connect/terminal/ConnectTerminal.vue'
import ConnectExplorer from '@/components/connect/explorer/ConnectExplorer.vue'

const props = defineProps<{
  id: number
}>()

const { getAccessTokenSilently } = useAuth0()

const server = ref<Server | null>(null)

const isOnline = ref(false)

onMounted(async () => {
  const token = await getAccessTokenSilently()

  server.value = await getServer(token, props.id)
  isOnline.value = server.value.online
})

const tabs = ref<Tab[]>([
  {
    name: 'Video',
    selected: true
  },
  {
    name: 'Terminal',
    selected: false
  },
  {
    name: 'Explorer',
    selected: false
  }
])

const selectedTab = computed(() => tabs.value.find((t) => t.selected))
</script>

<template>
  <h2 class="mb-6 text-2xl font-bold">Server Connect</h2>

  <div class="mb-6 flex justify-between">
    <div class="font-semibold text-gray-900">{{ server?.name }}</div>

    <div class="flex items-center">
      <div :class="isOnline ? 'bg-green-600' : 'bg-red-600'" class="w-4 h-4 rounded-full"></div>
      <div class="ml-2 font-semibold text-gray-900">{{ isOnline ? 'Online' : 'Offline' }}</div>
    </div>
  </div>

  <OsTabs class="mb-6" v-model="tabs"></OsTabs>

  <div v-show="selectedTab?.name === 'Video'">
    <ConnectVideo :server="server"></ConnectVideo>
  </div>

  <div v-show="selectedTab?.name === 'Terminal'">
    <ConnectTerminal :server="server"></ConnectTerminal>
  </div>

  <div v-show="selectedTab?.name === 'Explorer'">
    <ConnectExplorer :server="server"></ConnectExplorer>
  </div>
</template>
