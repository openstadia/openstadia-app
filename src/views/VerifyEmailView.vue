<script setup lang="ts">
import {useAuth0} from "@auth0/auth0-vue";

const { user } = useAuth0()
</script>

<template>
  <main>
    <div>Verify Your Email Before Start: {{ user?.email }}</div>
  </main>
</template>

<style scoped></style>
