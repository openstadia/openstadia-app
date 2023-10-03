<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'

const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0()

const login = () => {
  loginWithRedirect()
}
</script>

<template>
  <div>
    <div v-if="isAuthenticated">
      <button @click="logout">Log Out</button>
      <h2>User Profile</h2>
      <code>{{ user }}</code>
    </div>

    <div v-else>
      <button @click="login">Log In</button>
    </div>
  </div>
</template>
