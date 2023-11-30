<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import type { ServerAccess } from '@/models/serverAccess'
import type { ServerSettings } from '@/models/server'
import { useAuth0 } from '@auth0/auth0-vue'
import { deleteServerAccess, getServerAccesses } from '@/apis/serverAccesses'
import AccessItem from '@/components/settings/accesses/AccessItem.vue'

const props = defineProps<{
  server: ServerSettings | null
}>()

const { getAccessTokenSilently } = useAuth0()

const accesses = ref<ServerAccess[]>([])

watchEffect(async () => {
  const server = props.server

  if (!server) {
    return
  }

  const token = await getAccessTokenSilently()
  accesses.value = await getServerAccesses(token, server.id)
})

const onDelete = async (access: ServerAccess) => {
  const token = await getAccessTokenSilently()
  await deleteServerAccess(token, access.user_id, access.server_id)
  accesses.value = accesses.value.filter(
    (a) => !(a.user_id == access.user_id && a.server_id == access.server_id)
  )
}
</script>

<template>
  <div>
    <ul class="mt-4">
      <li v-for="access in accesses" :key="access.user_id" class="pb-2 sm:pb-3">
        <AccessItem :access="access" @delete="onDelete"></AccessItem>
      </li>
    </ul>
  </div>
</template>
