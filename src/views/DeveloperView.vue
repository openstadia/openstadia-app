<script lang="ts" setup>
import IconCopy from '@/components/icons/IconCopy.vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { onMounted, ref, watchEffect } from 'vue'
import { useHubStore } from '@/stores/hub'
import IconRefresh from '@/components/icons/IconRefresh.vue'

const { getAccessTokenSilently } = useAuth0()
const hubStore = useHubStore()

const hubUrl = ref('')
const token = ref('')

onMounted(async () => {
  token.value = await getAccessTokenSilently()
})

const copyToken = async () => {
  await navigator.clipboard.writeText(token.value)
}

watchEffect(() => {
  hubUrl.value = hubStore.hub
})

const onUpdate = () => {
  hubStore.setHub(hubUrl.value)
}

const onReset = () => {
  hubStore.reset()
}
</script>

<template>
  <h2 class="mb-6 text-2xl font-bold">Developer</h2>

  <form>
    <div class="mb-6">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="token"
        >Access Token</label
      >
      <div class="flex">
        <input
          id="token"
          :value="token"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          disabled
          readonly
          type="text"
        />

        <button
          class="ml-2 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center"
          type="button"
          @click="copyToken"
        >
          <IconCopy class="w-5 h-5"></IconCopy>
        </button>
      </div>
    </div>

    <div class="mb-6">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="hub_url">
        Hub URL
      </label>

      <div class="flex">
        <input
          id="hub_url"
          v-model="hubUrl"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
        />

        <button
          class="ml-2 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center"
          type="button"
          @click="onReset"
        >
          <IconRefresh class="w-5 h-5"></IconRefresh>
        </button>
      </div>
    </div>

    <button
      class="px-5 py-2.5 text-sm font-medium rounded-lg text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      type="button"
      @click="onUpdate"
    >
      Update
    </button>
  </form>
</template>
