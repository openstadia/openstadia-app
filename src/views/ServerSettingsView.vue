<script lang="ts" setup>
import { useAuth0 } from '@auth0/auth0-vue'
import { computed, onMounted, ref } from 'vue'
import { getServerSettings } from '@/apis/servers'
import type { ServerSettings } from '@/models/server'
import SettingsAccesses from '@/components/settings/accesses/SettingsAccesses.vue'
import OsTabs from '@/components/shared/OsTabs.vue'
import type { Tab } from '@/components/shared/tabs'
import SettingsBasic from '@/components/settings/basic/SettingsBasic.vue'
import SettingsInvites from '@/components/settings/invites/SettingsInvites.vue'

const props = defineProps<{
  id: number
}>()

const server = ref<ServerSettings | null>(null)

const { getAccessTokenSilently } = useAuth0()

onMounted(async () => {
  const token = await getAccessTokenSilently()

  server.value = await getServerSettings(token, props.id)
})

const tabs = ref<Tab[]>([
  {
    name: 'Basic',
    selected: true
  },
  {
    name: 'Access',
    selected: false
  },
  {
    name: 'Invites',
    selected: false
  }
])

const selectedTab = computed(() => tabs.value.find((t) => t.selected))
</script>

<template>
  <h2 class="mb-6 text-2xl font-bold">Server Settings</h2>

  <OsTabs class="mb-6" v-model="tabs"></OsTabs>

  <SettingsBasic v-show="selectedTab?.name === 'Basic'" :server="server"></SettingsBasic>

  <SettingsAccesses v-show="selectedTab?.name === 'Access'" :server="server"></SettingsAccesses>

  <SettingsInvites v-show="selectedTab?.name === 'Invites'" :server="server"></SettingsInvites>
</template>
