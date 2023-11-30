<script lang="ts" setup>
import IconCopy from '@/components/icons/IconCopy.vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { onMounted, ref } from 'vue'
import { useEnvStore } from '@/stores/env'
import OsButton from '@/components/shared/OsButton.vue'
import OsInput from '@/components/shared/OsInput.vue'

const { getAccessTokenSilently } = useAuth0()
const envStore = useEnvStore()

const token = ref('')
const env = ref(envStore.env)

onMounted(async () => {
  token.value = await getAccessTokenSilently()
})

const copyToken = async () => {
  await navigator.clipboard.writeText(token.value)
}

const onUpdate = () => {
  envStore.setEnv(env.value)
}

const onReset = () => {
  envStore.resetEnv()
  env.value = envStore.env
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

    <OsInput
      class="mb-6"
      input-id="auth0Domain"
      v-model="env.auth0Domain"
      label="Auth0 Domain"
    ></OsInput>

    <OsInput
      class="mb-6"
      input-id="auth0ClientId"
      v-model="env.auth0ClientId"
      label="Auth0 Client Id"
    ></OsInput>

    <OsInput
      class="mb-6"
      input-id="auth0CallbackUrl"
      v-model="env.auth0CallbackUrl"
      label="Auth0 Callback Url"
    ></OsInput>

    <OsInput
      class="mb-6"
      input-id="apiServerUrl"
      v-model="env.apiServerUrl"
      label="Api Server Url"
    ></OsInput>

    <div class="flex justify-between">
      <OsButton class="mb-6" text="Update" type="default" @click="onUpdate"></OsButton>

      <OsButton class="mb-6" text="Reset Default" type="default" @click="onReset"></OsButton>
    </div>
  </form>
</template>
