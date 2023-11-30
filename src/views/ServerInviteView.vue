<script lang="ts" setup>
import { useAuth0 } from '@auth0/auth0-vue'
import type { LocationQueryValue } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import type { ServerInviteInfo } from '@/models/serverInvite'
import { activateServerInvite, getServerInviteInfo } from '@/apis/serverInvites'
import OsButton from '@/components/shared/OsButton.vue'

const props = defineProps<{
  id: number
}>()

const { getAccessTokenSilently } = useAuth0()
const route = useRoute()
const router = useRouter()

const inviteToken = route.query.invite_token as LocationQueryValue
const inviteInfo = ref<ServerInviteInfo | null>(null)

onMounted(async () => {
  if (!inviteToken) {
    return
  }

  const authToken = await getAccessTokenSilently()
  inviteInfo.value = await getServerInviteInfo(authToken, props.id, {
    token: inviteToken
  })
})

const onAccept = async () => {
  if (!inviteToken) {
    return
  }

  const authToken = await getAccessTokenSilently()
  const response = await activateServerInvite(authToken, props.id, {
    token: inviteToken
  })

  if (response.ok) {
    await router.push({ name: 'servers' })
  }
}
</script>

<template>
  <h2 class="mb-6 text-2xl font-bold">Server Invite</h2>

  <OsButton
    text="Accept"
    type="default"
    :disabled="!inviteInfo?.can_activate"
    @click="onAccept"
  ></OsButton>
</template>
