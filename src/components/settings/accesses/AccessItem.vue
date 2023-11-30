<script lang="ts" setup>
import type { ServerAccess } from '@/models/serverAccess'
import OsButton from '@/components/shared/OsButton.vue'
import { onMounted, ref } from 'vue'
import { getUserById } from '@/apis/users'
import { useAuth0 } from '@auth0/auth0-vue'
import type { User } from '@/models/user'

const props = defineProps<{
  access: ServerAccess
}>()

const emit = defineEmits<{
  (e: 'delete', access: ServerAccess): void
}>()

const { getAccessTokenSilently } = useAuth0()

const user = ref<User | null>(null)

onMounted(async () => {
  const token = await getAccessTokenSilently()
  user.value = await getUserById(token, props.access.user_id)
})
</script>

<template>
  <div
    class="p-2 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <p class="ml-2 font-medium text-gray-900 truncate dark:text-white">
          {{ user?.username }}
        </p>

        <span
          class="ml-2 bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
          >{{ access.role }}</span
        >
      </div>

      <div class="flex items-center">
        <OsButton
          text="Delete"
          type="default"
          :disabled="access.role == 'owner'"
          @click="emit('delete', access)"
        ></OsButton>
      </div>
    </div>
  </div>
</template>
