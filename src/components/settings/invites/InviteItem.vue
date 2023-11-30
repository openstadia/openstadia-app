<script setup lang="ts">
import type { ServerInvite } from '@/models/serverInvite'
import IconCopy from '@/components/icons/IconCopy.vue'
import OsButton from '@/components/shared/OsButton.vue'
import { buildInviteLink, isInviteActive } from '@/utils/invite'
import { computed } from 'vue'

const props = defineProps<{
  invite: ServerInvite
}>()

const emit = defineEmits<{
  (e: 'disable', invite: ServerInvite): void
}>()

const onCopy = async (invite: ServerInvite) => {
  const inviteLink = buildInviteLink(invite)
  await navigator.clipboard.writeText(inviteLink)
}

const active = computed(() => isInviteActive(props.invite))
const validTo = computed(() => new Date(props.invite.expiration_date).toLocaleString())
</script>

<template>
  <div
    class="p-2 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <p class="ml-2 font-medium text-gray-900 truncate dark:text-white">
          Valid to {{ validTo }}
        </p>
      </div>

      <div class="flex items-center">
        <OsButton
          text="Copy"
          type="default"
          :icon="IconCopy"
          :disabled="!active"
          @click="onCopy(invite)"
        ></OsButton>

        <OsButton
          text="Disable"
          type="default"
          class="ml-2"
          :disabled="!active"
          @click="emit('disable', invite)"
        ></OsButton>
      </div>
    </div>
  </div>
</template>
