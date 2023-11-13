<script lang="ts" setup>
import { useAuth0 } from '@auth0/auth0-vue'
import { useRouter } from 'vue-router'
import { createServer } from '@/apis/servers'
import { ref } from 'vue'

const { getAccessTokenSilently } = useAuth0()
const router = useRouter()

const name = ref('')
const onCreate = async () => {
  const token = await getAccessTokenSilently()
  await createServer(token, { name: name.value })
  await router.push({ name: 'servers' })
}
</script>

<template>
  <h2 class="mb-6 text-2xl font-bold">Server Create</h2>

  <form>
    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="name"
          >Name</label
        >
        <input
          id="name"
          v-model="name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="My Server"
          type="text"
        />
      </div>
    </div>

    <button
      class="mb-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none disabled:bg-blue-400 disabled:cursor-not-allowed"
      type="button"
      @click="onCreate"
    >
      Create
    </button>
  </form>
</template>
