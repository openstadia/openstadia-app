<script lang="ts" setup>
import { useAuth0 } from '@auth0/auth0-vue'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { deleteServer, getServer } from '@/services/serversApi'
import IconRefresh from '@/components/icons/IconRefresh.vue'

const props = defineProps<{
  id: number
}>()

const server = ref<Server | null>(null)

const { getAccessTokenSilently } = useAuth0()
const router = useRouter()

onMounted(async () => {
  const token = await getAccessTokenSilently()

  server.value = await getServer(token, props.id)
})

const onDelete = async () => {
  const token = await getAccessTokenSilently()
  await deleteServer(token, props.id)
  await router.push({ name: 'servers' })
}

const regenerateToken = async () => {}

const rename = async () => {}
</script>

<template>
  <h2 class="mb-6 text-2xl font-bold">Server Settings</h2>

  <form>
    <div class="mb-6">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="name"
        >Name</label
      >
      <div class="flex">
        <input
          id="name"
          :value="server?.name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
        />

        <button
          class="ml-2 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center"
          type="button"
          @click="rename"
        >
          Rename
        </button>
      </div>
    </div>

    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="server_id"
          >Server Id</label
        >
        <input
          id="server_id"
          :value="server?.id"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          disabled
          readonly
          type="text"
        />
      </div>

      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="owner_id"
          >Owner Id</label
        >
        <input
          id="owner_id"
          :value="server?.owner_id"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          disabled
          readonly
          type="text"
        />
      </div>
    </div>

    <div class="mb-6">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="token"
        >Token</label
      >

      <div class="flex">
        <input
          id="token"
          :value="server?.token"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          disabled
          readonly
          type="text"
        />

        <button
          class="ml-2 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center"
          type="button"
          @click="regenerateToken"
        >
          <IconRefresh class="w-5 h-5"></IconRefresh>
          <span class="sr-only">Enter fullscreen</span>
        </button>
      </div>
    </div>

    <button
      class="mb-6 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
      type="button"
      @click="onDelete"
    >
      Delete
    </button>
  </form>
</template>
