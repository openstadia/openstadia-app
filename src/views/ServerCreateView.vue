<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'
import { useRouter } from 'vue-router'
import { createServer } from '@/services/serversApi'
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
  <div>Create Server</div>

  <div>
    <input v-model="name" placeholder="Name" />
  </div>

  <button @click="onCreate">Create</button>
</template>
