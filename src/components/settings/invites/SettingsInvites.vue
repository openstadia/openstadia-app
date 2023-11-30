<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue'
import type { ServerSettings } from '@/models/server'
import { useAuth0 } from '@auth0/auth0-vue'
import { createServerInvite, disableServerInvite, getServerInvites } from '@/apis/serverInvites'
import type { ServerInvite } from '@/models/serverInvite'
import OsButton from '@/components/shared/OsButton.vue'
import InviteItem from '@/components/settings/invites/InviteItem.vue'
import { isInviteActive } from '@/utils/invite'

const props = defineProps<{
  server: ServerSettings | null
}>()

const { getAccessTokenSilently } = useAuth0()

const invites = ref<ServerInvite[]>([])

watchEffect(async () => {
  const server = props.server

  if (!server) {
    return
  }

  const token = await getAccessTokenSilently()
  invites.value = await getServerInvites(token, server.id)
})

const activeInvites = computed(() => {
  return invites.value.filter((i) => isInviteActive(i))
})

const inactiveInvites = computed(() => {
  return invites.value.filter((i) => !isInviteActive(i))
})

const onCreate = async () => {
  const server = props.server

  if (!server) {
    return
  }
  const token = await getAccessTokenSilently()

  const invite = await createServerInvite(token, server.id)
  invites.value.push(invite)
}

const onDisable = async (invite: ServerInvite) => {
  const server = props.server

  if (!server) {
    return
  }

  const token = await getAccessTokenSilently()
  await disableServerInvite(token, server.id, {
    id: invite.id
  })

  invites.value = invites.value.map((i) => {
    if (i.id === invite.id) {
      return {
        ...i,
        activated: true
      }
    } else {
      return i
    }
  })
}
</script>

<template>
  <div>
    <div class="mb-6 flex justify-end">
      <OsButton text="Create Invite Link" type="default" @click="onCreate"></OsButton>
    </div>

    <h3 class="mb-6 text-xl font-bold">Active</h3>

    <div v-if="activeInvites.length === 0" class="mb-6">No active invites</div>

    <ul v-else class="mb-6">
      <li v-for="invite in activeInvites" :key="invite.id" class="pb-2 sm:pb-3">
        <InviteItem :invite="invite" @disable="onDisable"></InviteItem>
      </li>
    </ul>

    <h3 class="mb-6 text-xl font-bold">Inactive</h3>

    <div v-if="inactiveInvites.length === 0" class="mb-6">No inactive invites</div>

    <ul v-else class="mb-6">
      <li v-for="invite in inactiveInvites" :key="invite.id" class="pb-2 sm:pb-3">
        <InviteItem :invite="invite" @disable="onDisable"></InviteItem>
      </li>
    </ul>
  </div>
</template>
